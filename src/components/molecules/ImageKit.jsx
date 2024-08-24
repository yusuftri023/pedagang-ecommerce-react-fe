import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import ShiningEffect from "../atoms/ShiningEffect";
import useHover from "../../hooks/useHover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const publicKey = "public_omYOHHks28WDo//7DNptNtTY1Mk=";
const urlEndpoint = "https://ik.imagekit.io/neuros123/binar-academy";
const authenticator = async () => {
  try {
    const response = await axios.get(
      "https://api.pedagang-ecommerce.site/public/image-kit/token",
      { withCredentials: true }
    );

    const data = response.data.data;
    return data;
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
function ImageKit() {
  const ikUploadRef = useRef(null);
  const loggedInUserData = useSelector(
    (state) => state.authentication.loggedInUserData
  );
  const imageRef = useRef(null);
  const isHover = useHover(imageRef);
  const handleChangeImage = () => {
    ikUploadRef.current.click();
  };
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        onError={(error) => console.log(error)}
        onSuccess={() => console.log("success")}
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
        className="size-[300px] overflow-hidden rounded-full relative hover:cursor-pointer"
      >
        {isHover && (
          <div className="absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-100 bg-opacity-0 hover:flex-col hover:flex hover:bg-opacity-30 text-zinc-200 justify-center items-center">
            <FontAwesomeIcon size="4x" icon={faCamera} />
            <div>Change Image</div>
          </div>
        )}
        {loggedInUserData?.picture ? (
          <>
            <img
              className=" size-full object-cover"
              src={loggedInUserData?.picture}
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
