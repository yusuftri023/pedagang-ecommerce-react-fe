/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromotion } from "../../services/promotion.service";
import { setCartError } from "../../store/reducers/cartSlicer";

function PromoCodeBar({ setPromo, promo }) {
  const promoCodeRef = useRef();
  const dispatch = useDispatch();
  const cartError = useSelector((state) => state.cart.error);
  const handleSubmitPromoCode = async (e) => {
    e.preventDefault();
    setPromo(() => []);
    if (promoCodeRef.current?.value?.length > 0) {
      const promoCode = await getPromotion(promoCodeRef.current.value);
      if (promoCode.success) {
        setPromo(() => promoCode.data);
        promoCodeRef.current.value = "";
        dispatch(setCartError(null));
        e.target.blur();
      } else {
        dispatch(setCartError(promoCode.message));
      }
    }
  };
  return (
    <>
      <p>Enter Promo Code</p>
      <div className="flex items-center">
        <input
          ref={promoCodeRef}
          type="text"
          placeholder="Promo Code"
          className=" outline-none p-2 w-[60%] border-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitPromoCode(e);
            }
          }}
        />
        <button
          className=" bg-black text-white p-2 w-[40%] border-2 border-black"
          type="submit"
          onClick={handleSubmitPromoCode}
        >
          Submit
        </button>
      </div>
      {promo?.length > 0 ? (
        <div className="text-green-500 p-2 border-2 mt-2 bg-zinc-100 rounded-md relative">
          <button
            onClick={() => {
              setPromo([]);
              dispatch(setCartError(null));
            }}
            className={`text-black font-extrabold absolute right-2 top-0 hover:text-gray-500 duration-150`}
          >
            x
          </button>
          <p> Active Code :</p>
          <p>{promo[0].code} </p>
          <p>{promo[0].description} </p>
        </div>
      ) : cartError === null ? (
        <></>
      ) : (
        <div className="text-red-500 p-2 border-2 mt-2 bg-zinc-100 rounded-md relative">
          <button
            onClick={() => {
              setPromo([]);
              dispatch(setCartError(null));
            }}
            className={`text-black font-extrabold absolute right-2 top-0 hover:text-gray-500 duration-150`}
          >
            x
          </button>
          <p>Your promo code is invalid</p>
        </div>
      )}
    </>
  );
}

export default PromoCodeBar;
