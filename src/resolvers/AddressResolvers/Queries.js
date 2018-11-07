import { PublicationModel, AddressModel } from "../../models/";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
export default {
    addresses:combineResolvers(
        isAuthenticated,
        async (parent, data, { secret, me }) => {
          const addresses = await AddressModel.find({ userId: me._id});
          return addresses;
        }
      ),
};
