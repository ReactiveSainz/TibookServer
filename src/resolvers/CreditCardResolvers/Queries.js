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
      if (cards) return cards.data;

      return null;
    }
  ),
  defaultCard: combineResolvers(
    isAuthenticated,
    async (parent, { cardToken }, { secret, me }) => {
      const customer = await stripe.customers.retrieve(me.customerId);
      console.log("customer", customer);
      if (customer) return customer.default_source;
      return "";
    }
  )
};
