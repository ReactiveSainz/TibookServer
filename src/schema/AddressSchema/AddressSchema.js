import { gql } from "apollo-server";
export default gql`
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
