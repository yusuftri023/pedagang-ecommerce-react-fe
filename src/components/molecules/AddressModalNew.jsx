/* eslint-disable react/prop-types */
import { useRef } from "react";
import InputText from "./InputText";
import {
  getCustomerAddress,
  postCustomerAddress,
} from "../../services/address.service";
import InputTextCityProvince from "./InputTextCity";

function AddressModalNew({
  setAddress,
  setActiveAddressInput,
  activeAddressInput,
}) {
  const recipientRef = useRef();
  const addressLineRef = useRef();

  const provinceAndCityRef = useRef(null);
  const postalRef = useRef();

  const handleAddAddress = () => {
    const recipient = recipientRef.current.value;
    const address_line = addressLineRef.current.value;
    const city = provinceAndCityRef.current.cityValue();
    const region = provinceAndCityRef.current.provinceValue();
    const postal_code = postalRef.current.value;

    if (
      recipient.length > 0 &&
      address_line.length > 0 &&
      city.length > 0 &&
      region.length > 0 &&
      postal_code.length > 0
    ) {
      const data = {
        recipient,
        address_line,
        city,
        region,
        postal_code,
        destination_id: provinceAndCityRef.current.destinationId(),
      };

      postCustomerAddress(data)
        .then(() => getCustomerAddress())
        .then((res) => setAddress(res.data))
        .then(() => setActiveAddressInput(!activeAddressInput));
    } else {
      alert("All field must be filled");
    }
  };

  return (
    <div className="p-4 ">
      <div className="max-h-[65vh] overflow-y-auto">
        <h1 className="text-xl font-medium">Address Details Input</h1>
        <InputText
          type={"text"}
          placeholder={"Recipient Name"}
          maxLength={20}
          ref={recipientRef}
        />
        <InputTextCityProvince ref={provinceAndCityRef} />
        <InputText
          inputType={"textarea"}
          placeholder={"Address Line"}
          maxLength={255}
          ref={addressLineRef}
        />
        <InputText
          inputType={"text"}
          placeholder={"Postal Code"}
          maxLength={15}
          ref={postalRef}
        />
        <button
          onClick={handleAddAddress}
          className="mt-6 w-full rounded-md border-[1px] border-blue-600 border-opacity-50 bg-blue-500 py-2 text-xl font-medium text-white transition-colors duration-100 hover:bg-blue-400"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default AddressModalNew;
