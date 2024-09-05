import { useDispatch } from "react-redux";
import trashbinSvg from "../../assets/trashbin.svg";
import { postAddToCart } from "../../services/cart.service";
import { deleteWishlistItem } from "../../services/wishlist.service";
import { getUserWishlist } from "../../store/actions/wishlistAction";
import {
  modalChange,
  modalToggle,
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";
import { formatRupiah } from "../../utils/utils";

/* eslint-disable react/prop-types */
function WishlistItem({
  productId,
  wishlistId,
  image,
  title,
  variation_name,
  variation_value,
  price,
  stock,
  productConfigId,
}) {
  const dispatch = useDispatch();
  const handleLink = () => {
    window.location.href = `/products/${encodeURIComponent(title.toLowerCase())}-${productId}+${productConfigId}`;
  };

  const handleDeleteFromWishlists = () => {
    deleteWishlistItem(wishlistId)
      .then(() => dispatch(getUserWishlist()))
      .then(() => {
        dispatch(popUpToggle(true));
        dispatch(popUpChange({ type: "deleteFromWishlist" }));
      })
      .catch((err) => console.log(err));
  };
  const handleAddToCart = () => {
    const data = {
      product_id: productId,
      quantity: 1,
      product_config_id: productConfigId,
    };

    postAddToCart(data)
      .then(() => {
        dispatch(modalToggle());
        dispatch(
          modalChange({
            type: "addedToCart",
            content: { image, title, price },
          }),
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" h-[fit-content] overflow-hidden rounded-md border-[1px] border-gray-200 pb-2 shadow-black drop-shadow-md">
        <div>
          <div className="mx-auto ">
            <div
              className="relative flex justify-center overflow-hidden "
              onClick={handleLink}
            >
              <img
                src={image}
                alt={title}
                className="aspect-square transition-all  duration-100 hover:cursor-pointer hover:brightness-90"
              />
              <div
                className={`${stock > 0 ? "bg-green-100 " : "bg-red-100 "} absolute bottom-0 right-0 rounded-tl-md px-1 text-sm opacity-60 `}
              >
                {stock > 0 ? `${stock} in stock` : "Out of Stock"}
              </div>
            </div>
            <div className="mx-auto w-[90%]">
              <div
                onClick={handleLink}
                className="my-2 line-clamp-2 text-blue-600 hover:cursor-pointer"
              >
                {title}{" "}
                {variation_name === "-"
                  ? ""
                  : `(${variation_name}: ${variation_value})`}
              </div>
              <div className="flex flex-col ">
                <div className="font-semibold ">{formatRupiah(price)}</div>
                <div className="mt-2 flex w-full items-center space-x-1">
                  <button
                    onClick={handleDeleteFromWishlists}
                    className="flex w-[46px] items-center rounded-md border-2 border-gray-200 transition-colors duration-300 hover:cursor-pointer hover:border-gray-400 hover:bg-gray-400"
                  >
                    <img className="w-fit  p-1" src={trashbinSvg}></img>
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="text-md w-full rounded-sm border-[1px]  border-[#FFCA1D]  bg-[#FFCA1D] p-[4px] font-semibold transition-colors  duration-300  hover:border-[#968447] hover:bg-[#968447]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WishlistItem;
