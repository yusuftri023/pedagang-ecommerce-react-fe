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
            <div className=" bg-white -translate-x-1/2 translate-y-1/2 rounded-xl w-fit">
              <div>{children}</div>
            </div>
            <div
              className=" fixed top-0 left-0 bg-black w-full h-full -z-10 opacity-10 "
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
