import { useEffect, useState } from "react";
import MainLayouts from "../../layouts/MainLayouts";
import { getOrderList } from "../../services/order.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import OrderTable from "../../components/molecules/OrderTable";
import { OrderContext } from "../../context";
import { useSelector } from "react-redux";
import OrderDetailModal from "../../components/molecules/OrderDetailModal";

function Order() {
  const [orders, setOrders] = useState([]);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);
  const contentModal = useSelector((state) => state.webContent.contentModal);
  console.log(showModal, typeModal, contentModal);
  const handleSetOrders = (newOrder) => {
    setOrders(newOrder);
  };
  const handleSetPages = (newPage) => {
    setPages(newPage);
  };
  useEffect(() => {
    getOrderList(pages, 10, "order_date", "desc")
      .then(
        (res) =>
          new Promise((resolve) =>
            setTimeout(() => resolve(setOrders(res.data)), 1000)
          )
      )
      .then(() => setIsLoading(false));
  }, []);
  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "showOrderDetail" && (
          <OrderDetailModal content={contentModal} />
        )}
        <div className="pt-4 min-w-[1000px] bg-zinc-100 ">
          <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faListAlt} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Orders</h1>
          </div>

          <div className="w-[1000px] bg-white  mb-10  shadow-gray-500  drop-shadow-md mx-auto  overflow-hidden rounded-md">
            <OrderContext.Provider value={{ handleSetOrders, handleSetPages }}>
              <OrderTable orders={orders} isLoading={isLoading} />
            </OrderContext.Provider>
          </div>
        </div>
      </MainLayouts>
    </>
  );
}

export default Order;
