/* eslint-disable react/prop-types */
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  deleteCustomerAddress,
  getCustomerAddress,
  patchSelectedAddress,
} from "../../services/address.service";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";

function AddressListCard({
  address,
  setAddress,
  setInputType,
  setEditAddress,
  setActiveAddressInput,
}) {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(modalToggle());
    dispatch(modalChange({ type: null, content: null }));
  };
  const handleSelectAddress = (addressId) => {
    patchSelectedAddress(addressId)
      .then(() => getCustomerAddress())
      .then((res) => {
        closeModalHandler();
        setAddress(res.data);
      });
  };
  const handleEditAddress = (address) => {
    setInputType("edit");
    setEditAddress(address);
    setActiveAddressInput((prev) => !prev);
  };
  const handleDeleteAddress = (addressId) => {
    deleteCustomerAddress(addressId)
      .then(() => getCustomerAddress())
      .then((res) => {
        closeModalHandler();
        setAddress(res.data);
      });
  };
  return (
    <div
      key={"address-" + address.id}
      className={
        (address.selected === 1 ? "bg-blue-100" : "") +
        ` rounded-lg border-[1px] border-opacity-50 border-blue-600 p-4 relative shadow-[0_0_2px_1px_rgba(0,0,0,0.1)] flex justify-between`
      }
    >
      <div>
        <h3 className="mb-2">{address.recipient}</h3>

        <p className=" break-words">
          {address.address_line} , {address.city}, {address.region}. Postal
          Code: {address.postal_code}
        </p>

        <div className="mt-4 space-x-8">
          <span
            onClick={() => handleEditAddress(address)}
            className="text-blue-500 hover:cursor-pointer"
          >
            Edit
          </span>
          {address.selected === 0 && (
            <span
              onClick={() => handleDeleteAddress(address.id)}
              className="text-red-500 hover:cursor-pointer"
            >
              Delete
            </span>
          )}
        </div>
      </div>
      <div className="flex  items-center">
        {address.selected === 1 ? (
          <div className="min-w-[85px] text-center">
            <FontAwesomeIcon
              className="text-3xl text-gray-500"
              icon={faCheck}
            />
          </div>
        ) : (
          <button
            onClick={() => handleSelectAddress(address.id)}
            className="py-1 px-6 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-400 transition-colors duration-100 text-white"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
}

export default AddressListCard;
