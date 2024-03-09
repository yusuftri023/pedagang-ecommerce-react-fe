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
import { useDispatch } from "react-redux";
import { getUserCart } from "../../store/actions/cartAction";
import { getProductCart } from "../../store/actions/productAction";

function UserUtils() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = false;
  const [activeMenu, setActiveMenu] = useState(null);
  const [cartList, setCartList] = useState([]);
  const sessionCart = !sessionStorage.getItem("cart")
    ? JSON.parse(sessionStorage.getItem("cart"))
    : false;
  const [products, setProducts] = useState(sessionCart || []);
  const refAccount = useRef();
  const refCart = useRef();
  useEffect(() => {
    dispatch(getUserCart(1)).then((res) => setCartList(res.payload));
  }, []);
  useEffect(() => {
    dispatch(getProductCart(cartList[0]?.products)).then((res) => {
      if (JSON.stringify(products) !== JSON.stringify(res.payload)) {
        sessionStorage.setItem("cart", JSON.stringify(res.payload));
        setProducts(res.payload);
      }
    });
  }, [cartList]);

  return (
    <div className=" text-white w-[750px] mr-4 ">
      <ul className=" flex  justify-end ">
        <li
          ref={refCart}
          onMouseEnter={() => setActiveMenu(refCart)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="  flex items-center h-full w-[100px] justify-between space-x-2  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
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
                  {cartList?.length > 0 ? (
                    cartList[0].products.map((val, i) => (
                      <li
                        key={i}
                        className="h-10 w-full flex justify-between px-6 items-center my-4 space-x-2"
                      >
                        <img
                          src={
                            products?.find(({ id }) => id === val.productId)
                              .image
                          }
                          className="max-h-10 max-w-10 min-w-10"
                        />
                        <div
                          onClick={() =>
                            navigate(
                              `/products/${products
                                ?.find(({ id }) => id === val.productId)
                                .title.toLowerCase()
                                .split(" ")
                                .join("-")}/${
                                products?.find(({ id }) => id === val.productId)
                                  .id
                              }`
                            )
                          }
                          className="text-left w-full hover:cursor-pointer hover:text-blue-600"
                        >
                          {products?.find(({ id }) => id === val.productId)
                            .title.length > 30
                            ? products
                                ?.find(({ id }) => id === val.productId)
                                .title.slice(0, 30) + "..."
                            : products?.find(({ id }) => id === val.productId)
                                .title}
                        </div>
                        <div>x{val.quantity}</div>
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
        {isLogin ? (
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
                        <p className="ml-4 line-clamp-1 text-wrap">User</p>
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
                      <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
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
