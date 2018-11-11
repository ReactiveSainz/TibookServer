import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "../Authorization";
import { AuthenticationError, ForbiddenError } from "apollo-server";

import stripePackage from "stripe";
var stripe = stripePackage("sk_test_ZkfNxv8qYN15b6bWsfqHYPDX");

var destination = "card_1DU00uIsoboI3nHjKbZ2kOBb";
export default {
  buyBook: combineResolvers(
    isAuthenticated,
    async (parent, { publicationId, quantity }, { secret, me }) => {
      const customer = await stripe.customers.retrieve(me.customerId);
      if (!customer) return null;

      const total = parseInt(quantity) * 2000;

      const charge = await stripe.charges.create({
        amount: total,
        currency: "mxn",
        customer: me.customerId,
        source: customer.default_source
      });

      //   console.log("charge", charge);

      const transfer = await stripe.transfers.create({
        amount: total / 2,
        currency: "mxn",
        description: "compra de ...",
        card: destination
      });

      console.log("transfer", transfer);

      return {
        id: "123sdfsdfsdfds"
      };
    }
  )
};
