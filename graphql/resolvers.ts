import { prisma } from '../lib/prisma'

export const resolvers = {
  Query: {
    leads: async () => {
      const leads = await prisma.lead.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      
             // Convert any lowercase services to uppercase for GraphQL enum compatibility
       return leads.map((lead: any) => ({
         ...lead,
         services: lead.services.map((service: string) => service.toUpperCase())
       }))
    },
    lead: async (_: any, { id }: { id: number }) => {
      const lead = await prisma.lead.findUnique({
        where: { id }
      })
      
      if (!lead) return null
     
       return {
         ...lead,
         services: lead.services.map((service: string) => service.toUpperCase())
       }
    }
  },
  
  Mutation: {
    register: async (_: any, { input }: { input: any }) => {
      const { name, email, mobile, postcode, services } = input
      
      try {
        const lead = await prisma.lead.create({
          data: {
            name,
            email,
            mobile,
            postcode,
            services: services
          }
        })
        
        return lead
      } catch (error: any) {
        if (error.code === 'P2002') {
          throw new Error('A lead with this email already exists')
        }
        throw new Error('Failed to register lead')
      }
    }
  }
} 