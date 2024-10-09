import { useEffect, useState } from "react";
import MainLayouts from "../../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import OrderTable from "../../components/molecules/OrderTable";
import { OrderContext } from "../../context";
import { useSelector } from "react-redux";
import OrderDetailModal from "../../components/molecules/OrderDetailModal";
import { useGetOrderQuery } from "../../store/reducers/apiSlicer";

function Order() {
  const { data, isLoading, isUninitialized } = useGetOrderQuery({
    page: 1,
    limit: 10,
    orderBy: "order_date",
    orderDir: "desc",
  });
  const [orders, setOrders] = useState({ ...data });

  const [pages, setPages] = useState(1);
  const [sortBy, setSortBy] = useState({ column: "order_date", order: "desc" });

  const [activeSort, setActiveSort] = useState("Date");
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);
  const contentModal = useSelector((state) => state.webContent.contentModal);

  const handleSetOrders = (newOrder) => {
    setOrders(newOrder);
  };
  const handleSetPages = (newPage) => {
    setPages(newPage);
  };
  useEffect(() => {
    if (isLoading === false && isUninitialized === false) {
      setOrders({ ...data });
    }
  }, [isLoading]);
  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "showOrderDetail" && (
          <OrderDetailModal content={contentModal} />
        )}
        <div className="min-w-[1000px] bg-zinc-100 pt-4 ">
          <div className="my-10 border-y-4   border-gray-700 py-4 text-center">
            <FontAwesomeIcon icon={faListAlt} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Orders</h1>
          </div>

          <div className="mx-auto mb-10  w-[1000px]  overflow-hidden  rounded-md bg-white  shadow-gray-500 drop-shadow-md">
            <OrderContext.Provider
              value={{
                handleSetOrders,
                handleSetPages,
                activeSort,
                setActiveSort,
                sortBy,
                setSortBy,
                pages,
              }}
            >
              <OrderTable orders={orders} isLoading={isLoading} />
            </OrderContext.Provider>
          </div>
        </div>
      </MainLayouts>
    </>
  );
}

export default Order;
