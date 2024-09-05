/* eslint-disable react/prop-types */
import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShiningEffect from "../atoms/ShiningEffect";
import useHover from "../../hooks/useHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { updateCustomerProfilePic } from "../../services/customer.service";
import {
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";

const publicKey = "public_omYOHHks28WDo//7DNptNtTY1Mk=";
const urlEndpoint = "https://ik.imagekit.io/neuros123/binar-academy";
const authenticator = async () => {
  try {
    const response = await axios.get(
      "https://api.pedagang-ecommerce.site/public/image-kit/token",
      { withCredentials: true },
    );

    const data = response.data.data;
    return data;
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
function ImageKit({ currentImage, onUpdateValue }) {
  const ikUploadRef = useRef(null);
  const loggedInUserData = useSelector(
    (state) => state.authentication.loggedInUserData,
  );
  const imageRef = useRef(null);
  const isHover = useHover(imageRef);
  const dispatch = useDispatch();
  const handleChangeImage = () => {
    ikUploadRef.current.click();
  };
  const handleForwardImageUrl = (result) => {
    updateCustomerProfilePic({ url: result.url }).then(() => {
      onUpdateValue();
      dispatch(popUpToggle(true));
      dispatch(popUpChange({ type: "profileChanged" }));
    });
  };
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        onError={(error) => console.log(error)}
        onSuccess={handleForwardImageUrl}
        ref={ikUploadRef}
        fileName={`${loggedInUserData?.username}.jpg`}
        folder={`/Ecommerce-Pedagang/profile-picture`}
        overwriteFile={true}
        overwriteAITags={true}
        overwriteTags={true}
        transformation={{ pre: "w_100" }}
        style={{ display: "none" }}
      />
      <div
        ref={imageRef}
        onClick={handleChangeImage}
        className="relative size-[300px] overflow-hidden rounded-full hover:cursor-pointer"
      >
        {isHover && (
          <div className="absolute left-0 top-0 h-full w-full items-center justify-center bg-black bg-opacity-0 text-zinc-200 transition-opacity duration-100 hover:flex hover:flex-col hover:bg-opacity-30">
            <FontAwesomeIcon size="4x" icon={faCamera} />
            <div>Change Image</div>
          </div>
        )}
        {currentImage ? (
          <>
            <img
              className="size-full object-cover"
              src={currentImage}
              alt="profile-pic"
            />
          </>
        ) : (
          <ShiningEffect />
        )}
      </div>
    </IKContext>
  );
}

export default ImageKit;
