import { resolvers } from '../graphql/resolvers'
import { prisma } from '../lib/prisma'

// Mock Prisma
jest.mock('../lib/prisma', () => ({
  prisma: {
    lead: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

const mockPrisma = prisma as jest.Mocked<typeof prisma>

describe('GraphQL Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Query.leads', () => {
    it('should return all leads ordered by creation date', async () => {
      const mockLeads = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          mobile: '0412345678',
          postcode: '2000',
          services: ['delivery'],
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-01'),
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          mobile: '0487654321',
          postcode: '3000',
          services: ['pickup', 'payment'],
          createdAt: new Date('2023-01-02'),
          updatedAt: new Date('2023-01-02'),
        },
      ]

      mockPrisma.lead.findMany.mockResolvedValue(mockLeads)

      const result = await resolvers.Query.leads()

      expect(mockPrisma.lead.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      })
      expect(result).toEqual(mockLeads)
    })
  })

  describe('Query.lead', () => {
    it('should return a specific lead by id', async () => {
      const mockLead = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        services: ['delivery'],
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      }

      mockPrisma.lead.findUnique.mockResolvedValue(mockLead)

      const result = await resolvers.Query.lead(null, { id: 1 })

      expect(mockPrisma.lead.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      })
      expect(result).toEqual(mockLead)
    })

    it('should return null for non-existent lead', async () => {
      mockPrisma.lead.findUnique.mockResolvedValue(null)

      const result = await resolvers.Query.lead(null, { id: 999 })

      expect(result).toBeNull()
    })
  })

  describe('Mutation.register', () => {
    it('should create a new lead with valid input', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        services: ['DELIVERY', 'PAYMENT'],
      }

      const mockCreatedLead = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        services: ['delivery', 'payment'],
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      }

      mockPrisma.lead.create.mockResolvedValue(mockCreatedLead)

      const result = await resolvers.Mutation.register(null, { input })

      expect(mockPrisma.lead.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          mobile: '0412345678',
          postcode: '2000',
          services: ['delivery', 'payment'],
        },
      })
      expect(result).toEqual(mockCreatedLead)
    })

    it('should throw error for duplicate email', async () => {
      const input = {
        name: 'John Doe',
        email: 'existing@example.com',
        mobile: '0412345678',
        postcode: '2000',
        services: ['DELIVERY'],
      }

      const duplicateError = new Error('Unique constraint failed')
      ;(duplicateError as any).code = 'P2002'
      mockPrisma.lead.create.mockRejectedValue(duplicateError)

      await expect(
        resolvers.Mutation.register(null, { input })
      ).rejects.toThrow('A lead with this email already exists')
    })

    it('should throw generic error for other database errors', async () => {
      const input = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '0412345678',
        postcode: '2000',
        services: ['DELIVERY'],
      }

      const dbError = new Error('Database connection failed')
      mockPrisma.lead.create.mockRejectedValue(dbError)

      await expect(
        resolvers.Mutation.register(null, { input })
      ).rejects.toThrow('Failed to register lead')
    })

    it('should convert service enums to lowercase', async () => {
      const input = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        mobile: '0487654321',
        postcode: '3000',
        services: ['DELIVERY', 'PICKUP', 'PAYMENT'],
      }

      const mockCreatedLead = {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        mobile: '0487654321',
        postcode: '3000',
        services: ['delivery', 'pickup', 'payment'],
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01'),
      }

      mockPrisma.lead.create.mockResolvedValue(mockCreatedLead)

      await resolvers.Mutation.register(null, { input })

      expect(mockPrisma.lead.create).toHaveBeenCalledWith({
        data: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          mobile: '0487654321',
          postcode: '3000',
          services: ['delivery', 'pickup', 'payment'],
        },
      })
    })
  })
}) 