/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWindow from "../atoms/ModalWindow";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import UniqueInput from "./UniqueInput";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import {
  getCustomerAddress,
  patchSelectedAddress,
  postCustomerAddress,
} from "../../services/address.service";

function AddressModal({ address, setAddress }) {
  const [activeAddressInput, setActiveAddressInput] = useState(false);
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalToggle());
    dispatch(modalChange({ type: null, content: null }));
  };
  const handleActiveAddressInput = () => {
    setActiveAddressInput(!activeAddressInput);
  };
  const handleAddAddress = () => {
    const recipient = recipientRef.current.value;
    const address_line = addressLineRef.current.value;
    const city = cityRef.current.value;
    const region = provinceRef.current.value;
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
      };
      postCustomerAddress(data)
        .then(() => getCustomerAddress())
        .then((res) => setAddress(res.data))
        .then(() => setActiveAddressInput(!activeAddressInput));
    } else {
      alert("All field must be filled");
    }
  };
  const handleSelectAddress = (addressId) => {
    patchSelectedAddress(addressId)
      .then(() => getCustomerAddress())
      .then((res) => {
        closeModalHandler();
        setAddress(res.data);
      });
  };
  console.log(address);
  const recipientRef = useRef();
  const addressLineRef = useRef();
  const cityRef = useRef();
  const provinceRef = useRef();
  const postalRef = useRef();
  return (
    <ModalWindow>
      <div className="w-[800px] h-[90vh] max-h-[90vh]">
        <div className="py-4 border-b-2">
          <div className="relative">
            <h1 className="text-center text-2xl font-medium">
              List of Address
            </h1>
            <button
              onClick={closeModalHandler}
              className="absolute right-4 top-0"
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="px-4 mt-4">
          <button
            className={
              (activeAddressInput
                ? "border-red-600 border-opacity-50 bg-red-500 hover:bg-red-400"
                : `border-blue-600 border-opacity-50 bg-blue-500 hover:bg-blue-400`) +
              ` w-full py-2 rounded-md text-xl border-[1px]  transition-colors duration-100 text-white font-medium`
            }
            onClick={handleActiveAddressInput}
          >
            {activeAddressInput ? "Cancel" : "Add Address"}
          </button>
        </div>
        {activeAddressInput && (
          <>
            <div className="p-4 ">
              <div className="max-h-[65vh] overflow-y-auto">
                <h1 className="text-xl font-medium">Address Details Input</h1>
                <UniqueInput
                  placeholder={"Recipient Name"}
                  inputType={"text"}
                  maxLength={30}
                  inputRef={recipientRef}
                />
                <UniqueInput
                  placeholder={"Address Line"}
                  inputType={"textarea"}
                  maxLength={255}
                  inputRef={addressLineRef}
                />
                <UniqueInput
                  placeholder={"City"}
                  inputType={"text"}
                  maxLength={30}
                  inputRef={cityRef}
                />
                <UniqueInput
                  placeholder={"Province"}
                  inputType={"text"}
                  maxLength={30}
                  inputRef={provinceRef}
                />
                <UniqueInput
                  placeholder={"Postal Code"}
                  inputType={"text"}
                  maxLength={15}
                  inputRef={postalRef}
                />
                <button
                  onClick={handleAddAddress}
                  className="w-full mt-6 py-2 rounded-md text-xl border-[1px] border-blue-600 border-opacity-50 bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
        {!activeAddressInput && (
          <div className="px-4 pb-6 mt-4">
            <div className="max-h-[65vh] overflow-y-auto space-y-2 ">
              {address.map((val) => (
                <div
                  key={"address-" + val.id}
                  className={
                    (val.selected === 1 ? "bg-blue-100" : "") +
                    ` rounded-lg border-[1px] border-opacity-50 border-blue-600 p-4 relative shadow-[0_0_2px_1px_rgba(0,0,0,0.1)] `
                  }
                >
                  <div className="absolute right-4 top-0 h-full flex items-center">
                    {val.selected === 1 ? (
                      <FontAwesomeIcon
                        className="text-3xl text-gray-500"
                        icon={faCheck}
                      />
                    ) : (
                      <button
                        onClick={() => handleSelectAddress(val.id)}
                        className="py-1 px-6 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white"
                      >
                        Select
                      </button>
                    )}
                  </div>
                  <h3 className="mb-2">{val.recipient}</h3>
                  <p>
                    {val.address_line} , {val.city}, {val.region}. Postal Code:{" "}
                    {val.postal_code}
                  </p>
                  <div className="mt-4 space-x-8">
                    <span className="text-blue-500 hover:cursor-pointer">
                      Edit
                    </span>
                    <span className="text-red-500 hover:cursor-pointer">
                      Delete
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalWindow>
  );
}

export default AddressModal;
