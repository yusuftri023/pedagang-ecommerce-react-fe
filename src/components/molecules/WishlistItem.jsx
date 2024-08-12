import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLink = () => {
    navigate(
      `/products/${encodeURIComponent(title.toLowerCase())}-${productId}+${productConfigId}`
    );
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
          modalChange({ type: "addedToCart", content: { image, title, price } })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" border-gray-200 border-[1px] rounded-md drop-shadow-md shadow-black pb-2 h-[fit-content] overflow-hidden">
        <div>
          <div className=" mx-auto">
            <div
              className="overflow-hidden flex justify-center relative "
              onClick={handleLink}
            >
              <img
                src={image}
                alt={title}
                className=" aspect-square  hover:cursor-pointer hover:brightness-90 transition-all duration-100   "
              />
              <div
                className={`${stock > 0 ? "bg-green-100 " : "bg-red-100 "} absolute bottom-0 right-0 opacity-60 rounded-tl-md text-sm px-1 `}
              >
                {stock > 0 ? `${stock} in stock` : "Out of Stock"}
              </div>
            </div>
            <div className="w-[90%] mx-auto">
              <div
                onClick={handleLink}
                className="text-blue-600 my-2 line-clamp-2 hover:cursor-pointer"
              >
                {title}{" "}
                {variation_name === "-"
                  ? ""
                  : `(${variation_name}: ${variation_value})`}
              </div>
              <div className="flex flex-col ">
                <div className=" font-semibold">
                  {new Intl.NumberFormat("id", {
                    currency: "idr",
                    style: "currency",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 0,
                  }).format(price)}
                </div>
                <div className="w-full flex items-center space-x-1 mt-2">
                  <button
                    onClick={handleDeleteFromWishlists}
                    className="transition-colors duration-300 hover:cursor-pointer hover:bg-gray-400 hover:border-gray-400 flex items-center w-[46px] border-2 border-gray-200 rounded-md"
                  >
                    <img className=" w-fit p-1" src={trashbinSvg}></img>
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#FFCA1D] border-[1px] p-[4px] border-[#FFCA1D]  rounded-sm  hover:bg-[#968447] hover:border-[#968447] w-full text-md  font-semibold  transition-colors duration-300"
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
