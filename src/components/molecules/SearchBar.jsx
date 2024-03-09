import { useEffect, useRef, useState } from "react";
import IconSearch from "../../assets/images/landing-page/icon _magnifying glass_.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getSearchProduct } from "../../store/actions/productAction";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLink = (title, id) => {
    navigate(`/products/${title.toLowerCase().split(" ").join("-")}/${id}`);
  };
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategory(() => [...res.data]));
  }, []);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
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
        ).then((res) => setSearchResult(res.payload));
      }, 1000);
      return () => clearInterval(intervalSearch);
    }
  }, [search]);
  useEffect(() => {
    if (searchIsActive) {
      const handleOutsideClick = (e) => {
        console.log(searchRef.current.contains(e.target));
        if (!searchRef.current.contains(e.target)) setSearchIsActive(false);
      };
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [searchIsActive]);
  return (
    <div className="w-full mx-10 bg-white rounded-md overflow-hidden">
      <div className="flex">
        <select
          id="kategori-option"
          className="border-r-2 border-[#1d1dcd]"
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
        <div ref={searchRef} className="w-full pl-4 flex items-center">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Cari di Pedagang"
            onChange={(e) => {
              setSearchIsActive(true);
              setSearch(e.target.value);
            }}
            className="w-full text-xl outline-none"
          />
          {searchIsActive &&
            searchResult &&
            (searchResult.length > 0 ? (
              <div
                className={`-ml-4 absolute min-h-[200px] overflow-y-scroll max-h-[calc(80vh-30px)] bg-white translate-y-[calc(50%+25px)] w-[${searchRef.current.offsetWidth}px] z-10`}
              >
                <div className="flex items-end  w-full px-4 text-2xl border-b-4 h-20 align-text-bottom">
                  <div className="mb-3">Products</div>
                </div>
                {searchResult.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleLink(result.title, result.id)}
                    className="flex border-b-[1px]"
                  >
                    <img src={result.image} className="size-16 p-2"></img>
                    <div className="px-4  flex flex-col justify-center">
                      <p className=" line-clamp-1 text-blue-600 hover:cursor-pointer">
                        {result.title}
                      </p>
                      <p className=" font-semibold">
                        {new Intl.NumberFormat("id", {
                          currency: "idr",
                          style: "currency",
                        }).format(result.price * 10000)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`-ml-4 absolute min-h-[200px] bg-white translate-y-[calc(50%+25px)] w-[${searchRef.current.offsetWidth}px] z-10`}
              >
                <div className="flex items-end  w-full px-4 text-2xl border-b-4 h-20 align-text-bottom">
                  <div className="mb-3">No Result</div>
                </div>
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
