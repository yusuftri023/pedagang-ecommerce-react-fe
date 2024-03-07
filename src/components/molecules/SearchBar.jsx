import { useEffect, useState } from "react";
import IconSearch from "../../assets/images/landing-page/icon _magnifying glass_.svg";
import axios from "axios";

function SearchBar() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => setCategory(() => [...res.data]));
  }, []);
  category[1];
  return (
    <div className="w-full mx-10 bg-white rounded-xl overflow-hidden">
      <div className="flex">
        <select
          name=""
          id="kategori-option"
          className="border-r-4 border-[#1d1dcd]"
        >
          <option value="all">Semua Kategori</option>
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
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Cari di Pedagang"
          className="w-full pl-4 text-xl outline-none"
        />
        <button className="h-full w-20 bg-[#FFCA1D] p-2 rounded-xl transition-colors duration-300 hover:cursor-pointer hover:bg-yellow-300 ">
          <img src={IconSearch} alt="search button" className="mx-auto" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
