import jwt from "jsonwebtoken";
import { UserModel } from "../../models/";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";

import { AuthenticationError, UserInputError } from "apollo-server";
import moment from "moment";

var stripe = require("stripe")(
  process.env.STRIPE_KEY || "sk_test_ZkfNxv8qYN15b6bWsfqHYPDX"
);

require("mongodb-moment")(moment);

moment.locale("es");

const createToken = async (user, secret, expiresIn = null) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    ...(expiresIn && { expiresIn })
  });
};

export default {
  signUp: async (
    parent,
    { name, lastname, email, password, gender, role, nickname },
    { secret }
  ) => {
    const customer = await stripe.customers.create({
      email
    });

    console.log("customer", customer);
    if (!customer) return null;
    // console.log("customer", customer);

    const user = new UserModel({
      name,
      lastname,
      email,
      password,
      gender,
      role,
      nickname,
      customerId: customer.id,
      created: moment().valueOf()
    });

    console.log("new User", user);
    await user.save();

    return { token: createToken(user, secret) };
  },
  signIn: async (parent, { mainField, password }, { secret }) => {
    const user = await UserModel.findOne({
      $or: [{ email: mainField }, { nickname: mainField }]
    });
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
    async (parent,data , { me }) => {
      return UserModel.findByIdAndUpdate(me.id, { ...data,updated:moment().valueOf(); }, { new: true })
      .then(res => {
        console.log("res", res);
        return res;
      })
      .catch({});
    }
  ),

  deleteUser: combineResolvers(
    isAdmin,
    async (parent, { id }, context) => await UserModel.deleteOne({ _id: id })
  )
};
