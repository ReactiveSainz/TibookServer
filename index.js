import { ApolloServer, gql } from "apollo-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Schema from "./src/schema/";
import Resolver from "./src/resolvers";

const Authors = [
  { name: "sainz", role: "admin", id: "0" },
  { name: "sfsdfsd", role: "user", id: "1" }
];

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    authorId: "0",
    id: "0"
  },
  {
    title: "Jurassic Park",
    authorId: "0",
    id: "1"
  },
  {
    title: "dfsdfsd",
    authorId: "1",
    id: "2"
  }
];

const getMe = async req => {
  const token = req.headers["token"];

  if (token) {
    try {
      const me = await jwt.verify(
        token,
        process.env.SECRET,
        (err, decoded) => decoded
      );

      return me;
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const typeDefs = gql`
  enum Role {
    admin
    user
  }

  type Book {
    id: String!
    title: String
    author: Author
  }

  type Author {
    id: String!
    name: String
    role: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    authorById(id: String!): Author
    bookById(id: String!): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => Authors,
    authorById: (root, { id }) => Authors.find(author => author.id == id),
    bookById: (root, { id }) => books.find(book => book.id == id)
  },
  Author: {
    books: Author => books.filter(book => book.authorId == Author.id)
  },
  Book: {
    author: Book => Authors.find(author => author.id == Book.authorId)
  }
};

const server = new ApolloServer({
  typeDefs: Schema,
  resolvers: Resolver,
  introspection: true,
  playground: true,
  playground: {
    settings: {
      "editor.theme": "light",
      "editor.cursorShape": "block"
    }
  },
  context: async ({ req, connection, ...args }) => {
    const me = await getMe(req);
    return {
      me,
      secret: process.env.SECRET
    };
  }
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

mongoose.connect(
  `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${
    process.env.DATABASE
  }`
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
