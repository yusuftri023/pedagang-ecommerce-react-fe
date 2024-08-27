/* eslint-disable react-hooks/exhaustive-deps */
import {
  faCartShopping,
  faClipboard,
  faHeart,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAuth } from "../../store/reducers/authenticationSlicer";
import { getAuth } from "../../services/auth.service";
import { getCart } from "../../store/actions/cartAction";
import { getUserData } from "../../store/actions/customerAction";

import HeaderButton from "./HeaderButton";
import WithDropdownOnHover from "../../hocs/WithDropdownOnHover";

const CartHeaderWithDropdown = WithDropdownOnHover(HeaderButton, "cart");
const AccountHeaderWithDropdown = WithDropdownOnHover(HeaderButton, "account");

function UserUtils() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    getAuth()
      .then(() => dispatch(setAuth(true)))
      .then(() => dispatch(getCart()))
      .then(() => dispatch(getUserData()))
      .catch(() => {
        dispatch(setAuth(false));
        setTimeout(() => {
          if (
            window.location.pathname.slice(0, 9) !== "/products" &&
            window.location.pathname.slice(0, 9) !== "/"
          ) {
            window.location.href = "/";
          }
        }, 1000);
      });
  }, []);
  return (
    <div className=" text-white  ">
      <ul className=" flex  justify-end ">
        <CartHeaderWithDropdown
          faIcon={faCartShopping}
          text={"Cart"}
          url={"/cart"}
          cart={cart}
        />
        {isLoggedIn ? (
          <>
            <HeaderButton
              faIcon={faHeart}
              text={"Wishlist"}
              url={"/wishlist"}
            />

            <AccountHeaderWithDropdown
              faIcon={faUser}
              text={"Account"}
              url={"/user/settings"}
            />
          </>
        ) : (
          <>
            <HeaderButton
              faIcon={faClipboard}
              text={"Register"}
              url={"/register"}
            />
            <HeaderButton faIcon={faSignIn} text={"Login"} url={"/login"} />
          </>
        )}
      </ul>
    </div>
  );
}

export default UserUtils;
