import { formatRupiah } from "../../utils/utils";
import ShiningEffect from "../atoms/ShiningEffect";

/* eslint-disable react/prop-types */
function ProductPrice({ currentVariant, discount }) {
  return (
    <>
      {currentVariant?.price ? (
        <div>
          {currentVariant?.price && (
            <div>
              <span className="text-3xl font-semibold">
                {formatRupiah(currentVariant?.price * (1 - discount))}
              </span>
            </div>
          )}
          {discount > 0 && (
            <span className="mr-2 rounded-sm bg-red-300 px-1 text-red-600">
              {discount * 100}% off
            </span>
          )}
          {currentVariant?.price && (
            <span
              className={
                (discount > 0 ? `text-gray-400 line-through` : `text-3xl`) +
                ` font-semibold`
              }
            >
              {formatRupiah(currentVariant?.price)}
            </span>
          )}
        </div>
      ) : (
        <ShiningEffect />
      )}
    </>
  );
}

export default ProductPrice;
