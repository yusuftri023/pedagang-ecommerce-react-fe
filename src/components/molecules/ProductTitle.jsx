import ShiningEffect from "../atoms/ShiningEffect";

/* eslint-disable react/prop-types */
function ProductTitle({ title, variation_name, variation_value }) {
  return (
    <div
      className={
        (title ? "" : "overflow-hidden bg-gray-200") +
        " flex min-h-[20px] min-w-[100px] rounded-full"
      }
    >
      {title ? (
        <div className="text-3xl font-semibold ">
          {title}
          {variation_name === "-"
            ? ""
            : ` (${variation_name}: ${variation_value})`}
        </div>
      ) : (
        <ShiningEffect />
      )}
    </div>
  );
}

export default ProductTitle;
