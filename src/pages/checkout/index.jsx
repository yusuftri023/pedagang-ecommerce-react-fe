/* eslint-disable react-hooks/exhaustive-deps */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../store/actions/customerAction";
import { getAuth } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../store/reducers/authenticationSlicer";
import MinimumLayouts from "../../layouts/MinimumLayouts";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../../store/actions/cartAction";
import CartItem from "../../components/molecules/CartItem";
import PromoCodeBar from "../../components/molecules/PromoCodeBar";
import {
  modalChange,
  modalToggle,
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import CheckoutItem from "../../components/molecules/CheckoutItem";
import { getCustomerAddress } from "../../services/address.service";
import AddToCartModal from "../../components/molecules/AddToCartModal";
import ModalWindow from "../../components/atoms/ModalWindow";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [promo, setPromo] = useState([]);
  const [address, setAddress] = useState([]);
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);

  const closePopUpHandler = () => {
    dispatch(popUpToggle(false));
    dispatch(popUpChange({ type: null }));
  };
  const handleCheckout = () => {};
  const handleChangeAddress = () => {
    dispatch(modalToggle(true));
    dispatch(modalChange({ type: "changeAddress" }));
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
  const shippingCost = 50000;
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
  const selectedAddress = address.filter((val) => val.selected === 1)[0];
  console.log(selectedAddress);
  useEffect(() => {
    console.log(address);
    getCustomerAddress().then((res) => setAddress(res.data));
  }, []);
  return (
    <>
      {showModal && typeModal === "changeAddress" ? (
        <ModalWindow>tes</ModalWindow>
      ) : (
        <></>
      )}
      {showPopUp && typePopUp === "addedToWishlist" ? (
        <BriefPopUp>
          <span>Product added to your wishlist</span>
          <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
            Ok
          </span>
        </BriefPopUp>
      ) : (
        <></>
      )}
      <MinimumLayouts>
        <div className=" min-w-[1000px] bg-zinc-100">
          <h1 className="w-[1000px] mx-auto text-3xl py-6 font-bold">
            Checkout
          </h1>

          {cart?.length > 0 ? (
            <div className="min-h-[400px] mx-auto flex  w-[1000px]">
              <div className="w-full gap-4 flex  mb-20">
                <div className="space-y-6">
                  <div className="mx-auto ">
                    <div className="bg-white  shadow-gray-500  drop-shadow-md  w-full ">
                      <div className="p-6">
                        <h2 className="text-xl font-medium text-gray-600">
                          Shipping Address
                        </h2>
                        <h3 className="my-2">
                          {selectedAddress?.recipient}&apos;s Address
                        </h3>
                        <p>
                          {selectedAddress?.address_line} ,{" "}
                          {selectedAddress?.city}, {selectedAddress?.region}.
                          Postal Code: {selectedAddress?.postal_code}
                        </p>
                        <button
                          onClick={handleChangeAddress}
                          className="mt-4 py-2 px-4 text-md border-2 rounded-lg"
                        >
                          Change Address
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-[600px] bg-white p-6  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                    {cart
                      ?.filter((val) => val.stock > 0)
                      ?.map((val, i) => (
                        <CheckoutItem
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
                </div>
                <div className="min-w-[250px] bg-white  shadow-gray-500  drop-shadow-md  max-w-[1000px] w-[25%] px-4 py-6 h-[fit-content]">
                  <div>
                    <p>Enter Promo Code</p>
                    <PromoCodeBar setPromo={setPromo} promo={promo} />
                    <div className="mt-10">
                      <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>
                          {new Intl.NumberFormat("id", {
                            currency: "idr",
                            style: "currency",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0,
                          }).format(totalBeforeDiscount)}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Shipping Cost</p>
                        <p>
                          {new Intl.NumberFormat("id", {
                            currency: "idr",
                            style: "currency",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0,
                          }).format(shippingCost)}
                        </p>
                      </div>
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
                      <div className="flex justify-between py-2 border-y-2 mt-2">
                        <p>Estimated Total</p>
                        <div>
                          <p className=" break-words">
                            {new Intl.NumberFormat("id", {
                              currency: "idr",
                              style: "currency",
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 0,
                            }).format(
                              totalBeforeDiscount - discount + shippingCost
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        className="  w-full py-2 mt-10 border-[#FFCA1D] border-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500]  transition-colors duration-300"
                        onClick={handleCheckout}
                      >
                        <FontAwesomeIcon icon={faLock} /> Proceed To Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </MinimumLayouts>
    </>
  );
};

export default Checkout;
