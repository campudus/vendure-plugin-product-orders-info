import { ID } from "@vendure/common/lib/shared-types";
import { RequestContext } from "@vendure/core";
import { ProductOrderList } from "../types";
import { ProductOrdersInfoService } from "../service/ProductOrdersInfoService";
export declare class ProductOrdersInfoAdminResolver {
    private productOrdersInfoService;
    constructor(productOrdersInfoService: ProductOrdersInfoService);
    productOrders(ctx: RequestContext, productId: ID): Promise<ProductOrderList>;
}
//# sourceMappingURL=ProductOrdersInfoAdminResolver.d.ts.map