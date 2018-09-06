import userSchema from "./UserSchema";
import transactionSchema from "./TransactionSchema";
import publicationSchema from "./PublicationSchema";
import creditCardSchema from "./CreditCardSchema";

import { gql } from "apollo-server";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  userSchema,
  creditCardSchema,
  publicationSchema,
  transactionSchema
];
