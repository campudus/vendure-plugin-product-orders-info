import gql from "graphql-tag";

export const adminApiExtensions = gql`
  type ProductOrderInfo {
    orderId: ID!
    orderCode: String!
    customerFirstName: String!
    customerLastName: String!
    quantity: Int!
    orderDate: DateTime!
    totalWithTax: Money!
    currencyCode: CurrencyCode!
  }

  type ProductOrderList {
    items: [ProductOrderInfo!]!
    totalItems: Int!
  }

  extend type Query {
    productOrders(productId: ID!): ProductOrderList!
  }
`;
