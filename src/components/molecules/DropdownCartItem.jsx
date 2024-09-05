/* eslint-disable react/prop-types */

import { formatRupiah } from "../../utils/utils";

function DropdownCartItem({ id, image, title, product_id, quantity, price }) {
  return (
    <li className="my-4 flex h-10 w-full items-center justify-between space-x-2 px-6">
      <img src={image} className="max-h-10 min-w-10 max-w-10" />
      <a
        className="w-[40%] text-left  hover:cursor-pointer hover:text-blue-600"
        href={`/products/${encodeURIComponent(title.toLowerCase())}-${product_id}+${id}`}
      >
        <div className="truncate">{title}</div>
      </a>

      <div className="w-[10%]">x{quantity}</div>
      <div className="w-[30%] truncate">{formatRupiah(price)}</div>
    </li>
  );
}

export default DropdownCartItem;
