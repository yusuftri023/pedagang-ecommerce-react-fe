/* eslint-disable react/prop-types */
function ProductNavigation({ currentVariant }) {
  return (
    <div className=" mx-auto mb-4 max-w-[1000px] rounded-lg bg-white p-3">
      <nav className="space-x-2 ">
        <span>Home</span>
        <span>&gt;</span>
        <span>
          {currentVariant
            ? currentVariant.category_name[0].toUpperCase() +
              currentVariant.category_name.slice(1)
            : ""}
        </span>
        <span>&gt;</span>
        <span>{currentVariant?.title}</span>
      </nav>
    </div>
  );
}

export default ProductNavigation;
