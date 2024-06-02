/* eslint-disable react/prop-types */
function WishlistItem({
  wishlist_id,
  image,
  title,
  variation_name,
  variation_value,
  price,
  stock,
}) {
  return (
    <div>
      <div className="p-2">
        <div className="py-2 w-[fit-content]" id={`cart-item-${wishlist_id}`}>
          <div className="size-[fit-content] relative ">
            <img
              src={image}
              className=" mx-auto size-[120px] object-cover"
            ></img>
            <div className="bg-green-600 px-2 text-white max-w-[fit-content] right-0 bottom-0 absolute shadow-black rounded-tl-md drop-shadow-md ">
              tersisa {stock}
            </div>
          </div>
          <div className="">
            <p className=" line-clamp-2">{title}</p>
            {variation_name === "-" ? (
              <></>
            ) : (
              <p className="line-clamp-1">
                {variation_name}: {variation_value}
              </p>
            )}
          </div>
          <div className="">
            <p className=" ">
              {new Intl.NumberFormat("id", {
                currency: "idr",
                style: "currency",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              }).format(price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
