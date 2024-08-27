/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faList,
  faListCheck,
  faSignOutAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { getSignOut } from "../../services/auth.service";
import { logout } from "../../store/reducers/authenticationSlicer";

const DropdownMenuItem = ({ title, icon, link, onClick = undefined }) => {
  return (
    <li
      onClick={onClick}
      className="p-2 rounded-md hover:bg-white hover:cursor-pointer"
    >
      <a href={link}>
        <FontAwesomeIcon
          className=" align-text-bottom text-xl   min-w-10 max-w-10"
          icon={icon}
        />
        <div className="inline-block ml-4">{title}</div>
      </a>
    </li>
  );
};

function UserDropdownMenu({ isHover, type }) {
  isHover = isHover && type === "account" ? true : false;
  const dispatch = useDispatch();
  const loggedInUserData = useSelector(
    (state) => state.authentication.loggedInUserData
  );
  const handleLogout = (e) => {
    e.preventDefault();
    getSignOut()
      .then(() => dispatch(logout()))
      .then(() => (window.location.href = "/"));
  };

  const content = [
    { title: "Wishlist", icon: faHeart, link: "/wishlist" },
    { title: "Your Cart", icon: faCartShopping, link: "/cart" },
    { title: "Your Orders", icon: faList, link: "/user/orders" },
    { title: "User Settings", icon: faWrench, link: "/user/settings" },
    { title: "Logout", icon: faSignOutAlt, link: "/", onClick: handleLogout },
  ];
  return (
    <DropdownMenu width={250} height={"fit-content"} x={110} isHover={isHover}>
      <div className="overflow-y-scroll no-scrollbar pb-4 ">
        <div className=" w-full  flex items-center py-4 px-[10%] align-middle text-xl font-semibold">
          <div className="rounded-full bg-zinc-200 ">
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
        <ul className="px-[10%] w-full space-y-2 mt-2">
          {content.map((val, i) => (
            <DropdownMenuItem
              key={i}
              title={val.title}
              icon={val.icon}
              link={val.link}
              onClick={val.onClick}
            />
          ))}
        </ul>
      </div>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;
