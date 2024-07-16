/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getUserData } from "../store/actions/customerAction";
import { getAuth } from "../services/auth.service";
import MainLayouts from "../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { setAuth, setError } from "../store/reducers/authenticationSlicer";
import { setCartError } from "../store/reducers/cartSlicer";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../store/actions/cartAction";
import CartItem from "../components/molecules/CartItem";
import { getPromotion } from "../services/promotion.service";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promo, setPromo] = useState([]);

  const promoCodeRef = useRef();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  let totalBeforeDiscount =
    cart?.length > 0
      ? cart
          ?.filter((val) => val.stock > 0)
          ?.map((val) => {
            return val.price * val.quantity;
          })
          ?.reduce((a, b) => a + b, 0)
      : 0;

  let discount =
    promo?.length > 0
      ? (cart
          ?.filter((val) => {
            if (
              promo
                .map(({ category_name }) => category_name)
                .includes(val.category_name)
            )
              return true;
            else return false;
          })
          ?.map((val) => {
            return val.price * val.quantity;
          })
          .reduce((a, b) => a + b, 0) *
          Number(promo[0]?.discount_rate)) /
        100
      : 0;

  const handleSubmitPromoCode = async (e) => {
    e.preventDefault();

    if (promoCodeRef.current?.value?.length > 0) {
      const promoCode = await getPromotion(promoCodeRef.current.value);
      if (promoCode.success) {
        setPromo(promoCode.data);
        promoCodeRef.current.value = "";
        e.target.blur();
      } else {
        dispatch(setCartError(promoCode.message));
      }
    }
  };
  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => dispatch(getCart()))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => navigate("/"), 1000);
      });
    dispatch(getUserData());
  }, []);
  return (
    <>
      <MainLayouts>
        <div className="pt-4 min-w-[1000px] bg-zinc-100">
          <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faCartShopping} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Cart</h1>
          </div>

          {cart?.length > 0 ? (
            <div className="min-h-[400px] mx-auto flex px-10   w-[1000px]">
              <div className="w-full gap-4 flex my-20">
                <div className="space-y-6">
                  <div className="min-w-[600px] bg-white p-6  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                    {cart
                      ?.filter((val) => val.stock > 0)
                      ?.map((val, i) => (
                        <CartItem
                          key={i}
                          cartId={val.cart_id}
                          productId={val.product_id}
                          quantity={val.quantity}
                          productConfigId={val.product_config_id}
                          image={val.image}
                          price={val.price}
                          variation_value={val.variation_value}
                          variation_name={val.variation_name}
                          title={val.title}
                          stock={val.stock}
                          note={val.note}
                        />
                      ))}
                  </div>

                  {cart?.some((val) => val.stock === 0) && (
                    <div className="min-w-[600px] bg-white p-6 opacity-60  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                      <p className=" font-bold text-2xl ">
                        Currently Out of Stock
                      </p>
                      {cart
                        ?.filter((val) => val.stock === 0)
                        .map((val, i) => (
                          <CartItem
                            key={i}
                            cartId={val.cart_id}
                            productId={val.product_id}
                            quantity={val.quantity}
                            variationOptionId={val.variation_option_id}
                            image={val.image}
                            price={val.price}
                            variation_value={val.variation_value}
                            variation_name={val.variation_name}
                            title={val.title}
                            stock={val.stock}
                            note={val.note}
                          />
                        ))}
                    </div>
                  )}
                </div>
                <div className="min-w-[250px] bg-white  shadow-gray-500  drop-shadow-md  max-w-[1000px] w-[25%] px-4 py-6 h-[fit-content]">
                  <div>
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
                          onClick={() => setPromo([])}
                          className={`text-black font-extrabold absolute right-2 top-0 hover:text-gray-500 duration-150`}
                        >
                          x
                        </button>
                        <p> Active Code :</p>
                        <p>{promo[0].code} </p>
                        <p>{promo[0].description} </p>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="mt-10 divide-y-2 divide-gray-400">
                      <div className="flex justify-between">
                        <p>Discount</p>
                        <p>
                          {new Intl.NumberFormat("id", {
                            currency: "idr",
                            style: "currency",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0,
                          }).format(discount)}
                        </p>
                      </div>
                      <div className="flex justify-between break-words">
                        <p>Estimated Total</p>
                        <div>
                          <p className=" break-words">
                            {new Intl.NumberFormat("id", {
                              currency: "idr",
                              style: "currency",
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 0,
                            }).format(totalBeforeDiscount - discount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="  w-full py-2 mt-10 border-[#FFCA1D] border-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500] animate-fade-in-drop transition-colors duration-300"
                        onClick={handleCheckout}
                      >
                        <FontAwesomeIcon icon={faLock} /> Checkout
                      </button>
                      <button
                        onClick={() => navigate("/")}
                        className=" bg-gray-100 w-full py-2 mt-2 border-black border-2 border-opacity-50"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-[400px] mx-auto  px-10   w-[1000px]">
              <div className="bg-white py-20  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                <h1 className="text-center text-2xl">
                  Your cart is currently empty
                </h1>
              </div>
              <button
                onClick={() => navigate("/")}
                className="right-0 w-[fit-content]  py-3 px-8 my-4  mt-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500] animate-fade-in-drop transition-colors duration-300"
              >
                Return to Shop
              </button>
            </div>
          )}
        </div>
      </MainLayouts>
    </>
  );
};

export default Cart;
