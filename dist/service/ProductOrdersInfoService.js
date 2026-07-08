"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrdersInfoService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const constants_1 = require("../constants");
/**
 * Provides order summaries for products.
 */
let ProductOrdersInfoService = class ProductOrdersInfoService {
    constructor(connection, options) {
        this.connection = connection;
        this.options = options;
    }
    /**
     * Returns orders containing any variant of the given product.
     */
    async getProductOrders(ctx, productId) {
        var _a, _b;
        const queryBuilder = this.connection
            .getRepository(ctx, core_1.OrderLine)
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
        const orderMap = new Map();
        /*
         * If an order contains multiple variants of the same product,
         * the quantity of the order lines of the same order will be summed up in the resulting list.
         */
        for (const orderLine of orderLines) {
            const orderId = orderLine.order.id;
            const existing = orderMap.get(orderId);
            if (existing) {
                existing.quantity += orderLine.quantity;
            }
            else {
                orderMap.set(orderId, {
                    orderId,
                    orderCode: orderLine.order.code,
                    customerFirstName: ((_a = orderLine.order.customer) === null || _a === void 0 ? void 0 : _a.firstName) || "",
                    customerLastName: ((_b = orderLine.order.customer) === null || _b === void 0 ? void 0 : _b.lastName) || "",
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
};
exports.ProductOrdersInfoService = ProductOrdersInfoService;
exports.ProductOrdersInfoService = ProductOrdersInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS)),
    __metadata("design:paramtypes", [core_1.TransactionalConnection, Object])
], ProductOrdersInfoService);
//# sourceMappingURL=ProductOrdersInfoService.js.map