import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "../atoms/ModalWindow";
import {
  modalChange,
  modalToggle,
} from "../../store/reducers/webContentSlicer";
import { formatRupiah } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AddToCartModal() {
  const dispatch = useDispatch();
  const contentModal = useSelector((state) => state.webContent.contentModal);

  const closeModalHandler = () => {
    dispatch(modalToggle());
    dispatch(modalChange({ type: null, content: null }));
  };
  const navigateModalToCart = () => {
    dispatch(modalChange({ type: null, content: null }));
    dispatch(modalToggle());
    window.location.href = "/cart";
  };
  return (
    <ModalWindow>
      <div className="w-[400px] py-4 px-4">
        <div className="flex justify-between">
          <p>Item successfully added to Cart</p>
          <button
            onClick={closeModalHandler}
            className="size-8 text-lg font-bold active:border-2 rounded-md"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="my-2">
          <img src={contentModal.image} className="size-[200px] mx-auto"></img>
          <p className="text-center">{contentModal.title}</p>
          <p className="text-center font-semibold">
            {formatRupiah(contentModal.price)}
          </p>
        </div>
        <div className="my-2 mt-4">
          <button
            onClick={navigateModalToCart}
            className="w-full h-12 bg-green-600 border-2 border-green-500 text-white"
          >
            View Your Cart
          </button>
        </div>
        <div>
          <button onClick={closeModalHandler} className="w-full h-12 border-2">
            Continue Shopping
          </button>
        </div>
      </div>
    </ModalWindow>
  );
}

export default AddToCartModal;
