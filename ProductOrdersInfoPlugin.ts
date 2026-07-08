import { Type } from "@vendure/common/lib/shared-types";
import { PluginCommonModule, VendurePlugin } from "@vendure/core";

import { defaultProductOrdersInfoPluginOptions, PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS } from "./constants";
import { ProductOrdersInfoAdminResolver } from "./api/ProductOrdersInfoAdminResolver";
import { adminApiExtensions } from "./api/graphql/admin/admin-api-extensions";
import { ProductOrdersInfoPluginOptions } from "./types";
import { ProductOrdersInfoService } from "./service/ProductOrdersInfoService";

/**
 * Adds a "Product Orders Info" block to the Vendure Dashboard product detail page.
 *
 * The plugin extends the Admin API with `productOrders(productId: ID!)` and
 * requires `Permission.ReadOrder` for the query.
 *
 * @category Plugin
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS,
      useFactory: () => ProductOrdersInfoPlugin.options,
    },
    ProductOrdersInfoService,
  ],
  exports: [ProductOrdersInfoService],
  compatibility: "^3.5.0",
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [ProductOrdersInfoAdminResolver],
  },
  dashboard: "./dashboard/index.tsx",
})
export class ProductOrdersInfoPlugin {
  static options: Required<ProductOrdersInfoPluginOptions> = defaultProductOrdersInfoPluginOptions;

  /**
   * Configure the product order overview.
   *
   * @example
   * ```ts
   * ProductOrdersInfoPlugin.init({
   *   orderStates: ["PaymentSettled", "Shipped", "Delivered"],
   * })
   * ```
   */
  static init(options: ProductOrdersInfoPluginOptions = {}): Type<ProductOrdersInfoPlugin> {
    this.options = {
      ...defaultProductOrdersInfoPluginOptions,
      ...options,
    };

    return ProductOrdersInfoPlugin;
  }
}
