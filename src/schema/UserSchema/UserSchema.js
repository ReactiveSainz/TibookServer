import { gql } from "apollo-server";

export default gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    userByName(name: String!): User
  }

  extend type Mutation {
    signUp(
      name: String!
      email: String!
      password: String!
      gender: String!
      role: String
    ): Token!

    signIn(email: String!, password: String!): Token!
    updateUser(name: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    name: String!
    id: ID!
    email: String!
    role: String
    gender: String
  }
`;
