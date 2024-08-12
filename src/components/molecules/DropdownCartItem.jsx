/* eslint-disable react/prop-types */

function DropdownCartItem({ id, image, title, product_id, quantity, price }) {
  return (
    <li className="h-10 w-full flex justify-between px-6 items-center my-4 space-x-2">
      <img src={image} className="max-h-10 max-w-10 min-w-10" />
      <a
        className="text-left w-[40%]  hover:cursor-pointer hover:text-blue-600"
        href={`/products/${encodeURIComponent(title.toLowerCase())}-${product_id}+${id}`}
      >
        <div className="truncate">{title}</div>
      </a>

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
