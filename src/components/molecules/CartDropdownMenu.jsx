/* eslint-disable react/prop-types */
import DropdownCartItem from "./DropdownCartItem";
import DropdownMenu from "./DropdownMenu";

function CartDropdownMenu({ cart, isHover, type }) {
  isHover = isHover && type === "cart" ? true : false;
  return (
    <DropdownMenu width={400} height={"300px"} x={50} isHover={isHover}>
      <div className="overflow-y-scroll h-full no-scrollbar ">
        <div className=" w-full border-b-[1px] border-gray-500 flex items-center h-[50px] px-[10%] align-middle bg-gray-400 bg-opacity-50 text-xl font-semibold">
          <p>Your Cart</p>
        </div>
        <ul className=" whitespace-nowrap h-[fit-content]">
          {cart?.length > 0 ? (
            cart.map((val, i) => (
              <DropdownCartItem
                key={i}
                id={val.product_config_id}
                title={val.title}
                quantity={val.quantity}
                image={val.image[0]}
                product_id={val.product_id}
                price={val.price}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              Your cart is Empty.
            </div>
          )}
        </ul>
      </div>
    </DropdownMenu>
  );
}

export default CartDropdownMenu;
