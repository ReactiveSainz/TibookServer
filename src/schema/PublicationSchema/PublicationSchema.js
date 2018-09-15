import { gql } from "apollo-server";

export default gql`
  extend type Query {
    publications: [Publication!]
    findBookbyISBN (bookISBN: String):[String]
  }

  extend type Mutation {
    createPublication(
      bookISBN: String!
      type: String!
      price: Float!
      quantity: Int!
    ): Publication
  }

  type Publication {
    bookISBN: String!
    type: String!
    price: Float!
    quantity: Int!
    userId: String!
  }
`;
