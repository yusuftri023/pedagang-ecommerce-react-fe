import { useState } from "react";
import ProductDetailTabContent from "../atoms/ProductDetailTabContent";
import ProductReviewTabContent from "../atoms/ProductReviewTabContent";
import ProductDiscussionTabContent from "../atoms/ProductDiscussionTabContent";
/* eslint-disable react/prop-types */
function ProductInformation({ product }) {
  const [tab, setTab] = useState("details");

  const tabs = ["Details", "Ratings & Reviews", "Discussion"];
  const handleTab = (e) => {
    setTab(e.target.id);
  };
  return (
    <div className=" mt-4">
      <div
        onClick={handleTab}
        className=" grid grid-cols-3 text-center border-y-2 "
      >
        {tabs?.map((title) => (
          <div
            key={title}
            id={title.split(" ")[0].toLowerCase()}
            className={
              (title.split(" ")[0].toLowerCase() === tab
                ? ` border-b-4 border-blue-600`
                : ``) +
              ` text-lg px-2 hover:bg-gray-100 hover:bg-opacity-50 hover:cursor-pointer transition-colors duration-500 py-2`
            }
          >
            {title}
          </div>
        ))}
      </div>

      <div className=" w-full pr-4 mt-2 min-h-[100px] ">
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