import { api, DetailPageButton, useLocalFormat, useQuery } from "@vendure/dashboard";
import { useMemo, useState } from "react";

import "./ProductOrdersInfo.scss";

type ProductOrderInfo = {
  orderId: string;
  orderCode: string;
  customerFirstName: string;
  customerLastName: string;
  quantity: number;
  orderDate: string;
  totalWithTax: number;
  currencyCode: string;
};

type ProductOrdersQuery = {
  productOrders: {
    items: ProductOrderInfo[];
    totalItems: number;
  };
};

type SortKey = "orderCode" | "customer" | "quantity" | "orderDate" | "totalWithTax";

const ITEMS_PER_PAGE = 10;
const FORMAT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
};

const GET_PRODUCT_ORDERS = `
  query GetProductOrdersDashboard($productId: ID!) {
    productOrders(productId: $productId) {
      items {
        orderId
        orderCode
        customerFirstName
        customerLastName
        quantity
        orderDate
        totalWithTax
        currencyCode
      }
      totalItems
    }
  }
`;

export function ProductOrdersInfoBlock({ productId }: { productId: string }) {
  const { formatCurrency, formatDate } = useLocalFormat();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("orderDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const { data } = useQuery({
    queryKey: ["product-orders", productId],
    queryFn: () => api.query<ProductOrdersQuery, { productId: string }>(GET_PRODUCT_ORDERS, { productId }),
    enabled: !!productId,
  });

  const orderList = data?.productOrders;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(dir => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }

    setCurrentPage(1);
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) {
      return <span className="sort-indicator inactive">-</span>;
    }

    return <span className="sort-indicator active">{sortDir === "asc" ? "^" : "v"}</span>;
  };

  const filteredOrders = useMemo(() => {
    if (!orderList) {
      return [];
    }

    const lowerSearchTerm = searchTerm.toLowerCase().trim();

    if (!lowerSearchTerm) {
      return orderList.items;
    }

    return orderList.items.filter(order => {
      const fullName = `${order.customerFirstName} ${order.customerLastName}`.toLowerCase();
      const orderCode = order.orderCode.toLowerCase();

      return (
        orderCode.includes(lowerSearchTerm) ||
        fullName.includes(lowerSearchTerm) ||
        order.customerFirstName.toLowerCase().includes(lowerSearchTerm) ||
        order.customerLastName.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [orderList, searchTerm]);

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case "orderCode":
          comparison = a.orderCode.localeCompare(b.orderCode);
          break;
        case "customer":
          comparison = `${a.customerFirstName} ${a.customerLastName}`.toLowerCase().localeCompare(
            `${b.customerFirstName} ${b.customerLastName}`.toLowerCase(),
          );
          break;
        case "quantity":
          comparison = a.quantity - b.quantity;
          break;
        case "orderDate":
          comparison = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
          break;
        case "totalWithTax":
          comparison = a.totalWithTax - b.totalWithTax;
          break;
      }

      return sortDir === "asc" ? comparison : -comparison;
    });
  }, [filteredOrders, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedOrders = sortedOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (!orderList) {
    return null;
  }

  return (
    <div className="product-orders-info">
      {orderList.items.length === 0 ? (
        <div className="no-orders">No orders found</div>
      ) : (
        <>
          <div className="product-orders-info__search">
            <input
              type="text"
              className="search-input"
              placeholder="Search by order code or customer name"
              value={searchTerm}
              onChange={event => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {filteredOrders.length === 0 ? (
            <div className="no-orders">No matching orders found</div>
          ) : (
            <>
              <table className="orders-table">
                <thead>
                  <tr className="heading-row">
                    <th className="cell-content left sortable" onClick={() => handleSort("orderCode")}>
                      Order {sortIndicator("orderCode")}
                    </th>

                    <th className="cell-content left sortable" onClick={() => handleSort("customer")}>
                      Customer {sortIndicator("customer")}
                    </th>

                    <th className="cell-content center sortable" onClick={() => handleSort("quantity")}>
                      Qty {sortIndicator("quantity")}
                    </th>

                    <th className="cell-content right sortable" onClick={() => handleSort("orderDate")}>
                      Date {sortIndicator("orderDate")}
                    </th>

                    <th className="cell-content right sortable" onClick={() => handleSort("totalWithTax")}>
                      Total {sortIndicator("totalWithTax")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedOrders.map(order => (
                    <tr key={`${order.orderId}-${order.orderCode}`}>
                      <td className="cell-content left">
                        <DetailPageButton
                          label={order.orderCode}
                          className="order-link"
                          href={`/orders/${order.orderId}`}
                        />
                      </td>

                      <td className="cell-content left">
                        {[order.customerFirstName, order.customerLastName].filter(Boolean).join(" ")}
                      </td>

                      <td className="cell-content center">{order.quantity}</td>
                      <td className="cell-content right">{formatDate(order.orderDate, FORMAT_DATE_OPTIONS)}</td>
                      <td className="cell-content right">{formatCurrency(order.totalWithTax, order.currencyCode)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                  >
                    {"<<"}
                  </button>

                  <button
                    className="pagination-button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    {"<"}
                  </button>

                  <span className="pagination-info">
                    Page {currentPage} of {totalPages} ({filteredOrders.length} results)
                  </span>

                  <button
                    className="pagination-button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    {">"}
                  </button>

                  <button
                    className="pagination-button"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    {">>"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
