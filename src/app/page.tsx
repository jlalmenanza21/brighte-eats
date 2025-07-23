'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const REGISTER_LEAD = gql`
  mutation RegisterLead($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
      mobile
      postcode
      services
      createdAt
    }
  }
`

const GET_LEADS = gql`
  query GetLeads {
    leads {
      id
      name
      email
      mobile
      postcode
      services
      createdAt
    }
  }
`

interface Lead {
  id: number
  name: string
  email: string
  mobile: string
  postcode: string
  services: string[]
  createdAt: string
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [] as string[]
  })
  const [showDashboard, setShowDashboard] = useState(false)
  const [registerLead, { loading: registering }] = useMutation(REGISTER_LEAD)
  const { data, loading, error, refetch } = useQuery(GET_LEADS, {
    skip: !showDashboard,
    errorPolicy: 'all'
  })

  const services = ['DELIVERY', 'PICKUP', 'PAYMENT']

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerLead({
        variables: {
          input: formData
        }
      })
      alert('Registration successful!')
      setFormData({
        name: '',
        email: '',
        mobile: '',
        postcode: '',
        services: []
      })
      if (showDashboard) {
        refetch()
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Brighte Eats
          </h1>
          <p className="text-xl text-gray-600">
            Register your interest in our new food services
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setShowDashboard(false)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                !showDashboard
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Register Interest
            </button>
            <button
              onClick={() => setShowDashboard(true)}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                showDashboard
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              View Dashboard
            </button>
          </div>
        </div>

        {!showDashboard ? (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Register Your Interest
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postcode *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, postcode: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Services of Interest * (Select at least one)
                </label>
                <div className="space-y-3">
                  {services.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {service.toLowerCase()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={registering || formData.services.length === 0}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {registering ? 'Registering...' : 'Register Interest'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Leads Dashboard
              </h2>
              <button
                onClick={() => refetch()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-600">Loading leads...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-600">Error loading leads: {error.message}</div>
                <button 
                  onClick={() => refetch()}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Try again
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mobile
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Postcode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Services
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.leads?.map((lead: Lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lead.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.mobile}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {lead.postcode}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1">
                            {lead.services.map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!data?.leads || data.leads.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No leads registered yet.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
