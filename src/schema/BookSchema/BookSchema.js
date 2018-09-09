import { gql } from "apollo-server";

export default gql`
  type Book {
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
