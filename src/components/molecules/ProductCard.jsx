/* eslint-disable react/prop-types */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, image, title, price, rating }) {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const handleLink = () => {
    navigate(`/products/${title.toLowerCase().split(" ").join("-")}/${id}`);
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
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
        <div className={isHover ? " opacity-0" : ""}>
          <div className="w-[80%] mx-auto mt-2 ">
            <div className="overflow-hidden flex justify-center">
              <img src={image} alt="" className="size-40 duration-300 " />
            </div>
            <div
              onClick={handleLink}
              className="text-blue-600 min-h-[3em] line-clamp-2 hover:cursor-pointer"
            >
              {title}
            </div>
            <div className="flex text-[12px] justify-between">
              <div>
                {new Array(5).fill(1).map((val, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      i + 1 <= rating.rate ? `text-yellow-500` : `text-zinc-200`
                    }
                  />
                ))}
              </div>
              <div>(100 reviews)</div>
            </div>
            <div className="flex flex-col ">
              <div className="mt-2 font-bold">
                {new Intl.NumberFormat("id", {
                  currency: "idr",
                  style: "currency",
                }).format(price * 10000)}
              </div>
              <div className="w-full h-2 mt-2 rounded-full bg-gray-400">
                <div
                  className={`w-[${
                    (100 / rating.count) * 100 > 100
                      ? 100
                      : (100 / rating.count) * 100
                  }%] h-full rounded-full bg-red-500`}
                ></div>
              </div>
              <div>
                Sold: {100 > rating.count ? rating.count : 100}/{rating.count}
              </div>
            </div>
          </div>
        </div>
        {isHover && (
          <div className="relative z-10 bg-white  drop-shadow-md left-2 max-w-[200px] -translate-y-[85%] hover:scale-105 hover:mt-5 transition-all duration-300 whitespace-pre-wrap flex flex-col justify-center">
            <div className="max-w-[80%] mx-auto mt-2 ">
              <div className="overflow-hidden">
                <img src={image} alt="" className="size-40 duration-300 " />
              </div>
              <div
                onClick={handleLink}
                className="text-blue-600 min-h-[3em] line-clamp-2 hover:cursor-pointer"
              >
                {title}
              </div>
              <div className="flex text-[12px] justify-between">
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
                <div className="mt-2 font-bold">
                  {new Intl.NumberFormat("id", {
                    currency: "idr",
                    style: "currency",
                  }).format(price * 10000)}
                </div>
                <div className="w-full h-2 mt-2 rounded-full bg-gray-400">
                  <div
                    className={`w-[${
                      (100 / rating.count) * 100 > 100
                        ? 100
                        : (100 / rating.count) * 100
                    }%] h-full rounded-full bg-red-500`}
                  ></div>
                </div>
                <div>
                  Sold: {100 > rating.count ? rating.count : 100}/{rating.count}
                </div>
                <button className="bg-[#FFCA1D] hover:bg-[#968447] px-4 py-1 font-[500] my-4 animate-fade-in-drop transition-colors duration-300">
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
