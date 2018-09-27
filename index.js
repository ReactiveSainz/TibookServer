import { ApolloServer, AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import Schema from "./src/schema/";
import Resolver from "./src/resolvers";

import { UserModel } from "./src/models";

const getMe = async req => {
  const token = req.headers["token"];
  if (token) {
    try {
      const me = await jwt.verify(
        token,
        process.env.SECRET,
        (err, decoded) => decoded
      );
      console.log("me", me);
      if (me) {
        const user = await UserModel.findById(me.id);
        return user;
      } else return null;
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
  return null;
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
    console.log("requesting");
    const me = await getMe(req);
    console.log("me", me);
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
