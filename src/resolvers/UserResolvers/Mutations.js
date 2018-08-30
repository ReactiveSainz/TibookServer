import jwt from "jsonwebtoken";
import { UserModel } from "../../models/";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, UserInputError } from "apollo-server";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  });
};

export default {
  signUp: async (
    parent,
    { name, email, password, gender, role },
    { secret }
  ) => {
    const user = new UserModel({
      name,
      email,
      password,
      gender,
      role
    });

    await user.save();

    return { token: createToken(user, secret, "30m") };
  },

  signIn: async (parent, { email, password }, { secret }) => {
    console.log("data", { email, password });
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new UserInputError("No user found with this login credentials.");
    }

    let isValid = await user.comparePassword(password);
    console.log("dfsdfsd", isValid);
    if (!isValid) {
      throw new AuthenticationError("Invalid password.");
    }

    return { token: createToken(user, secret, "30m") };
  },

  updateUser: combineResolvers(
    isAuthenticated,
    async (parent, { name }, { me }) => {
      const user = await UserModel.findById(me.id);
      user.name = name;
      return await user.save();
    }
  ),

  deleteUser: combineResolvers(
    isAdmin,
    async (parent, { id }, context) => await UserModel.deleteOne({ _id: id })
  )
};
