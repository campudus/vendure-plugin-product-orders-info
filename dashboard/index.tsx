import { defineDashboardExtension } from "@vendure/dashboard";

import { ProductOrdersInfo } from "./components/ProductOrdersInfo";

defineDashboardExtension({
  pageBlocks: [
    {
      id: "product-orders-info",
      title: "Orders",
      location: {
        pageId: "product-detail",
        column: "main",
        position: { blockId: "product-variants-table", order: "after" },
      },
      component: ({ context }) => {
        const productId = (context?.entity as any)?.id;

        if (!productId) {
          return null;
        }

        return <ProductOrdersInfo productId={String(productId)} />;
      },
    },
  ],
});
