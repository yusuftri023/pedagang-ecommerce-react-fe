import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useRef } from "react";
import { getOrderList } from "../../services/order.service";
import { OrderContext } from "../../context";

function OrderTableHead() {
  const { handleSetOrders, activeSort, setActiveSort, setSortBy, pages } =
    useContext(OrderContext);

  const orderRef = useRef("desc");
  const dateRef = useRef("desc");
  const totalRef = useRef("desc");
  const handleSort = (column, ref) => {
    let sortBy;
    ref.current === "desc" ? (ref.current = "asc") : (ref.current = "desc");
    if (column === "Order ID") {
      sortBy = "id";
      setSortBy(() => ({ order: ref.current, column: "id" }));
    } else if (column === "Date") {
      sortBy = "order_date";
      setSortBy(() => ({ order: ref.current, column: "order_date" }));
    } else if (column === "Total") {
      sortBy = "total_price";
      setSortBy(() => ({ order: ref.current, column: "total_price" }));
    }
    getOrderList(pages, 10, sortBy, ref.current).then((res) => {
      handleSetOrders({
        data: res.data,
        total_page: Math.ceil(res.total_count.total / 10),
      });
      setActiveSort(column);
      setSortBy(() => {
        return {
          column: sortBy,
          order: ref.current,
        };
      });
    });
  };
  return (
    <thead className="h-[50px] bg-gray-200">
      <tr className="">
        <th className="w-[12.5%] hover:cursor-pointer">
          <div
            onClick={() => handleSort("Order ID", orderRef)}
            className="flex w-full justify-evenly"
          >
            <span>Order ID</span>
            <div className="flex flex-col justify-center text-xs">
              {activeSort === "Order ID" && (
                <>
                  {orderRef.current === "asc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className=" rotate-[270deg]"
                    />
                  )}
                  {orderRef.current === "desc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className="rotate-90"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </th>
        <th className="w-[30%] hover:cursor-pointer">
          <div
            onClick={() => handleSort("Date", dateRef)}
            className="flex w-full justify-evenly"
          >
            <span>Date</span>
            <div className="flex flex-col justify-center text-xs">
              {activeSort === "Date" && (
                <>
                  {dateRef.current === "asc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className=" rotate-[270deg]"
                    />
                  )}
                  {dateRef.current === "desc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className="rotate-90"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </th>
        <th className="w-[15%] hover:cursor-pointer">
          <div
            onClick={() => handleSort("Total", totalRef)}
            className="flex w-full justify-evenly"
          >
            <span>Total</span>
            <div className="flex flex-col justify-center text-xs">
              {activeSort === "Total" && (
                <>
                  {totalRef.current === "asc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className=" rotate-[270deg]"
                    />
                  )}
                  {totalRef.current === "desc" && (
                    <FontAwesomeIcon
                      icon={faGreaterThan}
                      className="rotate-90"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </th>
        <th className="w-[30%]">Status</th>
        <th className="w-[10%]">Action</th>
      </tr>
    </thead>
  );
}

export default OrderTableHead;
