import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

// server setup
const server = new ApolloServer({
  typeDefs: ``, // TODO: add typeDefs
  resolvers: {}, // TODO: add resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
})

console.log(`🚀 Server ready at port: `, 4000)
