/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { getPromotion } from "../../services/promotion.service";

function PromoCodeBar({ setPromo, promo }) {
  const promoCodeRef = useRef();

  const [promoError, setPromoError] = useState(null);
  const handleSubmitPromoCode = async (e) => {
    e.preventDefault();
    setPromo(() => []);
    if (promoCodeRef.current?.value?.length > 0) {
      const promoCode = await getPromotion(promoCodeRef.current.value);
      if (promoCode.success) {
        setPromo(() => promoCode.data);
        promoCodeRef.current.value = "";
        setPromoError(null);
        e.target.blur();
      } else {
        setPromoError(promoCode.message);
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
          className=" w-[60%] border-2 p-2 outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitPromoCode(e);
            }
          }}
        />
        <button
          className=" w-[40%] border-2 border-black bg-black p-2 text-white"
          type="submit"
          onClick={handleSubmitPromoCode}
        >
          Submit
        </button>
      </div>
      {promo?.length > 0 ? (
        <div className="relative mt-2 rounded-md border-2 bg-zinc-100 p-2 text-green-500">
          <button
            onClick={() => {
              setPromo([]);
              setPromoError(null);
            }}
            className={`absolute right-2 top-0 font-extrabold text-black duration-150 hover:text-gray-500`}
          >
            x
          </button>
          <p> Active Code :</p>
          <p>{promo[0].code} </p>
          <p>{promo[0].description} </p>
        </div>
      ) : promoError === null ? (
        <></>
      ) : (
        <div className="relative mt-2 rounded-md border-2 bg-zinc-100 p-2 text-red-500">
          <button
            onClick={() => {
              setPromo([]);
              setPromoError(null);
            }}
            className={`absolute right-2 top-0 font-extrabold text-black duration-150 hover:text-gray-500`}
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
