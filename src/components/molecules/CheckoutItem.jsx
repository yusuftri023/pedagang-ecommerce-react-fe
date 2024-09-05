/* eslint-disable react-hooks/exhaustive-deps */

import { formatRupiah } from "../../utils/utils";

/* eslint-disable react/prop-types */
function CheckoutItem({
  cartId,
  quantity,
  image,
  price,
  variation_name,
  variation_value,
  title,
  note,
  discount = 0.1,
}) {
  return (
    <div>
      <div className="p-2">
        <div className="flex gap-x-2 py-2" id={`cart-item-${cartId}`}>
          <div className="size-[fit-content] bg-gray-400 ">
            <img
              src={image}
              className=" mx-auto aspect-square size-[60px] min-w-[60px] object-cover"
            ></img>
          </div>
          <div className="flex w-full justify-between">
            <div className=" max-w-[70%]">
              <p className=" line-clamp-2">{title}</p>
              {variation_name === "-" ? (
                <></>
              ) : (
                <p className="line-clamp-1">
                  {variation_name}: {variation_value}
                </p>
              )}
            </div>
            <div className="space-x-2 font-semibold ">
              <span>
                {quantity} pc{quantity > 1 ? "s" : ""}
              </span>
              <span>x</span>
              <span className="">{formatRupiah(price * (1 - discount))}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 ">
            {note && (
              <p className="max-w-full rounded-md border-2 border-gray-200 bg-zinc-100 px-2">
                note: {note}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
