/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getUserData } from "../store/actions/customerAction";
import { getAuth } from "../services/auth.service";
import MainLayouts from "../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { setAuth } from "../store/reducers/authenticationSlicer";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../store/actions/cartAction";
import CartItem from "../components/molecules/CartItem";
import PromoCodeBar from "../components/molecules/PromoCodeBar";
import { popUpChange, popUpToggle } from "../store/reducers/webContentSlicer";
import BriefPopUp from "../components/atoms/BriefPopUp";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promo, setPromo] = useState([]);
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);

  const closePopUpHandler = () => {
    dispatch(popUpToggle(false));
    dispatch(popUpChange({ type: null }));
  };
  const handleCheckout = () => {
    const delay = setTimeout(() => {
      window.location.href = "/checkout";
    }, 1000);
  };
  const totalBeforeDiscount = useMemo(() =>
    cart?.length > 0
      ? cart
          ?.filter((val) => val.stock > 0)

          ?.map((val) => {
            return val.price * val.quantity;
          })
          ?.reduce((a, b) => a + b, 0)
      : 0
  );

  const discount = useMemo(() =>
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
          ?.filter((val) => val.stock > 0)
          ?.map((val) => {
            return val.price * val.quantity;
          })
          .reduce((a, b) => a + b, 0) *
          Number(promo[0]?.discount_rate)) /
        100
      : 0
  );

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
  useEffect(() => {
    let popUpTimer = setTimeout(() => {
      dispatch(popUpToggle(false));
      dispatch(popUpChange({ type: null }));
    }, 2000);
    return () => {
      clearTimeout(popUpTimer);
    };
  }, [showPopUp]);

  return (
    <>
      {showPopUp && typePopUp === "deletedFromCart" ? (
        <BriefPopUp>
          <span>Product deleted from cart</span>
          <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
            Ok
          </span>
        </BriefPopUp>
      ) : typePopUp === "addedToWishlist" ? (
        <BriefPopUp>
          <span>Product added to wishlist</span>
          <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
            Ok
          </span>
        </BriefPopUp>
      ) : (
        <></>
      )}
      <MainLayouts>
        <div className="pt-4 min-w-[1000px] bg-zinc-100">
          <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faCartShopping} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Cart</h1>
          </div>

          {cart?.length > 0 ? (
            <div className="min-h-[400px] mx-auto flex  w-[1000px]  max-w-[1000px]">
              <div className="w-full gap-4 flex my-20">
                <div className="space-y-6 max-w-[calc(70%-16px)]">
                  <div className=" bg-white p-6  shadow-gray-500   drop-shadow-md  h-[fit-content]">
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
                    <div className=" bg-white p-6 opacity-60  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
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
                <div className=" bg-white  shadow-gray-500  drop-shadow-md min-w-[30%] px-4 py-6 h-[fit-content]">
                  <div>
                    <p>Enter Promo Code</p>
                    <PromoCodeBar setPromo={setPromo} promo={promo} />
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
                        className="  w-full py-2 mt-10 border-[#FFCA1D] border-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500]  transition-colors duration-300"
                        onClick={handleCheckout}
                      >
                        <FontAwesomeIcon icon={faLock} /> Checkout
                      </button>
                      <button
                        onClick={() => navigate("/")}
                        className=" bg-gray-100 w-full py-2 mt-2 border-black hover:brightness-50 transition-all duration-300 border-2 border-opacity-50"
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
