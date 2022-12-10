// deno-lint-ignore-file require-await
const { UserInputError, AuthenticationError } = require('@apollo/server')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => {
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log(context.currentUser)

      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author })
      try {
        book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      return author.save()
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      try {
        user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
