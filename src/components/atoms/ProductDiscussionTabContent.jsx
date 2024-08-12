/* eslint-disable react/prop-types */
function ProductDiscussionTabContent({ productId }) {
  return (
    <div id={productId} className="flex  items-center min-h-[150px] w-full ">
      <div className="text-center mx-auto font-medium text-xl">
        This Product has no discussion yet
      </div>
    </div>
  );
}

export default ProductDiscussionTabContent;
