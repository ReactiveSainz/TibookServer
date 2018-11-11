import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    buyBook(publicationId: ID!, quantity: Int!): Transaction
  }

  type Transaction {
    id: ID!
  }
`;
