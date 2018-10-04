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
  )
};
