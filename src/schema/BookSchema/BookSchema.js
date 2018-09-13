import { gql } from "apollo-server";

export default gql`
  type Book {
    id: ID!
    title: Sring!
    publisher: String!
    publisherDate: String!
    authors: [Author]!
    pageCount: Int!
    images: [String]!
    maturityRating: String
  }

  type Author {
    name: String!
  }
`;
