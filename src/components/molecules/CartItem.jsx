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

function CartItem({
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
  const handleQuantityCounter = (input) => {
    if (input === "+" && counter < stock) {
      setCounter((state) => state + 1);
    } else if (input === "-") {
      if (counter > 1) {
        setCounter((state) => state - 1);
      }
    }
  };

  const handleQuantityInput = (e) => {
    if (Number(e.target.value) > 0) {
      setCounter(
        Number(e.target.value) > stock ? stock : Number(e.target.value)
      );
    } else {
      setCounter(1);
    }
  };

  const handleActiveNote = () => {
    if (noteValueRef.current?.value) {
      postAddNote({ cart_id: cartId, note: noteValueRef.current.value }).then(
        () => {
          dispatch(getCart());
        }
      );
    } else if (noteValueRef.current?.value?.length === 0) {
      postAddNote({ cart_id: cartId, note: null }).then(() => {
        dispatch(getCart());
      });
    }

    setActiveNote((state) => !state);
  };
  const handleOutsideClick = (e) => {
    if (noteRef.current ? !noteRef.current.contains(e.target) : false) {
      if (noteValueRef.current?.value) {
        postAddNote({ cart_id: cartId, note: noteValueRef.current.value }).then(
          () => {
            dispatch(getCart());
          }
        );
      } else if (noteValueRef.current?.value?.length === 0) {
        postAddNote({ cart_id: cartId, note: null }).then(() => {
          dispatch(getCart());
        });
      }
      setActiveNote(false);
    }
  };
  const handleEnterOnNote = (e) => {
    if (e.key === "Enter") {
      if (noteValueRef.current?.value) {
        postAddNote({
          cart_id: cartId,
          note: noteValueRef.current.value,
        }).then(() => {
          dispatch(getCart());
        });
      }
      setActiveNote(false);
    }
  };
  const handleRemoveFromCart = () => {
    deleteCustomerCartItem(cartId).then(() => {
      dispatch(popUpToggle(true));
      dispatch(popUpChange({ type: "deletedFromCart" }));
      dispatch(getCart());
    });
  };

  const handleAddToWishlist = () => {
    const data = {
      product_id: productId,
      product_config_id: productConfigId,
    };
    postNewWishlist(data).then(() => {
      dispatch(popUpToggle(true));
      dispatch(popUpChange({ type: "addedToWishlist" }));
    });
  };

  useEffect(() => {
    document
      .getElementById(`cart-item-${cartId}`)
      .addEventListener("click", handleOutsideClick);
    return () => {
      if (document.getElementById(`cart-item-${cartId}`))
        document
          .getElementById(`cart-item-${cartId}`)
          .removeEventListener("click", handleOutsideClick);
    };
  }, [setActiveNote]);

  useEffect(() => {
    patchChangeCartQuantity({ cartId, quantity: counter })
      .then(() => {
        dispatch(getCart());
      })
      .catch((err) => console.log(err));
  }, [counter]);
  return (
    <div>
      <div className="p-2">
        <div className="flex gap-x-2 py-2" id={`cart-item-${cartId}`}>
          <div className="size-[fit-content] bg-gray-400 ">
            <img
              src={image}
              className=" mx-auto size-[60px] object-cover"
            ></img>
          </div>
          <div className="w-[40%]">
            <a
              href={`/products/${encodeURIComponent(title.toLowerCase())}-${productId}+${productConfigId}`}
              className=" line-clamp-2"
            >
              {title}
            </a>
            {variation_name === "-" ? (
              <></>
            ) : (
              <p className="line-clamp-1">
                {variation_name}: {variation_value}
              </p>
            )}
            <p className="line-clamp-1 text-red-600">Stock: {stock}</p>
          </div>
          <div className="w-[15%]">
            <p>Price</p>
            <p className=" break-words">
              {new Intl.NumberFormat("id", {
                currency: "idr",
                style: "currency",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              }).format(price)}
            </p>
          </div>
          <div className="w-[15%]">
            <p>Qty</p>
            <div className="flex  rounded-md  bg-slate-50 border-[2px] border-black">
              <button
                onClick={() => handleQuantityCounter("-")}
                className="px-1"
              >
                -
              </button>
              <input
                type="number"
                className="min-w-6 no-underline outline-none text-center"
                value={counter}
                onChange={handleQuantityInput}
              />
              <button
                onClick={() => handleQuantityCounter("+")}
                className="px-1"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-[15%]">
            <p>Total</p>
            <p className="line-clamp-3 break-words">
              {new Intl.NumberFormat("id", {
                currency: "idr",
                style: "currency",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              }).format(price * counter)}
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-row-reverse gap-2 items-center ">
            <FontAwesomeIcon
              icon={faTrash}
              className="px-1 hover:cursor-pointer"
              onClick={handleRemoveFromCart}
            />

            <FontAwesomeIcon
              icon={faHeart}
              className="px-1 hover:cursor-pointer"
              onClick={handleAddToWishlist}
            />
            <div
              className="w-1/2 flex flex-row-reverse items-center"
              ref={noteRef}
            >
              <FontAwesomeIcon
                icon={faPen}
                onClick={handleActiveNote}
                className="px-1 hover:cursor-pointer"
              />
              {activeNote ? (
                <textarea
                  ref={noteValueRef}
                  defaultValue={note}
                  rows={2}
                  maxLength={100}
                  className={`w-[${noteRef?.current?.offsetWidth}px] mr-[${noteRef?.current?.children[0].clientWidth}px] px-2 absolute`}
                  placeholder="Your note"
                  onKeyDown={handleEnterOnNote}
                />
              ) : (
                <></>
              )}
              {note && !activeNote ? (
                <p className=" bg-zinc-100 px-2 rounded-md border-2 border-gray-200 truncate max-w-full">
                  note: {note}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
