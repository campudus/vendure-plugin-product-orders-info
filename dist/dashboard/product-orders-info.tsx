import { defineDashboardExtension } from "@vendure/dashboard";

import { ProductOrdersInfoBlock } from "./components/ProductOrdersInfoBlock";

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

        return <ProductOrdersInfoBlock productId={String(productId)} />;
      },
    },
  ],
});
