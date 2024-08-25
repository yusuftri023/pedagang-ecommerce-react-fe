/* eslint-disable react/prop-types */
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";

function ProfileContent({ item }) {
  const dispatch = useDispatch();
  const handleChangeContent = () => {
    dispatch(modalToggle(true));
    dispatch(modalChange({ type: "changeProfile", content: item }));
  };
  return (
    <div
      onClick={handleChangeContent}
      className="flex justify-between group items-center hover:cursor-pointer"
    >
      <span>{item.name}</span>
      <div className="flex items-center space-x-2">
        <span>{item.value}</span>
        <button className="text-2xl rounded-full group-hover:bg-gray-400 group-hover:bg-opacity-50 size-12 text-center">
          <FontAwesomeIcon icon={faGreaterThan} />
        </button>
      </div>
    </div>
  );
}

export default ProfileContent;
