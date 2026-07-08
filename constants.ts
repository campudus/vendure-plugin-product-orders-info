import { ProductOrdersInfoPluginOptions } from "./types";

export const PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS = Symbol("PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS");

export const defaultProductOrdersInfoPluginOptions: Required<ProductOrdersInfoPluginOptions> = {
  orderStates: ["PaymentSettled", "PartiallyShipped", "Shipped", "PartiallyDelivered", "Delivered"],
};
