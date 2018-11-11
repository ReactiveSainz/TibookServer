import { gql } from "apollo-server";

export default gql`
  extend type Query {
    findBookbyISBN(bookISBN: String): Book
    findBooks(bookISBN: String): [Book]
  }

  type Book {
    id: ID
    title: String!
    authors: [String]
    publisher: String
    description: String
    publishedDate: Int
    pageCount: Int
    imageLinks: [String]
  }

  type Author {
    name: String!
  }
`;
