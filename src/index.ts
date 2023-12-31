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
  Mutation: {
    addGame: (
      _: any,
      args: { game: { title: string; platform: string[] } }
    ) => {
      const newGame = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      }
      db.games.push(newGame)

      return newGame
    },
    updateGame: (
      _: any,
      args: { id: string; edits: { title: string; platform: string[] } }
    ) => {
      const game = db.games.find((game) => game.id === args.id)

      if (!game) {
        throw new Error("Game not found")
      }

      const updatedGame = {
        ...game,
        ...args.edits,
      }
      db.games = db.games.map((game) =>
        game.id === args.id ? updatedGame : game
      )

      return updatedGame
    },
    deleteGame: (_: any, args: { id: string }) => {
      db.games = db.games.filter((game) => game.id !== args.id)

      return db.games
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
