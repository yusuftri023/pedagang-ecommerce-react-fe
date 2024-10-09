/* eslint-disable react/prop-types */
import OrderTableHead from "./OrderTableHead";
import OrderTableRow from "./OrderTableRow";
import loadingSvg from "./../../assets/loading-2.svg";
import { OrderContext } from "../../context";
import { useContext, useState } from "react";
import { usePaginatedPage } from "../../utils/pagination";
import { useLazyGetOrderQuery } from "../../store/reducers/apiSlicer";
function OrderTable({ orders, isLoading }) {
  const { sortBy, pages, handleSetOrders, handleSetPages } =
    useContext(OrderContext);
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const renderedPage = usePaginatedPage(orders.total_page, pages);
  const [trigger] = useLazyGetOrderQuery();
  const handlePage = (destinationPage) => {
    if (destinationPage < 1 || destinationPage > orders.total_page) return;
    else if (destinationPage !== "...") {
      setIsFetching(true);
      trigger({
        page: destinationPage,
        limit: 10,
        orderBy: sortBy.column,
        orderDir: sortBy.order,
      }).then((res) => {
        handleSetOrders({
          ...res.data,
        });
        setIsFetching(false);
        handleSetPages(destinationPage);
      });
    } else if (destinationPage === "...") {
      setIsSearchPage(!isSearchPage);
    }
  };

  return (
    <div>
      <table className="w-full table-auto ">
        <OrderTableHead setIsFetching={setIsFetching} />
        {!isLoading && (
          <tbody
            className={(isFetching ? "opacity-45" : "") + " pb-20 text-center "}
          >
            {orders.data?.map((order, i) => (
              <OrderTableRow key={"Order-" + i} order={order} />
            ))}
          </tbody>
        )}
      </table>
      {isLoading && (
        <div className="py-20">
          <img className="mx-auto size-[100px]" src={loadingSvg} />
        </div>
      )}
      <div className="flex h-[50px] items-center justify-center bg-gray-200">
        <div className="  flex h-fit w-fit justify-center divide-x-[2px] divide-white rounded-md border-[2px] border-white bg-zinc-50 hover:cursor-pointer ">
          <div
            className=" min-h-[30px] min-w-[30px] content-center px-1 text-center "
            onClick={() => handlePage(pages - 1)}
          >
            <span>&lt; Previous</span>
          </div>
          {renderedPage.map((val, i) => (
            <div
              key={"page-" + i}
              className={
                (pages === val ? "bg-gray-400" : "") +
                " min-h-[30px] min-w-[30px] content-center px-1 text-center  "
              }
              onClick={() => handlePage(val)}
            >
              <span>{val}</span>
            </div>
          ))}
          <div
            className=" min-h-[30px] min-w-[30px] content-center px-1 text-center "
            onClick={() => handlePage(pages + 1)}
          >
            <span>Next &gt;</span>
          </div>
        </div>
        {isSearchPage && (
          <div className="ml-2 h-fit animate-fade-in-drop rounded-md bg-white p-2">
            <input
              value={searchPage}
              onChange={(e) => setSearchPage(e.target.value)}
              className="w-10 rounded-md bg-zinc-100 pl-1"
            />
            <button
              onClick={() => {
                handlePage(searchPage);
                setIsSearchPage(false);
              }}
            >
              Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTable;
