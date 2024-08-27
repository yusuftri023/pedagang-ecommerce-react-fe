import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";

/* eslint-disable react/prop-types */
function BriefPopUp({ children }) {
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const dispatch = useDispatch();
  useEffect(() => {
    let popUpTimer = setTimeout(() => {
      dispatch(popUpToggle(false));
      dispatch(popUpChange({ type: null }));
    }, 2000);
    return () => {
      clearTimeout(popUpTimer);
    };
  }, [showPopUp]);

  return (
    <div className=" w-[50vw] p-2 rounded-xl right-[25vw] animate-fade-in-drop  fixed top-[20%] z-10 ">
      {children}
    </div>
  );
}

export default BriefPopUp;
