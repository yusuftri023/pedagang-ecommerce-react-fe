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
          <div className="px-4 pb-6 mt-4">
            <div className="max-h-[65vh] overflow-y-auto space-y-2 ">
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
