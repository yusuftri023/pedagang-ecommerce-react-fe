import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function VariationOption({ variation, variationConfig, currentConfigId }) {
  const variationName = Object.keys(variation?.[0])[0];
  const navigate = useNavigate();
  const handleOption = (val) => {
    navigate(
      `/products/${encodeURIComponent(
        val.title.toLowerCase()
      )}-${val.product_id}+${val.product_config_id}`
    );
  };

  return (
    <div className="my-8">
      <div className="my-4 text-xl font-semibold">
        {variationName[0].toUpperCase() + variationName.slice(1)}
      </div>
      <div className="grid grid-cols-4 w-full gap-2 text-md ">
        {variation?.map((val, i) => (
          <button
            key={"variation-name-" + i}
            onClick={() => handleOption(variationConfig[i])}
            className={
              (variationConfig[i].product_config_id === currentConfigId
                ? `border-blue-600 bg-blue-600 bg-opacity-5`
                : ``) +
              ` rounded-md border-[1px] hover:border-blue-600 hover:text-blue-600 py-1`
            }
          >
            {val[variationName]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default VariationOption;
