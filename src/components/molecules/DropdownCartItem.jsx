/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

function DropdownCartItem({ image, title, product_id, quantity, price }) {
  const navigate = useNavigate();
  return (
    <li className="h-10 w-full flex justify-between px-6 items-center my-4 space-x-2">
      <img src={image} className="max-h-10 max-w-10 min-w-10" />
      <div
        onClick={() =>
          navigate(
            `/products/${encodeURIComponent(title.toLowerCase())}/${product_id}`
          )
        }
        className="text-left w-[40%] truncate hover:cursor-pointer hover:text-blue-600"
      >
        {title}
      </div>

      <div className="w-[10%]">x{quantity}</div>
      <div className="truncate w-[30%]">
        {new Intl.NumberFormat("id", {
          currency: "idr",
          style: "currency",
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        }).format(price * 10000000)}
      </div>
    </li>
  );
}

export default DropdownCartItem;
