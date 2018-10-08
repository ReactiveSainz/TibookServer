import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, ForbiddenError } from "apollo-server";
import { CreditCardModel } from "../../models";
import stripePackage from "stripe";
var stripe = stripePackage("sk_test_ZkfNxv8qYN15b6bWsfqHYPDX");

export default {
  creditCards: combineResolvers(
    isAuthenticated,
    async (parent, { cardToken }, { secret, me }) => {
      const cards = await stripe.customers.listCards(me.customerId);
      console.log("cards", cards);
      if (cards) return cards.data;

      return null;
    }
  )
};
