/* eslint-disable react/prop-types */
import { useRef } from "react";
import UserDropdownMenu from "../components/molecules/UserDropdownMenu";
import useHover from "../hooks/useHover";
import CartDropdownMenu from "../components/molecules/CartDropdownMenu";

const WithDropdownOnHover = (HeaderButtonComponent, type) => {
  return function WrappedComponent(props) {
    let DropdownMenuComponent;
    let dropdownProps;

    if (type === "account") {
      DropdownMenuComponent = UserDropdownMenu;
    } else if (type === "cart") {
      DropdownMenuComponent = CartDropdownMenu;
      dropdownProps = { cart: props.cart };
    }
    const wrapperRef = useRef();
    const isHover = useHover(wrapperRef);
    dropdownProps = { ...dropdownProps, isHover };
    return (
      <li ref={wrapperRef}>
        <HeaderButtonComponent {...props} />
        {isHover && <DropdownMenuComponent {...dropdownProps} />}
      </li>
    );
  };
};
export default WithDropdownOnHover;
