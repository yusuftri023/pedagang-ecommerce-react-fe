/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserData } from "../../store/actions/customerAction";
import { getAuth } from "../../services/auth.service";
import MainLayouts from "../../layouts/MainLayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { setAuth } from "../../store/reducers/authenticationSlicer";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../../store/actions/cartAction";
import PromoCodeBar from "../../components/molecules/PromoCodeBar";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";
import CartContent from "../../components/molecules/CartContent";
import { useDiscount, useTotalBeforeDiscount } from "../../utils/discount";
import { formatRupiah } from "../../utils/utils";
import EmptyCart from "../../components/molecules/EmptyCart";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const outOfStockCart = cart?.filter((val) => val.stock === 0);
  const dispatch = useDispatch();

  const [promo, setPromo] = useState([]);
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };
  const totalBeforeDiscount = useTotalBeforeDiscount(cart);
  const discount = useDiscount(cart, promo);

  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => dispatch(getCart()))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => (window.location.href = "/"), 1000);
      });
    dispatch(getUserData());
  }, []);

  return (
    <>
      <MainLayouts>
        {showPopUp && typePopUp === "deletedFromCart" ? (
          <BriefPopUp>
            <BriefPopUpContent text={"Product deleted from cart"} />
          </BriefPopUp>
        ) : (
          typePopUp === "addedToWishlist" && (
            <BriefPopUp>
              <BriefPopUpContent text={"Product added to wishlist"} />
            </BriefPopUp>
          )
        )}
        <div className="pt-4 min-w-[1000px] bg-zinc-100">
          <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
            <FontAwesomeIcon icon={faCartShopping} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Cart</h1>
          </div>

          {cart?.length > 0 ? (
            <div className="min-h-[400px] mx-auto flex  w-[1000px]  max-w-[1000px]">
              <div className="w-full gap-4 flex my-20">
                <div className="space-y-6 max-w-[calc(70%-16px)]">
                  {cart?.some((val) => val.stock > 0) && (
                    <CartContent cart={cart} />
                  )}
                  {cart?.some((val) => val.stock === 0) && (
                    <CartContent
                      cart={outOfStockCart}
                      cartType={"outOfStock"}
                    />
                  )}
                </div>
                <div className=" bg-white  shadow-gray-500  drop-shadow-md min-w-[30%] px-4 py-6 h-[fit-content]">
                  <div>
                    <PromoCodeBar setPromo={setPromo} promo={promo} />
                    <div className="mt-10 divide-y-2 divide-gray-400">
                      <div className="flex justify-between">
                        <p>Discount</p>
                        <p>{formatRupiah(discount)}</p>
                      </div>
                      <div className="flex justify-between break-words">
                        <p>Estimated Total</p>
                        <div>
                          <p className=" break-words">
                            {formatRupiah(totalBeforeDiscount - discount)}
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
                        onClick={() => (window.location.href = "/")}
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
            <EmptyCart text={"Your cart is empty"} />
          )}
        </div>
      </MainLayouts>
    </>
  );
};

export default Cart;
