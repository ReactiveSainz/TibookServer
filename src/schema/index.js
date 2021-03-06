import userSchema from "./UserSchema";
import addressSchema from "./AddressSchema";
import transactionSchema from "./TransactionSchema";
import publicationSchema from "./PublicationSchema";
import creditCardSchema from "./CreditCardSchema";
import bookSchema from "./BookSchema";

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
  addressSchema,
  creditCardSchema,
  publicationSchema,
  transactionSchema,
  bookSchema
];
