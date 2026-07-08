import { ID } from "@vendure/common/lib/shared-types";

/**
 * Configuration options for {@link ProductOrdersInfoPlugin}.
 */
export interface ProductOrdersInfoPluginOptions {
  /**
   * Order states included in the product order overview.
   *
   * Set this to an empty array to include every order which contains the product.
   */
  orderStates?: string[];
}

/**
 * Order summary shown for a product in the Vendure Dashboard.
 */
export interface ProductOrderInfo {
  orderId: ID;
  orderCode: string;
  customerFirstName: string;
  customerLastName: string;
  quantity: number;
  orderDate: Date;
  totalWithTax: number;
  currencyCode: string;
}

export interface ProductOrderList {
  items: ProductOrderInfo[];
  totalItems: number;
}
