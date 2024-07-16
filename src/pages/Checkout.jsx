/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import JntLogo from "../assets/images/checkout/jnt.png";
import PaypalLogo from "../assets/images/checkout/logopaypal.svg";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../store/actions/customerAction";
import { getAuth } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../store/reducers/authenticationSlicer";
import MinimumLayouts from "../layouts/MinimumLayouts";

function CheckoutPage() {
  const GrandTotal = "";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => navigate("/"), 1000);
      });
    dispatch(getUserData());
  }, []);

  return (
    <>
      <MinimumLayouts>
        <div className="mb-5 py-5">
          <div className="w-3/4 mx-[12%] bg-gray-400">
            <div className="text-center py-10 font-bold font-poppins">
              Checkout
            </div>
            <div className="w-full py-5 border-b-2 font-poppins">
              <div className="inline-block w-1/3 px-3">Product</div>
              <div className="inline-block w-1/3 text-center">Quantity</div>
              <div className="inline-block w-1/3 text-center">Price</div>
            </div>
            <div className="w-full py-5 border-b-2 font-poppins">
              <div className="inline-block w-1/3 px-3">Mens Cotton Jacket</div>
              <div className="inline-block w-1/3 text-center">
                <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
                <input type="number" className="w-9 text-center mx-2" />
                <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
              </div>
              <div className="inline-block w-1/3 px-5 text-right">
                Rp 559.900,00
              </div>
            </div>
            <div className="w-full font-poppins flex">
              <div className="inline-block w-1/2 px-3 h-24 my-auto border-r-2">
                <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
                <input
                  type="text"
                  name="discount"
                  id=""
                  placeholder="Discount Core"
                  className="ml-2 rounded-lg px-2 font-poppins"
                />
              </div>
              <div className="inline-block w-1/2">
                <div className="block m-2">
                  <div className="inline-block w-1/2">Price</div>
                  <div className="inline-block w-1/2 px-3 text-right">
                    Rp 559.900,00
                  </div>
                </div>
                <div className="block m-2">
                  <div className="inline-block w-1/2">Shipping</div>
                  <div className="inline-block w-1/2 px-3 text-right"></div>
                </div>
                <div className="block border-t-2 m-2 py-2">
                  <div className="inline-block w-1/2">Grand Total</div>
                  <div className="inline-block w-1/2 px-3 text-right">
                    {GrandTotal}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/4 mx-[12%] mt-3 p-3 bg-gray-400">
            <div className="text-center py-3 font-bold font-poppins">
              Shipping
            </div>
            <div className="w-[70%] mx-[15%] px-3 border-green-600 border-2 bg-green-50 flex justify-between cursor-pointer">
              <div className="flex">
                <img
                  src={JntLogo}
                  alt=""
                  className="w-32 h-7 bg-red-700 my-3"
                />
                <span className="ml-3 py-3 font-poppins">J&T</span>
              </div>
              <div className="py-3">
                <span className="font-bold font-poppins">Rp 20.000,-</span>
                <input
                  type="checkbox"
                  checked="checked"
                  className="ml-1 border-2 border-green-700"
                />
              </div>
            </div>
          </div>
          <div className="w-3/4 mx-[12%] mt-3 p-3 bg-gray-400">
            <div className="text-center py-3 font-bold font-poppins">
              Payment
            </div>
            <div className="w-[70%] mx-[15%] mt-1 px-3 border-slate-400 border-2 bg-slate-50 flex cursor-pointer">
              <div className="flex">
                <img src={PaypalLogo} alt="" className="w-32 h-12 my-3" />
              </div>
              <div className="mx-3">
                <div className="py-1">Pay with</div>
                <div className="py-1 font-bold">Paypal</div>
              </div>
            </div>
          </div>
          <div className="w-3/4 mx-[12%] mt-3 p-3 bg-gray-400">
            <div className="text-center py-3 font-bold font-poppins cursor-pointer">
              Complete your order
            </div>
          </div>
        </div>
      </MinimumLayouts>
    </>
  );
}

export default CheckoutPage;
