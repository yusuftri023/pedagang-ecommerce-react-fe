/* eslint-disable react/prop-types */

import DropdownCartItem from "./DropdownCartItem";
import DropdownMenu from "./DropdownMenu";
import { useGetCartQuery } from "../../store/reducers/apiSlicer";

function CartDropdownMenu({ isHover, type }) {
  isHover = isHover && type === "cart" ? true : false;
  const { data, isLoading } = useGetCartQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const cart = data ? data.data : [];

  return (
    <DropdownMenu width={400} height={"300px"} x={50} isHover={isHover}>
      <div className="no-scrollbar h-full overflow-y-scroll ">
        <div className=" flex h-[50px] w-full items-center border-b-[1px] border-gray-500 bg-gray-400 bg-opacity-50 px-[10%] align-middle text-xl font-semibold">
          <p>Your Cart</p>
        </div>
        <ul className=" h-[fit-content] whitespace-nowrap">
          {isLoading ? (
            <div>isLoading</div>
          ) : (
            <>
              {cart?.length > 0 ? (
                cart
                  .filter((val) => val.stock > 0)
                  .map((val, i) => (
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
                <div className="flex h-full w-full items-center justify-center">
                  Your cart is Empty.
                </div>
              )}
            </>
          )}
        </ul>
      </div>
    </DropdownMenu>
  );
}

export default CartDropdownMenu;
