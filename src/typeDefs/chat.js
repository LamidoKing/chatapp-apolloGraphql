import { gql } from 'apollo-server-express'

export default gql`
  type Chat {
    id: ID!
    title: String
    users: [User!]!
    messages: [Message!]!
    lastMessages: Message
    updatedAt: String!
    createdAt: String!
  }
`
