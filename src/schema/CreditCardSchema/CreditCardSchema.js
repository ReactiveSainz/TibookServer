import { gql } from "apollo-server";

export default gql`
  extend type Mutation {
    createCreditCard(cardToken: String!): CreditCard
    deleteCreditCard(stripeCardId: ID!): CardDeleted
    setDefaultCard(stripeCardId: ID!): String
  }

  extend type Query {
    creditCards: [CreditCardData]
    defaultCard: String!
  }

  type CreditCard {
    id: ID!
    stripeCardId: String!
  }

  type CardDeleted {
    id: String!
    deleted: Boolean!
  }

  type CreditCardData {
    last4: String!
    exp_month: Int!
    exp_year: Int!
    brand: String!
    country: String!
    funding: String!
  }
`;
