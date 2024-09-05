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
      <div className="w-[400px] px-4 py-4">
        <div className="flex justify-between">
          <p>Item successfully added to Cart</p>
          <button
            onClick={closeModalHandler}
            className="size-8 rounded-md text-lg font-bold active:border-2"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="my-2">
          <img src={contentModal.image} className="mx-auto size-[200px]"></img>
          <p className="text-center">{contentModal.title}</p>
          <p className="text-center font-semibold">
            {formatRupiah(contentModal.price)}
          </p>
        </div>
        <div className="my-2 mt-4">
          <button
            onClick={navigateModalToCart}
            className="h-12 w-full border-2 border-green-500 bg-green-600 text-white"
          >
            View Your Cart
          </button>
        </div>
        <div>
          <button onClick={closeModalHandler} className="h-12 w-full border-2">
            Continue Shopping
          </button>
        </div>
      </div>
    </ModalWindow>
  );
}

export default AddToCartModal;
