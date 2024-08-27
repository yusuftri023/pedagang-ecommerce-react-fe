/* eslint-disable react/prop-types */
function ProductNavigation({ currentVariant }) {
  return (
    <div className=" max-w-[1000px] mx-auto bg-white mb-4 p-3 rounded-lg">
      <nav className=" space-x-2">
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
