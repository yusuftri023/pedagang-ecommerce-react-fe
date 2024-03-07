/* eslint-disable react/prop-types */
function ProductCardContainer({ children, title }) {
  return (
    <section className="mt-4 overflow-y-visible mb-40  max-h-[280px] ">
      <div className="border-b-2 border-gray-400 mb-4 ">
        <span className="border-b-2 border-[#FFCA1D]">{title}</span>
      </div>
      <div className="overflow-x-scroll no-scrollbar   ">
        <div className=" flex  justify-left   ">{children}</div>
      </div>
    </section>
  );
}

export default ProductCardContainer;
