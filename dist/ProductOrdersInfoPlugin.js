"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProductOrdersInfoPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrdersInfoPlugin = void 0;
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const ProductOrdersInfoAdminResolver_1 = require("./api/ProductOrdersInfoAdminResolver");
const admin_api_extensions_1 = require("./api/graphql/admin/admin-api-extensions");
const ProductOrdersInfoService_1 = require("./service/ProductOrdersInfoService");
/**
 * Adds a "Product Orders Info" block to the Vendure Dashboard product detail page.
 *
 * The plugin extends the Admin API with `productOrders(productId: ID!)` and
 * requires `Permission.ReadOrder` for the query.
 *
 * @category Plugin
 */
let ProductOrdersInfoPlugin = ProductOrdersInfoPlugin_1 = class ProductOrdersInfoPlugin {
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
    static init(options = {}) {
        this.options = {
            ...constants_1.defaultProductOrdersInfoPluginOptions,
            ...options,
        };
        return ProductOrdersInfoPlugin_1;
    }
};
exports.ProductOrdersInfoPlugin = ProductOrdersInfoPlugin;
ProductOrdersInfoPlugin.options = constants_1.defaultProductOrdersInfoPluginOptions;
exports.ProductOrdersInfoPlugin = ProductOrdersInfoPlugin = ProductOrdersInfoPlugin_1 = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        providers: [
            {
                provide: constants_1.PRODUCT_ORDERS_INFO_PLUGIN_OPTIONS,
                useFactory: () => ProductOrdersInfoPlugin.options,
            },
            ProductOrdersInfoService_1.ProductOrdersInfoService,
        ],
        exports: [ProductOrdersInfoService_1.ProductOrdersInfoService],
        compatibility: "^3.5.0",
        adminApiExtensions: {
            schema: admin_api_extensions_1.adminApiExtensions,
            resolvers: [ProductOrdersInfoAdminResolver_1.ProductOrdersInfoAdminResolver],
        },
        dashboard: "./dashboard/index.tsx",
    })
], ProductOrdersInfoPlugin);
//# sourceMappingURL=ProductOrdersInfoPlugin.js.map