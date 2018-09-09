import { gql } from "apollo-server";


import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

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
    id: ID!
    created: GraphQLDateTime
    updated:GraphQLDateTime
    name: String!
    email: String!
    nickname: String!
    role: String
    gender: String
    defaultCreditCard: ID
    publications: [Publication]
    
  }
`;
