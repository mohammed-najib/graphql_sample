import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

// db
import db from "./db.js"

// types
import { typeDefs } from "./schema.js"

// constants
const PORT = 4000

// resolvers
const resolvers = {
  Query: {
    games: () => {
      return db.games
    },
    authors: () => {
      return db.authors
    },
    reviews: () => {
      return db.reviews
    },
  },
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: {
    port: PORT,
  },
})

console.log(`🚀 Server ready at port: `, PORT)
