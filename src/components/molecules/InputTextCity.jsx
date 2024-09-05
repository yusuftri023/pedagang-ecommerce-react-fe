import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  rajaOngkirCity,
  rajaOngkirProvince,
} from "../../services/shipment.service";

function RefComponent(_props, ref) {
  const [currentProvinceInput, setCurrentProvinceInput] = useState("");
  const [currentCityInput, setCurrentCityInput] = useState({
    value: "",
    destination_id: null,
  });
  const [province, setProvince] = useState(null);
  const [provinceActive, setProvinceActive] = useState(false);
  const [city, setCity] = useState(null);
  const [cityActive, setCityActive] = useState(false);
  const [isProvinceValid, setIsProvinceValid] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);

  const filteredProvince = province?.filter((val) =>
    val.province.match(new RegExp(currentProvinceInput, "i")),
  );
  const filteredCity = city?.filter((val) =>
    `${val.type} ${val.city_name}`.match(
      new RegExp(currentCityInput.value, "i"),
    ),
  );
  useImperativeHandle(ref, () => ({
    provinceValue() {
      return currentProvinceInput;
    },
    cityValue() {
      return currentCityInput.value;
    },
    destinationId() {
      return currentCityInput.destination_id;
    },
    isProvinceValid() {
      return isProvinceValid;
    },
    isCityValid() {
      return isCityValid;
    },
  }));

  const handleProvinceChange = (e) => {
    setProvinceActive(true);
    setIsProvinceValid(false);
    setCurrentProvinceInput(e.target.value);
  };
  const handleCityChange = (e) => {
    setCityActive(true);
    setIsCityValid(false);
    setCurrentCityInput((prev) => ({ ...prev, value: e.target.value }));
  };

  useEffect(() => {
    if (isProvinceValid) {
      const selectedProvince = province.find((val) => {
        if (val.province === currentProvinceInput) return true;
        else return false;
      });
      rajaOngkirCity(selectedProvince.province_id).then((res) => {
        setCity(res.data);
      });
    }
  }, [isProvinceValid]);
  useEffect(() => {
    rajaOngkirProvince().then((res) => setProvince(res.data));
  }, []);
  return (
    <>
      <div className="group relative">
        <div
          className={
            (currentProvinceInput?.length > 0
              ? "z-0 ml-1 translate-y-0 bg-white px-1 text-sm"
              : "-z-10 ml-4 translate-y-full") +
            ` absolute top-0  font-medium text-gray-500 transition-all duration-100 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-sm `
          }
        >
          Province
        </div>
        <label htmlFor={"province"}> </label>
        <input
          id={"province"}
          name={"province"}
          className={`mt-4 w-full rounded-md border-[1px] border-gray-300 bg-transparent p-2 outline-none `}
          onChange={handleProvinceChange}
          type={"text"}
          maxLength={30}
          value={currentProvinceInput}
        />
        {provinceActive && (
          <div className="absolute z-20 max-h-[100px] w-full overflow-y-auto rounded-b-md border-x-[2px] border-b-[2px] bg-white  px-4 pb-2">
            {filteredProvince?.map((val) => (
              <div
                key={val.province + val.province_id}
                className="hover:cursor-pointer"
                onClick={() => {
                  setCurrentProvinceInput(val.province);
                  setIsProvinceValid(true);
                  setProvinceActive(false);
                  setCurrentCityInput((prev) => ({
                    ...prev,
                    value: "",
                  }));
                  setIsCityValid(false);
                }}
              >
                {val.province}
              </div>
            ))}
            {filteredProvince?.length === 0 && (
              <div className="w-full py-4 text-center text-lg font-medium">
                No Data
              </div>
            )}
          </div>
        )}
      </div>
      <div className="group relative">
        <div
          className={
            (currentCityInput.value?.length > 0
              ? "z-0 ml-1 translate-y-0 bg-white px-1 text-sm"
              : "-z-10 ml-4 translate-y-full") +
            ` absolute top-0  font-medium text-gray-500 transition-all duration-100 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:text-sm `
          }
        >
          City
        </div>
        <label htmlFor={"city"}> </label>
        <input
          id={"city"}
          name={"city"}
          className={`mt-4 w-full rounded-md border-[1px] border-gray-300 bg-transparent p-2 outline-none `}
          onChange={handleCityChange}
          type={"text"}
          value={currentCityInput.value}
          maxLength={30}
        />
        {cityActive && (
          <div className="absolute z-20 max-h-[100px] w-full overflow-y-auto rounded-b-md border-x-[2px] border-b-[2px] bg-white px-4 pb-2">
            {filteredCity?.map((val, i) => (
              <div
                key={val.city_name + val.city_id + i}
                className="flex justify-between hover:cursor-pointer"
                onClick={() => {
                  setCurrentCityInput({
                    destination_id: val.city_id,
                    value: `${val.type} ${val.city_name}`,
                  });
                  setIsCityValid(true);
                  setCityActive(false);
                }}
              >
                <span> {val.type + " " + val.city_name}</span>
                <span className="">{"Kode Pos: " + val.postal_code}</span>
              </div>
            ))}
            {filteredCity?.length === 0 && (
              <div className="w-full py-4 text-center text-lg font-medium">
                No Data
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
const InputTextCityProvince = forwardRef(RefComponent);

export default InputTextCityProvince;
