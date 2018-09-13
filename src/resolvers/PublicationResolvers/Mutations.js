import { PublicationModel, UserModel } from "../../models";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, ForbiddenError } from "apollo-server";
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
  ),
  updatePublication: combineResolvers(
    isAuthenticated,
    async (parent, { id, type, price, quantity }, { secret, me }) => {
      const publication = await PublicationModel.findById(id);

      if (publication) {
        if (publication.userId === me.id) {
          publication.type = type;
          publication.price = price;
          publication.quantity = quantity;

          await 
        } else {
          throw new ForbiddenError("forbidden");
        }
      }

      return await publication.save();
    }
  )
};
