import { gql } from 'apollo-server-express'

module.exports = gql`
  type Chat {
    id: ID!
    name: String
    users: [User!]!
    messages: [Message!]!
  }
`
