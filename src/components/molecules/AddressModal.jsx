/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalWindow from "../atoms/ModalWindow";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import AddressModalNew from "./AddressModalNew";
import AddressListCard from "./AddressListCard";
import AddressModalEdit from "./AddressModalEdit";

function AddressModal({ address, setAddress }) {
  const [activeAddressInput, setActiveAddressInput] = useState(false);
  const [inputType, setInputType] = useState("");
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(null);
  const closeModalHandler = () => {
    dispatch(modalToggle());
    dispatch(modalChange({ type: null, content: null }));
  };
  const handleActiveAddressInput = () => {
    setActiveAddressInput(!activeAddressInput);
    setInputType("new");
  };
  useEffect(() => {
    if (address === null) {
      setActiveAddressInput(true);
      setInputType("new");
    }
  }, []);
  return (
    <ModalWindow>
      <div className="h-[90vh] max-h-[90vh] w-[800px]">
        <div className="border-b-2 py-4">
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
        <div className="mt-4 px-4">
          <button
            className={
              (activeAddressInput
                ? "border-red-600 border-opacity-50 bg-red-500 hover:bg-red-400"
                : `border-blue-600 border-opacity-50 bg-blue-500 hover:bg-blue-400`) +
              ` w-full rounded-md border-[1px] py-2 text-xl  font-medium text-white transition-colors duration-100`
            }
            onClick={handleActiveAddressInput}
          >
            {activeAddressInput ? "Cancel" : "Add Address"}
          </button>
        </div>
        {activeAddressInput && inputType === "new" && (
          <>
            <AddressModalNew
              setAddress={setAddress}
              setActiveAddressInput={setActiveAddressInput}
              activeAddressInput={activeAddressInput}
            />
          </>
        )}
        {activeAddressInput && inputType === "edit" && (
          <>
            <AddressModalEdit
              setAddress={setAddress}
              setActiveAddressInput={setActiveAddressInput}
              activeAddressInput={activeAddressInput}
              editAddress={editAddress}
            />
          </>
        )}
        {!activeAddressInput && (
          <div className="mt-4 px-4 pb-6">
            <div className="max-h-[65vh] space-y-2 overflow-y-auto ">
              {address?.map((val) => (
                <AddressListCard
                  key={"address-" + val.id}
                  address={val}
                  setAddress={setAddress}
                  setInputType={setInputType}
                  setEditAddress={setEditAddress}
                  setActiveAddressInput={setActiveAddressInput}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalWindow>
  );
}

export default AddressModal;
