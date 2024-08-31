/* eslint-disable react/prop-types */
import OrderTableHead from "./OrderTableHead";
import OrderTableRow from "./OrderTableRow";
import loadingSvg from "./../../assets/loading-2.svg";
function OrderTable({ orders, isLoading }) {
  return (
    <div>
      <table className="w-full table-auto ">
        <OrderTableHead />
        {!isLoading && (
          <tbody className=" text-center pb-20">
            {orders?.map((order, i) => (
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
      <div className="h-[50px] bg-gray-200"></div>
    </div>
  );
}

export default OrderTable;
