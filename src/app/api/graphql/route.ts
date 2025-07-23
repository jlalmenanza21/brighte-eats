import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from '../../../../graphql/schema'
import { resolvers } from '../../../../graphql/resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  introspection: true,
  formatError: (error: any) => {
    console.error('GraphQL Error:', error)
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    }
  },
})

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: any, res: any) => ({ req, res }),
})

export async function GET(request: Request) {
  return handler(request)
}

export async function POST(request: Request) {
  return handler(request)
} 