/* eslint-disable react-hooks/exhaustive-deps */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../store/actions/customerAction";
import { getAuth } from "../../services/auth.service";
import { setAuth } from "../../store/reducers/authenticationSlicer";
import MinimumLayouts from "../../layouts/MinimumLayouts";
import { useSelector } from "react-redux";
import { useState } from "react";

import { faLock } from "@fortawesome/free-solid-svg-icons";
import { getCart } from "../../store/actions/cartAction";
import PromoCodeBar from "../../components/molecules/PromoCodeBar";
import {
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import CheckoutItem from "../../components/molecules/CheckoutItem";
import { getCustomerAddress } from "../../services/address.service";
import AddressModal from "../../components/molecules/AddressModal";
import SnapPaymentModal from "../../components/molecules/SnapPaymentModal";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";
import { getCustomerCart } from "../../services/cart.service";
import { useDiscount, useTotalBeforeDiscount } from "../../utils/discount";
import { formatRupiah } from "../../utils/utils";
import AddressCard from "../../components/molecules/AddressCard";
import { postRajaOngkirCost } from "../../services/shipment.service";
import CheckoutButton from "../../components/molecules/CheckoutButton";

const Checkout = () => {
  const [cart, setCart] = useState([]);

  const dispatch = useDispatch();

  const [promo, setPromo] = useState([]);
  const [address, setAddress] = useState(null);
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);
  const cartWithStock = cart?.filter((val) => val.stock > 0);
  const totalBeforeDiscount = useTotalBeforeDiscount(cart);
  const discount = useDiscount(cart, promo);
  const [shippingCost, setShippingCost] = useState(0);
  const selectedAddress = address?.filter((val) => val.selected === 1)[0];
  const handleSetAddress = (address) => {
    setAddress(address);
    dispatch(popUpToggle(true));
    dispatch(popUpChange({ type: "addressChanged", content: null }));
  };

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

  useEffect(() => {
    getCustomerAddress().then((res) => setAddress(res.data));
  }, []);

  useEffect(() => {
    getCustomerCart().then((res) => {
      const noProductWithStock = res.data.some((val) => val.stock > 0);
      if (!noProductWithStock) {
        dispatch(popUpToggle(true));
        dispatch(popUpChange({ type: "cartEmpty" }));
        setTimeout(() => {
          window.location.href = "/cart";
        }, 2000);
      }
      setCart(res.data);
    });
  }, []);
  useEffect(() => {
    if (selectedAddress) {
      const shippingData = {
        destination_id: String(selectedAddress.destination_id),
        weight: 2000,
        courier: "jne",
      };
      postRajaOngkirCost(shippingData).then((res) => {
        const cost = res.data[0].costs.find((val) => val.service === "REG")
          .cost[0].value;
        setShippingCost(cost);
      });
    }
  }, [selectedAddress]);
  return (
    <>
      <MinimumLayouts>
        {showModal && typeModal === "changeAddress" && (
          <AddressModal address={address} setAddress={handleSetAddress} />
        )}
        {showModal && typeModal === "snapPayment" && <SnapPaymentModal />}
        {showPopUp && typePopUp === "addressChanged" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Address successfully changed"} />
          </BriefPopUp>
        )}
        {showPopUp && typePopUp === "cartEmpty" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Your cart is empty"} />
          </BriefPopUp>
        )}
        <div className=" min-w-[1000px] bg-zinc-100">
          <h1 className="w-[1000px] mx-auto text-3xl py-6 font-bold">
            Checkout
          </h1>
          <div className="min-h-[400px] mx-auto flex  w-[1000px]">
            <div className="w-full gap-4 flex  mb-20">
              <div className="space-y-6">
                {address !== null ? (
                  <div className="mx-auto ">
                    <AddressCard selectedAddress={selectedAddress} />
                  </div>
                ) : (
                  <AddressCard />
                )}
                <div className="min-w-[600px] bg-white p-6  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
                  {cart
                    ?.filter((val) => val.stock > 0)
                    ?.map((val, i) => (
                      <CheckoutItem
                        key={i}
                        cartId={val.cart_id}
                        quantity={val.quantity}
                        image={val.image[0]}
                        price={val.price}
                        variation_value={val.variation_value}
                        variation_name={val.variation_name}
                        title={val.title}
                        note={val.note}
                        discount={val.discount}
                      />
                    ))}
                </div>
              </div>
              <div className="min-w-[250px] bg-white  shadow-gray-500  drop-shadow-md  max-w-[1000px] w-[25%] px-4 py-6 h-[fit-content]">
                <div>
                  <PromoCodeBar setPromo={setPromo} promo={promo} />
                  <div className="mt-10">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>{formatRupiah(totalBeforeDiscount)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping Cost</p>
                      <p>{formatRupiah(shippingCost)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Discount</p>
                      <p>{formatRupiah(discount)}</p>
                    </div>
                    <div className="flex justify-between py-2 border-y-2 mt-2">
                      <p>Estimated Total</p>
                      <div>
                        <p className=" break-words">
                          {formatRupiah(
                            totalBeforeDiscount - discount + shippingCost
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <CheckoutButton
                      cartWithStock={cartWithStock}
                      totalBeforeDiscount={totalBeforeDiscount}
                      discount={discount}
                      shippingCost={shippingCost}
                      selectedAddress={selectedAddress}
                    >
                      <FontAwesomeIcon icon={faLock} /> Proceed To Payment
                    </CheckoutButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MinimumLayouts>
    </>
  );
};

export default Checkout;
