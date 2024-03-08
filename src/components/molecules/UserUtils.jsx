import IconCart from "../../assets/images/landing-page/icon _cart_.svg";
import IconPeople from "../../assets/images/landing-page/icon _people_.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";

function UserUtils() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const refAccount = useRef();
  const refCart = useRef();
  return (
    <div className=" text-white w-[750px] mr-4 ">
      <ul className=" flex  justify-end ">
        <li
          ref={refCart}
          onMouseEnter={() => setActiveMenu(refCart)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="  flex items-center h-full justify-between space-x-2  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
            <p>Cart</p>
            <img src={IconCart} alt="icon cart" className="" />
          </div>

          {activeMenu === refCart && (
            <DropdownMenu>
              <div className="w-full border-b-[1px] border-gray-500 flex items-center h-[15%] px-[10%] align-middle bg-gray-400 bg-opacity-50 text-xl font-semibold">
                <p>Your Cart</p>
              </div>
              <ul>
                <li></li>
              </ul>
            </DropdownMenu>
          )}
        </li>
        <li className="  flex items-center justify-between space-x-2  hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
          <p>Wishlist</p>
          <FontAwesomeIcon icon={faHeart} className="text-[30px]" />
        </li>
        <li
          ref={refAccount}
          onMouseEnter={() => setActiveMenu(refAccount)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div className="  flex items-center justify-center space-x-2 hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
            <p>Account</p>
            <img src={IconPeople} alt="icon profile" className="size-12 " />
          </div>

          {activeMenu === refAccount && (
            <DropdownMenu>
              <p>Account</p>
            </DropdownMenu>
          )}
        </li>
      </ul>
    </div>
  );
}

export default UserUtils;
