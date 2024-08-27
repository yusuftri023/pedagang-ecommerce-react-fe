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
    <div className="flex justify-between w-[50vw] size-full bg-black bg-opacity-80 text-zinc-100 font-medium rounded-full py-2 px-4">
      <span>{text}</span>
      <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
        Ok
      </span>
    </div>
  );
}

export default BriefPopUpContent;
