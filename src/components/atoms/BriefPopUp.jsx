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
    <div className=" fixed right-[25vw] top-[20%] z-10 w-[50vw]  animate-fade-in-drop rounded-xl p-2 ">
      {children}
    </div>
  );
}

export default BriefPopUp;
