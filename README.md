# Product Orders Info Plugin

Adds an order overview block to the Vendure Dashboard product detail page. The block lists orders that contain the current product, including customer name, order date, quantity and order total.

## Installation

Requires Vendure 3.5 or newer as the plugin ships a Vendure Dashboard extension.

```bash
# Latest (main branch):
npm install github:campudus/vendure-plugin-product-orders-info

# Pin to a specific release:
npm install github:campudus/vendure-plugin-product-orders-info#v1.0.0
```

## Usage

Add the plugin to your Vendure config:

```ts
import { ProductOrdersInfoPlugin } from "@campudus/vendure-plugin-product-orders-info";

export const config = {
  // ...
  plugins: [
    ProductOrdersInfoPlugin.init(),
  ],
};
```

The plugin also registers a React Dashboard extension via the `dashboard` property on the Vendure plugin. When your project builds the Vendure Dashboard with `vendureDashboardPlugin`, the `Orders` block is added to the `product-detail` page after the variants table.

## Configuration

By default, the query includes orders in these states:

```ts
["PaymentSettled", "PartiallyShipped", "Shipped", "PartiallyDelivered", "Delivered"]
```

You can override the list:

```ts
ProductOrdersInfoPlugin.init({
  orderStates: ["Shipped", "Delivered"],
});
```

Set `orderStates` to an empty array to include every order that contains the product.

## Admin API

The plugin extends the Admin API with:

```graphql
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
```

The `productOrders` query requires the `ReadOrder` permission.

## Development

Build the package:

```bash
npm run build
```
