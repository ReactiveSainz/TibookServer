import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { CreditCardModel } from "../../models";
import stripePackage from "stripe";
var stripe = stripePackage("sk_test_ZkfNxv8qYN15b6bWsfqHYPDX");

export default {
  createCreditCard: combineResolvers(
    isAuthenticated,
    async (parent, { cardToken }, { secret, me }) => {
      console.log("me", me);//me._id
      const card = await stripe.customers.createSource(me.customerId, {
        source: cardToken
      });

      console.log("card", card);
      const newCard = new CreditCardModel({
        userId: me._id,
        stripeCardId: card.id
      });
      await newCard.save();
      return newCard;
    }
  ),
  deleteCreditCard: combineResolvers(
    isAuthenticated,
    async (parent, { stripeCardId }, { secret, me }) => {
      const cardDeletedRes = await stripe.customers.deleteCard(
        me.customerId,
        stripeCardId
      );
      console.log("cardDeletedRes", cardDeletedRes);
      if (cardDeletedRes) return cardDeletedRes;

      return null;
    }
  ),
  setDefaultCard: combineResolvers(
    isAuthenticated,
    async (parent, { stripeCardId }, { secret, me }) => {
      return stripe.customers.update(
        me.customerId,
        {
          default_source: stripeCardId
        },
        function(err, customer) {
          if (err) return "error";

          return "ok";
        }
      );
      console.log("fsfsd sdfsdf ds");
    }
  )
};
