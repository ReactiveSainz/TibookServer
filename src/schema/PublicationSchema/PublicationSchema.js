import { gql } from "apollo-server";

export default gql`
  extend type Query {
    publications: [Publication!]
    publicationsByType(bookType: String): [Publication!]
  }
  
  extend type Mutation {
    createPublication(
      bookISBN: String!
      type: String!
      price: Float!
      quantity: Int!
    ): Publication

    updatePublication(
      id: ID!
      type: String!
      price: Float!
      quantity: Int!
    ): Publication
  }

  type Publication {
    id: ID!
    bookISBN: String!
    type: String!
    price: Float!
    quantity: Int!
    userId: String!
    thumbnail: String
  }
`;
