/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faSignOutAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { getSignOut } from "../../services/auth.service";
import { logout } from "../../store/reducers/authenticationSlicer";

function UserDropdownMenu({ isHover }) {
  console.log(isHover);
  const dispatch = useDispatch();
  const loggedInUserData = useSelector(
    (state) => state.authentication.loggedInUserData
  );
  const handleLogout = () => {
    getSignOut()
      .then(() => dispatch(logout()))
      .then(() => (window.location.href = "/"));
  };
  return (
    <DropdownMenu width={250} height={320} x={110} isHover={isHover}>
      <div className="overflow-y-scroll h-full no-scrollbar ] ">
        <div className=" w-full  flex items-center py-4 px-[10%] align-middle text-xl font-semibold">
          <div className="rounded-full bg-zinc-200 min-w-fit">
            <img
              className={`size-16 rounded-full `}
              src={
                loggedInUserData?.picture
                  ? loggedInUserData.picture
                  : "/src/assets/images/landing-page/icon _people_.svg"
              }
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
          <a href="/wishlist">
            <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
              <FontAwesomeIcon
                className=" align-text-bottom text-xl   min-w-10 max-w-10"
                icon={faHeart}
              />
              <div className="inline-block ml-4">Wishlist</div>
            </div>
          </a>
          <a href="/cart">
            <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
              <FontAwesomeIcon
                className=" align-text-bottom text-xl   min-w-10 max-w-10"
                icon={faCartShopping}
              />
              <div className="inline-block ml-4">Your Cart</div>
            </div>
          </a>
          <a href="/user/settings">
            <div className="p-2 rounded-md hover:bg-white hover:cursor-pointer">
              <FontAwesomeIcon
                className=" align-text-bottom text-xl   min-w-10 max-w-10"
                icon={faWrench}
              />
              <div className="inline-block ml-4">User Settings</div>
            </div>
          </a>
          <div
            onClick={handleLogout}
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
  );
}

export default UserDropdownMenu;
