const { ApolloServer, gql } = require("apollo-server");

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

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
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
    authors: () => Authors.map(author => author.name),
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

// const directiveResolvers = {
//   hasRole: (next, source, { role }, ctx) => {
//     const user = getUser();
//     if (role === user.role) return next();
//     throw new Error(`Must have role: ${role}, you have role: ${user.role}`);
//   }
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  playground: {
    settings: {
      "editor.theme": "light",
      "editor.cursorShape": "block"
    }
  }
});

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  //console.log("fsfsdfsd", process.env);
  console.log(`🚀  Server ready at ${url}`);
});
