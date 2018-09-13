import jwt from "jsonwebtoken";
import { UserModel } from "../../models/";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, UserInputError } from "apollo-server";
import moment from "moment";
require("mongodb-moment")(moment);

moment.locale("es");

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn
  });
};

export default {
  signUp: async (
    parent,
    { name, lastname, email, password, gender, role, nickname },
    { secret }
  ) => {
    const user = new UserModel({
      name,
      lastname,
      email,
      password,
      gender,
      role,
      nickname,
      created: moment().valueOf()
    });

    await user.save();
    return { token: createToken(user, secret, "10000m") };
  },

  signIn: async (parent, { email, password }, { secret }) => {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new UserInputError("No user found with this login credentials.");
    }
    let isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new AuthenticationError("Invalid password.");
    }
    return { token: createToken(user, secret, "30m") };
  },

  updateUser: combineResolvers(
    isAuthenticated,
    async (parent, { id, name }, { me }) => {
      const user = await UserModel.findById(me.id);
      user.name = name;
      user.updated = moment().valueOf();
      return await user.save();
    }
  ),

  deleteUser: combineResolvers(
    isAdmin,
    async (parent, { id }, context) => await UserModel.deleteOne({ _id: id })
  )
};
