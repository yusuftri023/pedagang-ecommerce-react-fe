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
import PromoCodeBar from "../../components/molecules/PromoCodeBar";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";
import CartContent from "../../components/molecules/CartContent";
import { useDiscount, useTotalBeforeDiscount } from "../../utils/discount";
import { formatRupiah } from "../../utils/utils";
import EmptyCart from "../../components/molecules/EmptyCart";
import { useGetCartQuery } from "../../store/reducers/apiSlicer";

const Cart = () => {
  const { data } = useGetCartQuery();
  const cart = data ? data.data : [];

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
        <div className="min-w-[1000px] bg-zinc-100 pt-4">
          <div className="my-10 border-y-4 border-gray-700 py-4 text-center">
            <FontAwesomeIcon icon={faCartShopping} className="size-12 " />
            <h1 className=" text-[30px] font-bold">My Cart</h1>
          </div>

          {cart?.length > 0 ? (
            <div className="mx-auto flex min-h-[400px]  w-[1000px]  max-w-[1000px]">
              <div className="my-20 flex w-full gap-4">
                <div className="max-w-[calc(70%-16px)] space-y-6">
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
                <div className=" h-[fit-content]  min-w-[30%]  bg-white px-4 py-6 shadow-gray-500 drop-shadow-md">
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
                          <p className="break-words ">
                            {formatRupiah(totalBeforeDiscount - discount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="  mt-10 w-full border-2 border-[#FFCA1D] bg-[#FFCA1D] py-2 font-[500] transition-colors  duration-300 hover:bg-[#968447]"
                        onClick={handleCheckout}
                      >
                        <FontAwesomeIcon icon={faLock} /> Checkout
                      </button>
                      <button
                        onClick={() => (window.location.href = "/")}
                        className="mt-2 w-full border-2 border-black border-opacity-50 bg-gray-100 py-2 transition-all duration-300  hover:brightness-50"
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
