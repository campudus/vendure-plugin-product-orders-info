import { Inject, Injectable } from "@nestjs/common";
import { ID } from "@vendure/common/lib/shared-types";
import { OrderLine, RequestContext, TransactionalConnection } from "@vendure/core";

import { PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS } from "../constants";
import { ProductOrderInfo, ProductOrderList, ProductOrdersInfoPluginOptions } from "../types";

/**
 * Provides order summaries for products.
 */
@Injectable()
export class ProductOrdersInfoService {
  constructor(
    private connection: TransactionalConnection,
    @Inject(PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS)
    private options: Required<ProductOrdersInfoPluginOptions>,
  ) {
  }

  /**
   * Returns orders containing any variant of the given product.
   */
  async getProductOrders(ctx: RequestContext, productId: ID): Promise<ProductOrderList> {
    const queryBuilder = this.connection
      .getRepository(ctx, OrderLine)
      .createQueryBuilder("orderLine")
      .innerJoinAndSelect("orderLine.order", "order")
      .leftJoinAndSelect("order.customer", "customer")
      .innerJoin("orderLine.productVariant", "productVariant")
      .innerJoin("productVariant.product", "product")
      .where("product.id = :productId", { productId })
      .orderBy("order.orderPlacedAt", "DESC");

    if (this.options.orderStates.length > 0) {
      queryBuilder.andWhere("order.state IN (:...orderStates)", { orderStates: this.options.orderStates });
    }

    const orderLines = await queryBuilder.getMany();
    const orderMap = new Map<ID, ProductOrderInfo>();

    /*
     * If an order contains multiple variants of the same product,
     * the quantity of the order lines of the same order will be summed up in the resulting list.
     */

    for (const orderLine of orderLines) {
      const orderId = orderLine.order.id;
      const existing = orderMap.get(orderId);

      if (existing) {
        existing.quantity += orderLine.quantity;
      } else {
        orderMap.set(orderId, {
          orderId,
          orderCode: orderLine.order.code,
          customerFirstName: orderLine.order.customer?.firstName || "",
          customerLastName: orderLine.order.customer?.lastName || "",
          quantity: orderLine.quantity,
          orderDate: orderLine.order.orderPlacedAt || orderLine.order.createdAt,
          totalWithTax: orderLine.order.totalWithTax,
          currencyCode: orderLine.order.currencyCode,
        });
      }
    }

    const items = Array.from(orderMap.values());

    return {
      items,
      totalItems: items.length,
    };
  }
}
