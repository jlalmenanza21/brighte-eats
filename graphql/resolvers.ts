import { prisma } from '../lib/prisma'

export const resolvers = {
  Query: {
    leads: async () => {
      return await prisma.lead.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    },
    lead: async (_: any, { id }: { id: number }) => {
      return await prisma.lead.findUnique({
        where: { id }
      })
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