import { gql } from "apollo-server";
export default gql`
  extend type Query {
    addresses: [Address]
  }
  extend type Mutation {
    addAddress(
      state: String!
      city: String!
      neighborhood: String!
      cp: String!
      street: String!
      number: String!
      intNumber: String
    ): Address

    updateAddress(
      id: ID!
      state: String
      city: String
      neighborhood: String
      cp: String
      street: String
      number: String
      intNumber: String
    ): Address

    deleteAddress(id: ID!): String
  }

  type Address {
    id: ID!
    state: String!
    city: String!
    neighborhood: String!
    cp: String!
    street: String!
    number: String!
    intNumber: String
    userId: ID!
  }
`;
