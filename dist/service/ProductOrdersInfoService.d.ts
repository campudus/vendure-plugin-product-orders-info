import { ID } from "@vendure/common/lib/shared-types";
import { RequestContext, TransactionalConnection } from "@vendure/core";
import { ProductOrderList, ProductOrdersInfoPluginOptions } from "../types";
/**
 * Provides order summaries for products.
 */
export declare class ProductOrdersInfoService {
    private connection;
    private options;
    constructor(connection: TransactionalConnection, options: Required<ProductOrdersInfoPluginOptions>);
    /**
     * Returns orders containing any variant of the given product.
     */
    getProductOrders(ctx: RequestContext, productId: ID): Promise<ProductOrderList>;
}
//# sourceMappingURL=ProductOrdersInfoService.d.ts.map