import mongoose from 'mongoose'
import Joi from 'joi'
import { UserInputError } from 'apollo-server-core'
import { User } from '../models'
import { signUp, signIn } from '../schemasValidation'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      Auth.checkSignedIn(req)
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id)
    }

  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      await Joi.validate(args, signUp, { abortEarly: false })

      const user = await User.create(args)

      req.session.userId = user.id

      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { email, password } = args
      await Joi.validate(args, signIn, { abortEarly: false })

      const user = await Auth.attemptSignIn(email, password)
      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      return Auth.signOut(req, res)
    }
  }
}
