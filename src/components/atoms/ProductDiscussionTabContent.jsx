/* eslint-disable react/prop-types */
function ProductDiscussionTabContent({ productId }) {
  return (
    <div id={productId} className="flex  min-h-[150px] w-full items-center ">
      <div className="mx-auto text-center text-xl font-medium">
        This Product has no discussion yet
      </div>
    </div>
  );
}

export default ProductDiscussionTabContent;
