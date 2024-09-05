/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";

function BriefPopUpContent({ text }) {
  const dispatch = useDispatch();
  const closePopUpHandler = () => {
    dispatch(popUpToggle(false));
    dispatch(popUpChange({ type: null }));
  };
  return (
    <div className="flex size-full w-[50vw] justify-between rounded-full bg-black bg-opacity-80 px-4 py-2 font-medium text-zinc-100">
      <span>{text}</span>
      <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
        Ok
      </span>
    </div>
  );
}

export default BriefPopUpContent;
