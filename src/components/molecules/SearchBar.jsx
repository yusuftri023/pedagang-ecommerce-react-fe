/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import IconSearch from "../../assets/images/landing-page/icon _magnifying glass_.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProduct } from "../../store/actions/productAction";

function SearchBar() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${"https://fakestoreapi.com"}/products/categories`)
      .then((res) => setCategory(() => [...res.data]));
  }, []);
  const [search, setSearch] = useState("");
  const searchResult = useSelector((state) => state.searchResult.data);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const refCategoryOption = useRef("all");
  const searchRef = useRef();
  useEffect(() => {
    if (search) {
      const intervalSearch = setInterval(() => {
        clearInterval(intervalSearch);
        dispatch(
          getSearchProduct({
            searchString: search,
            category: refCategoryOption.current,
          })
        );
      }, 1000);
      return () => clearInterval(intervalSearch);
    }
  }, [search]);
  useEffect(() => {
    if (searchIsActive) {
      const handleOutsideClick = (e) => {
        if (!searchRef.current.contains(e.target)) setSearchIsActive(false);
      };
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [searchIsActive]);
  return (
    <div className="w-full mx-10 bg-white rounded-md">
      <div className="flex">
        <select
          id="kategori-option"
          className="border-r-2 border-[#1d1dcd] "
          onChange={(e) => {
            refCategoryOption.current = e.target.value;
          }}
        >
          <option value="all">All </option>
          {category.length > 0 &&
            category.map((val, i) => (
              <option
                key={i}
                value={val.slice(0, 1).toUpperCase() + val.slice(1)}
              >
                {val.slice(0, 1).toUpperCase() + val.slice(1)}
              </option>
            ))}
        </select>
        <div
          ref={searchRef}
          className="w-full min-w-[100px] items-center relative overflow-visible z-50 "
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Cari di Pedagang"
            onChange={(e) => {
              setSearchIsActive(true);
              setSearch(e.target.value);
            }}
            className="w-full pl-4 pt-3 text-xl outline-none "
          />
          {searchIsActive &&
            searchResult &&
            (searchResult.length > 0 ? (
              <div
                className={` absolute w-full min-h-[200px] overflow-y-scroll max-h-[calc(80vh-30px)] bg-white rounded-b-xl `}
              >
                <div className="flex items-end  w-full px-4 text-2xl border-b-4 h-20 align-text-bottom ">
                  <div className="mb-3">Products</div>
                </div>
                {searchResult.map((result) => (
                  <div key={result.id} className="flex border-b-[1px]">
                    <img src={result.image} className="size-16 p-2"></img>
                    <div className="px-4  flex flex-col justify-center">
                      <a
                        href={`/products/${encodeURIComponent(result.title.toLowerCase())}-${result.product_id}+${result.id}`}
                        className=" line-clamp-1 text-blue-600 hover:cursor-pointer"
                      >
                        {result.title}
                        {result.variation_name !== "-"
                          ? ` (${result.variation_name} : ${result.variation_value})`
                          : ""}
                      </a>
                      <p className=" font-semibold">
                        {new Intl.NumberFormat("id", {
                          currency: "idr",
                          style: "currency",
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0,
                        }).format(result.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`absolute w-full min-h-[50px] overflow-y-scroll max-h-[calc(80vh-30px)] bg-white z-10 rounded-b-xl `}
              >
                <p className="py-4 text-center">No result found</p>
              </div>
            ))}
        </div>
        <button className="h-full w-20 bg-[#FFCA1D] p-2 rounded-md transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 ">
          <img src={IconSearch} alt="search button" className="mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
