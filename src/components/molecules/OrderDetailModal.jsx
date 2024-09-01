/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ModalWindow from "../atoms/ModalWindow";
import { orderDetails } from "../../services/order.service";
import { formatRupiah } from "../../utils/utils";
import { getShipmentAddress } from "../../services/shipment.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";

function OrderDetailModal({ content }) {
  const [orderItem, setOrderItem] = useState(null);
  const [address, setAddress] = useState(null);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(modalToggle());
    dispatch(modalChange({ type: null, content: null }));
  };
  useEffect(() => {
    orderDetails(content.id).then((res) => setOrderItem(res.data));
    getShipmentAddress(content.shipment_id).then((res) => setAddress(res.data));
  }, []);

  const handlePayment = () => {
    window.snap.pay(content.payment_token, {
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
          "Closing the popup without finishing the payment will refresh this page"
        );
        dispatch(modalToggle(false));
        dispatch(modalChange({ type: null, content: null }));
        window.location.reload();
      },
    });
  };
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-4pX9y6yD_mqfg6mn";
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <ModalWindow content={content}>
        <div id="snap-container" className="size-fit p-4">
          <div className="relative">
            <h1 className="text-center text-2xl font-bold">Order Details</h1>
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-0"
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </button>
          </div>
          <div className="w-[700px] p-2 rounded-md border-[1px] border-gray-200 drop-shadow-md mt-4">
            <table className="w-full table-auto ">
              <thead>
                <tr>
                  <th>
                    <div className="min-h-[50px] flex items-center justify-center">
                      <span>Item Summary</span>
                    </div>
                  </th>
                  <th>QTY</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderItem?.map((val, i) => (
                  <tr key={"order-item-" + i}>
                    <td>
                      <div className="flex space-x-4 min-h-[50px] py-2">
                        <div>
                          <img
                            src={val.product_image[0]}
                            className="size-[50px] aspect-square object-fill"
                          ></img>
                        </div>
                        <div className="">
                          <p className=" line-clamp-2 ">{val.product_title}</p>
                          {val.variation_name === "-" ? (
                            <></>
                          ) : (
                            <p className="line-clamp-1">
                              {val.variation_name}: {val.variation_value}
                            </p>
                          )}

                          <span className=" px-2 italic text-gray-500 ">
                            note: {val.note}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{val.quantity}</td>
                    <td className="text-center">
                      {formatRupiah(val.price * (1 - val.discount))}
                    </td>
                    <td className="text-center">
                      {formatRupiah(
                        val.quantity * (val.price * (1 - val.discount))
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex mt-4 space-x-4 ">
            <div className="w-[60%] p-4 rounded-md border-[1px] border-gray-200 drop-shadow-md">
              <h1 className="text-center font-bold">Shipment Summary</h1>
              {address && (
                <div className="mt-4">
                  <div className="flex ">
                    <span className="min-w-[30%]">Recipient</span>
                    <span>{address[0].recipient}</span>
                  </div>
                  <div className="flex ">
                    <span className="min-w-[30%]">Address Line</span>
                    <span>{address[0].address_line}</span>
                  </div>
                  <div className="flex ">
                    <span className="min-w-[30%]">City</span>
                    <span>{address[0].city}</span>
                  </div>
                  <div className="flex ">
                    <span className="min-w-[30%]">Province</span>
                    <span>{address[0].region}</span>
                  </div>
                  <div className="flex ">
                    <span className="min-w-[30%]">Postal Code</span>
                    <span>{address[0].postal_code}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="h-fit w-[40%] p-4 rounded-md border-[1px] border-gray-200 drop-shadow-md">
              <h1 className="text-center font-bold">Order Summary</h1>
              <div className="mt-4"></div>
              <div className="flex ">
                <span className="min-w-[30%]">Status</span>
                <span>{content.status}</span>
              </div>
              <div className="flex ">
                <span className="min-w-[30%]">Total</span>
                <span>{formatRupiah(content.total_price)}</span>
              </div>
              {(content.status === "Menunggu pembuatan transaksi" ||
                content.status === "Menunggu Pembayaran") && (
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-500 py-2 rounded-md font-bold text-white mt-4"
                >
                  Pay
                </button>
              )}
            </div>
          </div>
        </div>
      </ModalWindow>
    </>
  );
}

export default OrderDetailModal;
