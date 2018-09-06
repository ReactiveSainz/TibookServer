import { PublicationModel, UserModel } from "../../models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";

export default {
  createPublication: combineResolvers(
    isAuthenticated,
    async (parent, { bookISBN, type, price, quantity }, { secret, me }) => {
      const publication = await new PublicationModel({
        bookISBN,
        type,
        price,
        quantity,
        userId: me.id
      });
      await publication.save();
      return publication;
    }
  )
};
