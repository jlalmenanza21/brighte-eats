import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Lead {
    id: Int!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service!]!
    createdAt: String!
    updatedAt: String!
  }

  enum Service {
    DELIVERY
    PICKUP
    PAYMENT
  }

  input RegisterInput {
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    services: [Service!]!
  }

  type Query {
    leads: [Lead!]!
    lead(id: Int!): Lead
  }

  type Mutation {
    register(input: RegisterInput!): Lead!
  }
` 