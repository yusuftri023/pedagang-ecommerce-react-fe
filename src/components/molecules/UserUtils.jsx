import IconCart from "../../assets/images/landing-page/icon _cart_.svg";
import IconPeople from "../../assets/images/landing-page/icon _people_.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClipboard,
  faHeart,
  faSignIn,
  faSignOutAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { useDispatch, useSelector } from "react-redux";

import { getProductCart } from "../../store/actions/productAction";
import { logout } from "../../store/reducers/authenticationSlicer";

function UserUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUserData = JSON.parse(localStorage.getItem("loggedinUserData"));

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const [activeMenu, setActiveMenu] = useState(null);
  const cart = useSelector((state) => state.cart.cart);
  const [products, setProducts] = useState([]);
  const refAccount = useRef();
  const refCart = useRef();

  useEffect(() => {
    if (cart.length > 0) {
      const listId = cart.map((val) => val.id);

      dispatch(getProductCart(listId)).then((res) => {
        if (JSON.stringify(products) !== JSON.stringify(res.payload)) {
          sessionStorage.setItem(
            "cart",
            JSON.stringify({
              description: res.payload.map(({ description }) => description),
              id: res.payload.map(({ id }) => id),
              rating: res.payload.map(({ rating }) => rating),
              title: res.payload.map(({ title }) => title),
              price: res.payload.map(({ price }) => price),
              category: res.payload.map(({ category }) => category),
            })
          );
          setProducts(res.payload);
        }
      });
    }
  }, [cart]);

  return (
    <div className=" text-white w-[750px] mr-4 ">
      <ul className=" flex  justify-end ">
        <li
          ref={refCart}
          onMouseEnter={() => setActiveMenu(refCart)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div
            onClick={() => navigate("/cart")}
            className="  flex items-center h-full w-[100px] justify-between space-x-2  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150"
          >
            <p>Cart</p>
            <img src={IconCart} alt="icon cart" className="" />
          </div>

          {activeMenu === refCart && (
            <DropdownMenu width={400} height={400} x={10}>
              <div className="overflow-y-scroll h-full no-scrollbar ">
                <div className=" w-full border-b-[1px] border-gray-500 flex items-center h-[50px] px-[10%] align-middle bg-gray-400 bg-opacity-50 text-xl font-semibold">
                  <p>Your Cart</p>
                </div>
                <ul className=" whitespace-nowrap">
                  {cart?.length > 0 ? (
                    cart.map((val, i) => (
                      <li
                        key={i}
                        className="h-10 w-full flex justify-between px-6 items-center my-4 space-x-2"
                      >
                        <img
                          src={products?.find(({ id }) => id === val.id)?.image}
                          className="max-h-10 max-w-10 min-w-10"
                        />
                        <div
                          onClick={() =>
                            navigate(
                              `/products/${encodeURIComponent(
                                products
                                  ?.find(({ id }) => id === val.id)
                                  ?.title.toLowerCase()
                              )}/${
                                products?.find(({ id }) => id === val.id).id
                              }`
                            )
                          }
                          className="text-left w-full hover:cursor-pointer hover:text-blue-600"
                        >
                          {products?.find(({ id }) => id === val.id)?.title
                            .length > 30
                            ? products
                                ?.find(({ id }) => id === val.id)
                                ?.title.slice(0, 30) + "..."
                            : products?.find(({ id }) => id === val.id)?.title}
                        </div>
                        <div>x{val.amount}</div>
                      </li>
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      Your cart is Empty.
                    </div>
                  )}
                </ul>
              </div>
            </DropdownMenu>
          )}
        </li>
        {isLoggedIn ? (
          <>
            {" "}
            <li className="  flex items-center justify-between space-x-2 w-[140px] hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
              <p>Wishlist</p>
              <FontAwesomeIcon icon={faHeart} className="text-[30px]" />
            </li>
            <li
              ref={refAccount}
              onMouseEnter={() => setActiveMenu(refAccount)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="  flex items-center justify-center space-x-2 w-[140px] hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
                <p>Account</p>
                <img src={IconPeople} alt="icon profile" className="size-12 " />
              </div>

              {activeMenu === refAccount && (
                <DropdownMenu width={250} height={320} x={110}>
                  <div className="overflow-y-scroll h-full no-scrollbar ] ">
                    <div className=" w-full  flex items-center py-4 px-[10%] align-middle text-xl font-semibold">
                      <div className="rounded-full bg-zinc-200 min-w-fit">
                        <img
                          className="p-2 size-16"
                          src="/src/assets/images/landing-page/icon _people_.svg"
                        ></img>
                      </div>
                      <div className="">
                        <p className="ml-4 line-clamp-1 text-wrap">
                          {loggedInUserData?.username &&
                          loggedInUserData?.username.length > 10
                            ? loggedInUserData?.username.slice(0, 10) + "..."
                            : loggedInUserData?.username}
                        </p>
                      </div>
                    </div>
                    <div className="px-[10%] w-full space-y-2 mt-2">
                      <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
                        <FontAwesomeIcon
                          className=" align-text-bottom text-xl   min-w-10 max-w-10"
                          icon={faHeart}
                        />
                        <div className="inline-block ml-4">Wishlist</div>
                      </div>
                      <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
                        <FontAwesomeIcon
                          className=" align-text-bottom text-xl   min-w-10 max-w-10"
                          icon={faCartShopping}
                        />
                        <div className="inline-block ml-4">Your Cart</div>
                      </div>
                      <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
                        <FontAwesomeIcon
                          className=" align-text-bottom text-xl   min-w-10 max-w-10"
                          icon={faWrench}
                        />
                        <div className="inline-block ml-4">Settings</div>
                      </div>
                      <div
                        onClick={() => dispatch(logout())}
                        className="p-2 rounded-md hover:bg-white hover:cursor-pointer"
                      >
                        <FontAwesomeIcon
                          className=" align-text-bottom text-xl   min-w-10 max-w-10"
                          icon={faSignOutAlt}
                        />
                        <div className="inline-block ml-4">Log Out</div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              )}
            </li>
          </>
        ) : (
          <>
            <li onClick={() => navigate("/register")}>
              <div className="  flex items-center justify-center space-x-2 h-full w-[140px]  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
                <p>Register</p>
                <FontAwesomeIcon icon={faClipboard} className="text-[30px]" />
              </div>
            </li>
            <li onClick={() => navigate("/login")}>
              <div className="  flex items-center justify-center space-x-2 h-full w-[140px]  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
                <p>Log In</p>
                <FontAwesomeIcon icon={faSignIn} className="text-[30px]" />
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default UserUtils;
