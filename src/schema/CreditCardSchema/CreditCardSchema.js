import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    createCreditCard(cardToken: String!): CreditCard
  }
  type CreditCard {
    id: ID!
    stripeCardId: String!
  }
`;
