/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { modalToggle } from "../../store/reducers/webContentSlicer";

function ModalWindow({ children }) {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.webContent.showModal);

  const modalToggleHandler = () => dispatch(modalToggle());
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed bottom-1/2 right-1/2 z-20 w-0">
            <div className=" w-fit -translate-x-1/2 translate-y-1/2 rounded-xl bg-white">
              <div>{children}</div>
            </div>
            <div
              className=" fixed left-0 top-0 -z-10 h-full w-full bg-black opacity-10 "
              onClick={modalToggleHandler}
            ></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default ModalWindow;
