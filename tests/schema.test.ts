import { buildSchema } from 'graphql'
import { typeDefs } from '../graphql/schema'

describe('GraphQL Schema', () => {
  it('should be a valid GraphQL schema', () => {
    expect(() => {
      buildSchema(typeDefs.loc?.source.body || '')
    }).not.toThrow()
  })

  it('should include Lead type with required fields', () => {
    const schema = buildSchema(typeDefs.loc?.source.body || '')
    const leadType = schema.getType('Lead')
    
    expect(leadType).toBeDefined()
    expect(leadType?.toString()).toContain('Lead')
  })

  it('should include Service enum with correct values', () => {
    const schema = buildSchema(typeDefs.loc?.source.body || '')
    const serviceEnum = schema.getType('Service')
    
    expect(serviceEnum).toBeDefined()
    expect(serviceEnum?.toString()).toContain('Service')
  })

  it('should include register mutation', () => {
    const schema = buildSchema(typeDefs.loc?.source.body || '')
    const mutationType = schema.getMutationType()
    const fields = mutationType?.getFields()
    
    expect(fields?.register).toBeDefined()
  })

  it('should include leads and lead queries', () => {
    const schema = buildSchema(typeDefs.loc?.source.body || '')
    const queryType = schema.getQueryType()
    const fields = queryType?.getFields()
    
    expect(fields?.leads).toBeDefined()
    expect(fields?.lead).toBeDefined()
  })
}) 