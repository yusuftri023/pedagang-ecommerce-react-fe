import CartItem from "./CartItem";

/* eslint-disable react/prop-types */
function CartContent({ cart, cartType = null }) {
  if (cartType !== "outOfStock") cart = cart?.filter((val) => val.stock > 0);
  return (
    <div
      style={{ opacity: cartType === "outOfStock" ? 0.7 : 1 }}
      className=" h-[fit-content] bg-white  p-6   shadow-gray-500  drop-shadow-md"
    >
      {cartType === "outOfStock" && (
        <p className="text-2xl font-bold ">Currently Out of Stock</p>
      )}
      {cart?.map((val, i) => (
        <CartItem
          key={i}
          cartId={val.cart_id}
          productId={val.product_id}
          quantity={val.quantity}
          productConfigId={val.product_config_id}
          image={val.image[0]}
          price={val.price}
          variation_value={val.variation_value}
          variation_name={val.variation_name}
          title={val.title}
          stock={val.stock}
          note={val.note}
          discount={val.discount}
        />
      ))}
    </div>
  );
}

export default CartContent;
