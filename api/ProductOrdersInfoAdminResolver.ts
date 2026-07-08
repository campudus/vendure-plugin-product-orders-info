import { Args, Query, Resolver } from "@nestjs/graphql";
import { ID } from "@vendure/common/lib/shared-types";
import { Permission } from "@vendure/common/lib/generated-types";
import { Allow, Ctx, RequestContext } from "@vendure/core";

import { ProductOrderList } from "../types";
import { ProductOrdersInfoService } from "../service/ProductOrdersInfoService";

@Resolver()
export class ProductOrdersInfoAdminResolver {
  constructor(
    private productOrdersInfoService: ProductOrdersInfoService,
  ) {
  }

  @Allow(Permission.ReadOrder)
  @Query()
  productOrders(
    @Ctx() ctx: RequestContext,
    @Args("productId") productId: ID,
  ): Promise<ProductOrderList> {
    return this.productOrdersInfoService.getProductOrders(ctx, productId);
  }
}
