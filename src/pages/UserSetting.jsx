import { useDispatch, useSelector } from "react-redux";
import BriefPopUp from "../components/atoms/BriefPopUp";
import MainLayouts from "../layouts/MainLayouts";
import { popUpChange, popUpToggle } from "../store/reducers/webContentSlicer";
import ImageKit from "../components/molecules/ImageKit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCustomerProfile } from "../services/customer.service";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons/faGreaterThan";

function UserSetting() {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);

  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);
  const closePopUpHandler = () => {
    dispatch(popUpToggle());
    dispatch(popUpChange({ type: null }));
  };

  let profileContent;
  if (userProfile) {
    profileContent = [
      ["Username", userProfile.username],
      ["Email", userProfile.email],
      ["Phone Number", userProfile.phone_number],
    ];
  }
  useEffect(() => {
    getCustomerProfile().then(({ data }) => {
      setUserProfile(data);
    });
  }, []);

  return (
    <>
      {showModal && typeModal === "addedToCart" ? <></> : <></>}
      {showPopUp && typePopUp === "deleteFromWishlist" ? (
        <BriefPopUp>
          <span>Product deleted from wishlist</span>
          <span onClick={closePopUpHandler} className=" hover:cursor-pointer">
            Ok
          </span>
        </BriefPopUp>
      ) : (
        <></>
      )}
      <MainLayouts>
        <div className="my-10 text-center   border-y-4 border-gray-700 py-4">
          <FontAwesomeIcon icon={faWrench} className="size-12 " />
          <h1 className=" text-[30px] font-bold">User Settings</h1>
        </div>

        <section className="mx-auto max-w-[1000px] flex flex-row bg-white p-4 mb-20">
          <div className="w-full">
            <div className="p-4">
              <h1 className="text-3xl font-medium">Profile</h1>
              <div className="mt-8 space-y-6">
                {profileContent?.map((item, index) => (
                  <div
                    key={"profile-content-" + index}
                    className="flex justify-between group items-center hover:cursor-pointer"
                  >
                    <span>{item?.[0]}</span>
                    <div className="flex items-center space-x-2">
                      <span>{item?.[1]}</span>
                      <button className="text-2xl rounded-full group-hover:bg-gray-400 group-hover:bg-opacity-50 size-12 text-center">
                        <FontAwesomeIcon icon={faGreaterThan} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between group items-center hover:cursor-pointer">
                  <div>Change Password</div>
                  <button className="text-2xl rounded-full group-hover:bg-gray-400 group-hover:bg-opacity-50 size-12 text-center">
                    <FontAwesomeIcon icon={faGreaterThan} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-10 mt-10">
            <ImageKit></ImageKit>
          </div>
        </section>
      </MainLayouts>
    </>
  );
}

export default UserSetting;
