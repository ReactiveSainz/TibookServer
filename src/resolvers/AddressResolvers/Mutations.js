import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { AddressModel } from "../../models";

export default {
  addAddress: combineResolvers(
    isAuthenticated,
    async (parent, data, { secret, me }) => {
      const Address = await new AddressModel({
        ...data,
        userId: me._id
      });

      console.log("Address", Address);
      await Address.save();
      return Address;
    }
  ),
  updateAddress: combineResolvers(
    isAuthenticated,
    async (parent, { id, ...data }, { secret, me }) => {
      return AddressModel.findByIdAndUpdate(id, { ...data }, { new: true })
        .then(res => {
          console.log("res", res);
          return res;
        })
        .catch({});
    }
  ),
  deleteAddress: combineResolvers(
    isAuthenticated,
    async (parent, { id }, { secret, me }) => {
      console.log("id",id)
      return AddressModel.findByIdAndDelete(id)
        .then(res => {
          return "ok";
        })
        .catch(error => {
          return "error";
        });
    }
  )
};
