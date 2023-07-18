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
    game: (_: any, args: { id: string }) => {
      return db.games.find((game) => game.id === args.id)
    },
    authors: () => {
      return db.authors
    },
    author: (_: any, args: { id: string }) => {
      return db.authors.find((author) => author.id === args.id)
    },
    reviews: () => {
      return db.reviews
    },
    review: (_: any, args: { id: string }) => {
      return db.reviews.find((review) => review.id === args.id)
    },
  },
  Game: {
    reviews: (parent: { id: string }) => {
      return db.reviews.filter((review) => review.game_id === parent.id)
    },
  },
  Author: {
    reviews: (parent: { id: string }) => {
      return db.reviews.filter((review) => review.author_id === parent.id)
    },
  },
  Review: {
    game: (parent: { game_id: string }) => {
      return db.games.find((game) => game.id === parent.game_id)
    },
    author: (parent: { author_id: string }) => {
      return db.authors.find((author) => author.id === parent.author_id)
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
