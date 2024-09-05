/* eslint-disable react/prop-types */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import { postAddToCart } from "../../services/cart.service";
import { formatRupiah } from "../../utils/utils";

function ProductCard({
  product_id,
  product_config_id,
  image,
  title,
  price,
  rating = { rate: 5, count: 150 },
}) {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const handleLink = () => {
    window.location.href = `/products/${encodeURIComponent(title.toLowerCase())}-${product_id}+${product_config_id}`;
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleAddToCart = () => {
    const data = {
      product_id,
      quantity: 1,
      product_config_id,
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
      <div
        className={
          (isHover ? " " : "") +
          " min-w-[25%] whitespace-normal px-4 transition-all duration-300 hover:h-[400px]"
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isHover && (
          <div>
            <div className="mx-auto mt-2 w-[80%] ">
              <div className="flex justify-center overflow-hidden">
                <img src={image} alt="" className="size-40 duration-300 " />
              </div>
              <div
                onClick={handleLink}
                className="line-clamp-2 min-h-[3em] text-blue-600 hover:cursor-pointer"
              >
                {title}
              </div>
              <div className="flex justify-between text-[12px]">
                <div>
                  {new Array(5).fill(1).map((val, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={
                        i + 1 <= rating.rate
                          ? `text-yellow-500`
                          : `text-zinc-200`
                      }
                    />
                  ))}
                </div>
                <div>(100 reviews)</div>
              </div>
              <div className="flex flex-col ">
                <div className="mt-2 font-bold">{formatRupiah(price)}</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-400">
                  <div
                    style={{
                      width: `${
                        (100 / rating.count) * 100 > 100
                          ? 100
                          : (100 / rating.count) * 100
                      }%`,
                    }}
                    className={`h-full rounded-full bg-red-500`}
                  ></div>
                </div>
                <div>
                  Sold: {100 > rating.count ? rating.count : 100}/{rating.count}
                </div>
              </div>
            </div>
          </div>
        )}
        {isHover && (
          <div className="relative left-2 z-10  flex max-w-[200px] flex-col justify-center whitespace-pre-wrap bg-white drop-shadow-md transition-all duration-300 hover:mt-5 hover:scale-105">
            <div className="mx-auto mt-2 max-w-[80%] ">
              <div className="overflow-hidden">
                <img src={image} alt="" className="size-40 duration-300 " />
              </div>
              <div
                onClick={handleLink}
                className="line-clamp-2 min-h-[3em] text-blue-600 hover:cursor-pointer"
              >
                {title}
              </div>
              <div className="flex justify-between text-[12px]">
                <div>
                  {new Array(5).fill(1).map((val, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={
                        i + 1 <= rating.rate
                          ? `text-yellow-500`
                          : `text-zinc-200`
                      }
                    />
                  ))}
                </div>
                <div>(100 reviews)</div>
              </div>
              <div className="flex flex-col ">
                <div className="mt-2 font-bold">{formatRupiah(price)}</div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-400">
                  <div
                    style={{
                      width: `${
                        (100 / rating.count) * 100 > 100
                          ? 100
                          : (100 / rating.count) * 100
                      }%`,
                    }}
                    className={`h-full rounded-full bg-red-500`}
                  ></div>
                </div>
                <div>
                  Sold: {100 > rating.count ? rating.count : 100}/{rating.count}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="my-4 animate-fade-in-drop bg-[#FFCA1D] px-4 py-1 font-[500] transition-colors duration-300 hover:bg-[#968447]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductCard;
