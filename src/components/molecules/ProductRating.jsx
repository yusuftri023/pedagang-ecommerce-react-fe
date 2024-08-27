/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getProductRating } from "../../services/product.service";
import ShiningEffect from "../atoms/ShiningEffect";

function ProductRating({ productId }) {
  const [rating, setRating] = useState(null);
  useEffect(() => {
    getProductRating(productId).then((res) =>
      setTimeout(() => setRating(res.data[0]), 1000)
    );
  }, []);
  return (
    <div className="flex text-md space-x-4 mt-6">
      <div
        className={
          (rating ? "" : "bg-gray-200 overflow-hidden") +
          " min-w-[100px] min-h-[20px] rounded-full"
        }
      >
        {rating ? (
          new Array(5)
            .fill(1)
            .map((_val, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={
                  i + 1 <= Number(rating.avg_rating)
                    ? `text-yellow-500`
                    : `text-zinc-200`
                }
              />
            ))
        ) : (
          <ShiningEffect />
        )}
      </div>
      <div
        className={
          (rating ? "" : "bg-gray-200 overflow-hidden") +
          " min-w-[100px] min-h-[20px] rounded-full"
        }
      >
        {!rating ? (
          <ShiningEffect />
        ) : rating?.total_review > 0 ? (
          <span className="space-x-2">
            <span>
              {Intl.NumberFormat("en", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(Number(rating.avg_rating))}
            </span>
            <span>({rating.total_review} reviews)</span>
          </span>
        ) : (
          `No Reviews yet`
        )}
      </div>
    </div>
  );
}

export default ProductRating;
