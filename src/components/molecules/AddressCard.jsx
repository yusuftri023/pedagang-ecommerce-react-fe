import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";

/* eslint-disable react/prop-types */
function AddressCard({ selectedAddress }) {
  const dispatch = useDispatch();
  const handleChangeAddress = () => {
    dispatch(modalToggle(true));
    dispatch(modalChange({ type: "changeAddress" }));
  };
  return (
    <div className="bg-white  shadow-gray-500  drop-shadow-md  w-full ">
      <div className="p-6">
        <h2 className="text-xl font-medium text-gray-600">Shipping Address</h2>
        <h3 className="my-2">{selectedAddress?.recipient}&apos;s Address</h3>
        <p>
          {selectedAddress?.address_line} , {selectedAddress?.city},{" "}
          {selectedAddress?.region}. Postal Code: {selectedAddress?.postal_code}
        </p>
        <button
          onClick={handleChangeAddress}
          className="mt-4 py-2 px-4 text-md border-2 rounded-lg"
        >
          Change Address
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
