import client from '../lib/apolloClient'
import { ApolloClient } from '@apollo/client'

describe('Apollo Client', () => {
  it('should be an instance of ApolloClient', () => {
    expect(client).toBeInstanceOf(ApolloClient)
  })

  it('should have correct default options', () => {
    expect(client.defaultOptions.watchQuery?.errorPolicy).toBe('all')
    expect(client.defaultOptions.query?.errorPolicy).toBe('all')
  })

  it('should have GraphQL link configured', () => {
    // Check that the client has a link configured
    expect(client.link).toBeDefined()
    
    // Check that the client has a cache configured
    expect(client.cache).toBeDefined()
  })
}) 