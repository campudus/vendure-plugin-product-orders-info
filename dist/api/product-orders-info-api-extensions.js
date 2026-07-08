"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOrdersInfoAdminApiExtensions = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.productOrdersInfoAdminApiExtensions = (0, graphql_tag_1.default) `
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
//# sourceMappingURL=product-orders-info-api-extensions.js.map