import { useState } from "react";
import ProductDetailTabContent from "../atoms/ProductDetailTabContent";
import ProductReviewTabContent from "../atoms/ProductReviewTabContent";
import ProductDiscussionTabContent from "../atoms/ProductDiscussionTabContent";
/* eslint-disable react/prop-types */
function ProductInformation({ product }) {
  const [tab, setTab] = useState("details");

  const tabs = ["Details", "Ratings & Reviews"];
  const handleTab = (e) => {
    setTab(e.target.id);
  };
  return (
    <div className="mt-4 ">
      <div
        onClick={handleTab}
        className="grid grid-cols-2 border-y-2  text-center"
      >
        {tabs?.map((title) => (
          <div
            key={title}
            id={title.split(" ")[0].toLowerCase()}
            className={
              (title.split(" ")[0].toLowerCase() === tab
                ? ` border-b-4 border-blue-600`
                : ``) +
              ` px-2 py-2 text-lg transition-colors duration-500 hover:cursor-pointer hover:bg-gray-100 hover:bg-opacity-50`
            }
          >
            {title}
          </div>
        ))}
      </div>

      <div className=" mt-2 min-h-[100px] w-full pr-4 ">
        {tab === "details" ? (
          <ProductDetailTabContent detail={product?.description} />
        ) : tab === "ratings" ? (
          <ProductReviewTabContent productId={product?.product_id} />
        ) : tab === "discussion" ? (
          <ProductDiscussionTabContent productId={product?.product_id} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ProductInformation;
