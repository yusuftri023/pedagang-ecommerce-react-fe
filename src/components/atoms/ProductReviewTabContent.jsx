/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getProductReview } from "../../services/product.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
/* eslint-disable react/prop-types */
function ProductReviewTabContent({ productId }) {
  const [review, setReview] = useState([]);
  useEffect(() => {
    getProductReview(productId).then((res) => {
      setReview(res.data);
    });
  }, []);
  const timePosted = (reviewDate) => {
    const timeDifference = Math.floor(
      Math.abs(new Date() - new Date(reviewDate)) / (1000 * 60 * 60 * 24)
    );
    let time = "";
    if (timeDifference < 1) {
      time = "Today";
    } else if (timeDifference < 2) {
      time = "Yesterday";
    } else if (timeDifference < 7) {
      time = `${timeDifference} day${timeDifference > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 30) {
      time = `${Math.floor(timeDifference / 7)} week${timeDifference > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 365) {
      time = `${Math.floor(timeDifference / 30)} month${timeDifference > 1 ? "s" : ""} ago`;
    } else {
      time = `${Math.floor(timeDifference / 365)} year${timeDifference > 1 ? "s" : ""} ago`;
    }
    return time;
  };
  return (
    <div className="flex  items-center min-h-[150px] w-full ">
      {review.length > 0 ? (
        <div className="w-full ">
          {review.map((val, i) => (
            <div
              key={"review-" + i}
              className="flex items-center w-full space-x-4 py-4 border-b-[1px]"
            >
              <div>
                <div className=" size-[50px] min-w-[50px] rounded-full overflow-hidden">
                  <img
                    className=" aspect-square"
                    src={val.customer_picture}
                  ></img>
                </div>
              </div>
              <div className="w-full">
                <div className="flex space-x-2 justify-between">
                  <span className="text-md font-medium ">
                    {val.customer_name}
                  </span>
                  <div>
                    {new Array(5).fill(1).map((_val, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          (i + 1 <= Number(val.rating)
                            ? `text-yellow-500`
                            : `text-zinc-200`) + " px-[1.2px]"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <span>{timePosted(val.date)}</span>
                </div>
                <div className="my-2">
                  {val.variation_name !== "-" ? (
                    <div className="text-sm font-medium text-gray-500">
                      {val.variation_name[0].toUpperCase() +
                        val.variation_name.slice(1)}{" "}
                      : {val.variation_value}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div>{val.comment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mx-auto font-medium text-xl">
          This Product has no review yet
        </div>
      )}
    </div>
  );
}

export default ProductReviewTabContent;
