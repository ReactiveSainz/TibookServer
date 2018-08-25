const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  },
  {
    title: "dfsdfsd",
    author: "dsfsdfdsf"
  }
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  playground: {
    settings: {
      "editor.theme": "light"
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
