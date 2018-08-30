import { ApolloServer, gql } from "apollo-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Schema from "./src/schema/";
import Resolver from "./src/resolvers";

import UserModel from "./src/models/User";

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
      return await jwt.verify(token, process.env.SECRET).then(data => {
        console.log("data", data);
        return data;
      });
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
    const me = getMe(req);
    return {
      me,
      secret: process.env.SECRET
    };
  }
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

mongoose.connect("mongodb://127.0.0.1/Proyect");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  /* const user = new UserModel({
    name: "sainz2",
    email: "sainz2@gmail.com",
    password: "abc123",
    gender: "male",
    role: "admin"
  });

  user.save((err, user) => {
    if (err) console.log(err);
    else console.log(user);
  }); */

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
