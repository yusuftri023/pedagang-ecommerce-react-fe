/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import IconSearch from "../../assets/images/landing-page/icon _magnifying glass_.svg";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProduct } from "../../store/actions/productAction";
import { formatRupiah } from "../../utils/utils";
import { getProductCategories } from "../../services/product.service";
import { useClickOutsideElement } from "../../hooks/useClickOutsideElement";
import useDebounceCallback from "../../hooks/useDebounce";
import SearchBarResult from "./SearchBarResult";

function SearchBar() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);

  const [search, setSearch] = useState("");
  const searchResult = useSelector((state) => state.searchResult.data);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const handleSetSearchIsActive = () => setSearchIsActive(false);
  const refCategoryOption = useRef("All");
  const searchRef = useRef();
  const handleDebounce = () => {
    if (search.length > 0) {
      dispatch(
        getSearchProduct({
          searchString: search,
          category: refCategoryOption.current,
        }),
      );
    }
  };

  useDebounceCallback(handleDebounce, 1000, search, searchIsActive);
  useClickOutsideElement(searchRef, handleSetSearchIsActive);
  useEffect(() => {
    getProductCategories().then((res) => {
      const listCategory = res.data
        .map((val) => {
          return { name: val.name, id: val.id };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      setCategory([...listCategory]);
    });
  }, []);

  return (
    <div className="mx-10 w-full rounded-md bg-white">
      <div className="flex">
        <select
          id="kategori-option"
          className="border-r-2 border-[#1d1dcd] "
          onChange={(e) => {
            refCategoryOption.current = e.target.value;
          }}
        >
          <option value="All">All</option>
          {category.length > 0 &&
            category.map((val, i) => (
              <option key={"option+" + i} value={val.id}>
                {val.name.slice(0, 1).toUpperCase() + val.name.slice(1)}
              </option>
            ))}
        </select>
        <div
          ref={searchRef}
          className="relative z-50 w-full min-w-[100px] items-center overflow-visible "
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
              <SearchBarResult searchResult={searchResult} />
            ) : (
              <div
                className={`absolute z-10 max-h-[calc(80vh-30px)] min-h-[50px] w-full overflow-y-scroll rounded-b-xl bg-white `}
              >
                <p className="py-4 text-center">No result found</p>
              </div>
            ))}
        </div>
        <button className="h-full w-20 rounded-md bg-[#FFCA1D] p-2 transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 ">
          <img src={IconSearch} alt="search button" className="mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
