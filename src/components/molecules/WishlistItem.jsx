import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { postAddToCart } from "../../services/cart.service";
import { deleteWishlistItem } from "../../services/wishlist.service";
import { getUserWishlist } from "../../store/actions/wishlistAction";

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
      `/products/${encodeURIComponent(title.toLowerCase())}/${productId}`
    );
  };
  const handleDeleteFromWishlist = () => {
    deleteWishlistItem(wishlistId)
      .then(() => dispatch(getUserWishlist()))
      .catch((err) => console.log(err));
  };
  const handleAddToCart = () => {
    const data = {
      product_id: productId,
      quantity: 1,
      product_config_id: productConfigId,
    };

    postAddToCart(data)
      .then(() => {})
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
                alt=""
                className=" aspect-square object-cover hover:cursor-pointer hover:brightness-90 transition-all duration-100   "
              />
              <div
                className={`${stock > 0 ? "bg-green-100 " : "bg-red-100 "} absolute bottom right-0 bottom-0 p-1 bg-green-100 rounded-tl-md text-sm opacity-85`}
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
                    onClick={handleDeleteFromWishlist}
                    className=" border-green-400  hover:cursor-pointer flex items-center"
                  >
                    <FontAwesomeIcon
                      className=" text-md border-[1px] py-[8px] px-[9px] rounded-sm hover:bg-gray-400 transition-colors duration-300"
                      icon={faTrash}
                    />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="bg-[#FFCA1D] border-[1px] p-[4px] border-[#FFCA1D]  rounded-sm  hover:bg-[#968447] hover:border-[#968447] w-full text-md  font-semibold animate-fade-in-drop transition-colors duration-300"
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
