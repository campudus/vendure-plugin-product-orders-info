import { Type } from "@vendure/common/lib/shared-types";
import { ProductOrdersInfoPluginOptions } from "./types";
/**
 * Adds a "Product Orders Info" block to the Vendure Dashboard product detail page.
 *
 * The plugin extends the Admin API with `productOrders(productId: ID!)` and
 * requires `Permission.ReadOrder` for the query.
 *
 * @category Plugin
 */
export declare class ProductOrdersInfoPlugin {
    static options: Required<ProductOrdersInfoPluginOptions>;
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
    static init(options?: ProductOrdersInfoPluginOptions): Type<ProductOrdersInfoPlugin>;
}
//# sourceMappingURL=ProductOrdersInfoPlugin.d.ts.map