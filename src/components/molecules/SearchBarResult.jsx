import { memo } from "react";
import { formatRupiah } from "../../utils/utils";

/* eslint-disable react/prop-types */
const SearchBarResult = memo(function SearchBarResult({ searchResult }) {
  return (
    <div
      className={` absolute max-h-[calc(80vh-30px)] min-h-[200px] w-full overflow-y-scroll rounded-b-xl bg-white `}
    >
      <div className="flex h-20  w-full items-end border-b-4 px-4 align-text-bottom text-2xl ">
        <div className="mb-3">Products</div>
      </div>
      {searchResult.map((result) => (
        <div key={result.id} className="flex border-b-[1px]">
          <img src={result.image[0]} className="size-16 p-2"></img>
          <div className="flex  flex-col justify-center px-4">
            <a
              href={`/products/${encodeURIComponent(result.title.toLowerCase())}-${result.product_id}+${result.id}`}
              className=" line-clamp-1 text-blue-600 hover:cursor-pointer"
            >
              {result.title}
              {result.variation_name !== "-"
                ? ` (${result.variation_name} : ${result.variation_value})`
                : ""}
            </a>
            <p className=" font-semibold">{formatRupiah(result.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default SearchBarResult;
