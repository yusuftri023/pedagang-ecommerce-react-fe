import { useDispatch } from "react-redux";
import { formatRupiah } from "../../utils/utils";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import { memo } from "react";

/* eslint-disable react/prop-types */
const OrderTableRow = memo(function OrderTableRow({ order }) {
  const dispatch = useDispatch();
  const handleDetail = () => {
    dispatch(modalChange({ type: "showOrderDetail", content: order }));
    dispatch(modalToggle(true));
  };
  let bgColor;
  if (order.status === "Pesanan Dibatalkan") {
    bgColor = "bg-zinc-100 text-red-400 border-red-400 border-[1px]";
  } else if (order.status === "Pesanan Selesai") {
    bgColor = "bg-zinc-100 text-green-400 border-green-400 border-[1px]";
  } else {
    bgColor = "bg-zinc-100 text-yellow-400 border-yellow-400 border-[1px]";
  }
  return (
    <tr className="border-b-2 border-gray-200 ">
      <td>{order.id}</td>
      <td>
        <span>
          {Intl.DateTimeFormat("id", {
            dateStyle: "full",
            timeStyle: "medium",
          }).format(new Date(order.order_date))}
        </span>
      </td>
      <td>
        <span>{formatRupiah(order.total_price)}</span>
      </td>
      <td>
        <span className={bgColor + " rounded-md px-2 py-1 font-medium"}>
          {order.status}
        </span>
      </td>
      <td>
        <button
          onClick={handleDetail}
          className="my-2 rounded-md bg-green-400 px-4 py-1 text-white"
        >
          Detail
        </button>
      </td>
    </tr>
  );
});

export default OrderTableRow;
