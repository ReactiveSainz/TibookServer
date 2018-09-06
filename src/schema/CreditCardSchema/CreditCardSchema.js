import { gql } from "apollo-server";

export default gql`
  type CreditCard {
    id: ID!
    number: String!
  }
`;
