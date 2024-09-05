/* eslint-disable react/prop-types */
import { memo, useRef } from "react";
import UserDropdownMenu from "../components/molecules/UserDropdownMenu";
import useHover from "../hooks/useHover";
import CartDropdownMenu from "../components/molecules/CartDropdownMenu";
import useTouch from "../hooks/useTouch";
import useMediaQuery from "../hooks/useMediaQuery";
const WithDropdownOnHover = (HeaderButtonComponent, type = null) => {
  return memo(function WrappedComponent(props) {
    let DropdownMenuComponent;
    let dropdownProps;

    if (type === "account") {
      DropdownMenuComponent = UserDropdownMenu;
      dropdownProps = { type: "account" };
    } else if (type === "cart") {
      DropdownMenuComponent = CartDropdownMenu;
      dropdownProps = { cart: props.cart, type: "cart" };
    }
    const isMobile = useMediaQuery("(max-width: 768px)");
    const wrapperRef = useRef();
    const touchOrHover = isMobile ? useTouch : useHover;
    const isHover = touchOrHover(wrapperRef);
    dropdownProps = { ...dropdownProps, isHover };
    return (
      <li ref={wrapperRef} className="size-fit">
        <HeaderButtonComponent {...props} />
        {isHover && <DropdownMenuComponent {...dropdownProps} />}
      </li>
    );
  });
};
export default WithDropdownOnHover;
