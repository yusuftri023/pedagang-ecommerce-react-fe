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
    val.province.match(new RegExp(currentProvinceInput, "i"))
  );
  const filteredCity = city?.filter((val) =>
    `${val.type} ${val.city_name}`.match(
      new RegExp(currentCityInput.value, "i")
    )
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
      <div className="relative group">
        <div
          className={
            (currentProvinceInput?.length > 0
              ? "translate-y-0 bg-white px-1 z-0 text-sm ml-1"
              : "translate-y-full ml-4 -z-10") +
            ` absolute top-0  text-gray-500 font-medium group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:text-sm transition-all duration-100 `
          }
        >
          Province
        </div>
        <label htmlFor={"province"}> </label>
        <input
          id={"province"}
          name={"province"}
          className={`w-full rounded-md border-[1px] border-gray-300 p-2 mt-4 outline-none bg-transparent `}
          onChange={handleProvinceChange}
          type={"text"}
          maxLength={30}
          value={currentProvinceInput}
        />
        {provinceActive && (
          <div className="absolute w-full overflow-y-auto bg-white px-4 pb-2 border-x-[2px] border-b-[2px] rounded-b-md  max-h-[100px] z-20">
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
              <div className="text-center font-medium text-lg w-full py-4">
                No Data
              </div>
            )}
          </div>
        )}
      </div>
      <div className="relative group">
        <div
          className={
            (currentCityInput.value?.length > 0
              ? "translate-y-0 bg-white px-1 z-0 text-sm ml-1"
              : "translate-y-full ml-4 -z-10") +
            ` absolute top-0  text-gray-500 font-medium group-focus-within:translate-y-0 group-focus-within:bg-white group-focus-within:px-1 group-focus-within:z-0 group-focus-within:ml-1 group-focus-within:text-sm transition-all duration-100 `
          }
        >
          City
        </div>
        <label htmlFor={"city"}> </label>
        <input
          id={"city"}
          name={"city"}
          className={`w-full rounded-md border-[1px] border-gray-300 p-2 mt-4 outline-none bg-transparent `}
          onChange={handleCityChange}
          type={"text"}
          value={currentCityInput.value}
          maxLength={30}
        />
        {cityActive && (
          <div className="absolute w-full overflow-y-auto bg-white px-4 pb-2 border-x-[2px] border-b-[2px] rounded-b-md max-h-[100px] z-20">
            {filteredCity?.map((val, i) => (
              <div
                key={val.city_name + val.city_id + i}
                className="hover:cursor-pointer flex justify-between"
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
              <div className="text-center font-medium text-lg w-full py-4">
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
