/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { faHeart, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import {
  deleteCustomerCartItem,
  patchChangeCartQuantity,
  postAddNote,
} from "../../services/cart.service";
import { useDispatch } from "react-redux";
import { getCart } from "../../store/actions/cartAction";
import { postNewWishlist } from "../../services/wishlist.service";
import {
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";

function CheckoutItem({
  cartId,
  productId,
  quantity,
  productConfigId,
  image,
  price,
  variation_name,
  variation_value,
  title,
  stock,
  note,
}) {
  const [counter, setCounter] = useState(quantity);

  const [activeNote, setActiveNote] = useState(false);
  const noteRef = useRef();
  const noteValueRef = useRef();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="p-2">
        <div className="flex gap-x-2 py-2" id={`cart-item-${cartId}`}>
          <div className="size-[fit-content] bg-gray-400 ">
            <img
              src={image}
              className=" mx-auto min-w-[60px] size-[60px] aspect-square object-cover"
            ></img>
          </div>
          <div className="w-full flex justify-between">
            <div className=" max-w-[70%]">
              <p className=" line-clamp-2 ">{title}</p>
              {variation_name === "-" ? (
                <></>
              ) : (
                <p className="line-clamp-1">
                  {variation_name}: {variation_value}
                </p>
              )}
            </div>
            <div className=" space-x-2 font-semibold">
              <span>
                {counter} pc{counter > 1 ? "s" : ""}
              </span>
              <span>x</span>
              <span className=" ">
                {new Intl.NumberFormat("id", {
                  currency: "idr",
                  style: "currency",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                }).format(price)}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex  gap-2 items-center ">
            {note && !activeNote ? (
              <p className=" bg-zinc-100 px-2 rounded-md border-2 border-gray-200  max-w-full">
                note: {note}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
