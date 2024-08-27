import ShiningEffect from "../atoms/ShiningEffect";

/* eslint-disable react/prop-types */
function ProductTitle({ title, variation_name, variation_value }) {
  return (
    <div
      className={
        (title ? "" : "bg-gray-200 overflow-hidden") +
        " min-w-[100px] min-h-[20px] rounded-full flex"
      }
    >
      {title ? (
        <div className=" text-3xl font-semibold">
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
