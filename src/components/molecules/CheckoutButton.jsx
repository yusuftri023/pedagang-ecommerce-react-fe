import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import { checkoutOrder } from "../../services/order.service";
import { useState } from "react";

/* eslint-disable react/prop-types */
function CheckoutButton({
  children,
  cartWithStock,
  totalBeforeDiscount,
  discount,
  shippingCost,
  selectedAddress,
}) {
  const dispatch = useDispatch();

  const [payment, setPayment] = useState(null);
  const handleCheckout = () => {
    const items = cartWithStock.map(
      ({
        product_id,
        product_config_id,
        quantity,
        title,
        price,
        discount,
        category_name,
      }) => {
        return {
          product_config_id,
          name: title.slice(0, 50),
          quantity,
          price: price * (1 - discount),
          category: category_name,
          url: `https://${window.location.hostname}/products/${encodeURIComponent(title.toLowerCase())}-${product_id}+${product_config_id}`,
        };
      },
    );
    const total_price = totalBeforeDiscount - discount + shippingCost;
    const data = {
      order_list: {
        items,
        total_price,
      },
      discount: discount,
      shipping_cost: shippingCost,
      address_id: Number(selectedAddress.address_id),
      payment_method_id: 1,
    };
    const showSnapPayment = (token) => {
      window.snap.pay(token, {
        onSuccess: function () {
          dispatch(modalToggle(false));
          dispatch(modalChange({ type: null, content: null }));
          window.location.href = "/user/orders";
        },
        onPending: function () {
          dispatch(modalToggle(false));
          dispatch(modalChange({ type: null, content: null }));
          window.location.href = "/user/orders";
        },
        onClose: function () {
          alert(
            "Closing the popup without finishing the payment will refresh this page",
          );
          dispatch(modalToggle(false));
          dispatch(modalChange({ type: null, content: null }));
          window.location.reload();
        },
      });
    };
    if (!payment) {
      checkoutOrder(data)
        .then(({ data }) => {
          dispatch(modalToggle(true));
          dispatch(modalChange({ type: "snapPayment" }));
          return data;
        })
        .then((data) => {
          setPayment(data);
          showSnapPayment(data.token);
        });
    } else {
      showSnapPayment(payment.token);
    }

    dispatch(modalToggle(true));
    dispatch(modalChange({ type: "snapPayment" }));
  };
  return (
    <button
      className="  mt-10 w-full border-2 border-[#FFCA1D] bg-[#FFCA1D] py-2 font-[500] transition-colors  duration-300 hover:bg-[#968447]"
      onClick={handleCheckout}
    >
      {children}
    </button>
  );
}

export default CheckoutButton;
