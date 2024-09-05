/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import BriefPopUp from "../../components/atoms/BriefPopUp";
import MainLayouts from "../../layouts/MainLayouts";
import ImageKit from "../../components/molecules/ImageKit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCustomerProfile } from "../../services/customer.service";
import ProfileContent from "../../components/molecules/ProfileContent";
import ProfileChangeModal from "../../components/molecules/ProfileChangeModal";
import BriefPopUpContent from "../../components/molecules/BriefPopUpContent";

function UserSetting() {
  const [userProfile, setUserProfile] = useState(null);
  const showModal = useSelector((state) => state.webContent.showModal);
  const typeModal = useSelector((state) => state.webContent.typeModal);
  const contentModal = useSelector((state) => state.webContent.contentModal);
  const showPopUp = useSelector((state) => state.webContent.showPopUp);
  const typePopUp = useSelector((state) => state.webContent.typePopUp);
  const handleSetUserProfile = () => {
    getCustomerProfile().then(({ data }) => {
      setUserProfile(data);
    });
  };

  const profileContent = userProfile
    ? [
        { name: "Username", value: userProfile.username },
        { name: "Email", value: userProfile.email },
        { name: "Phone Number", value: userProfile.phone_number },
        { name: "Password", value: null },
      ]
    : null;

  useEffect(() => {
    handleSetUserProfile();
  }, []);

  return (
    <>
      <MainLayouts>
        {showModal && typeModal === "changeProfile" && (
          <ProfileChangeModal
            content={contentModal}
            oldValue={userProfile}
            onUpdateValue={handleSetUserProfile}
          />
        )}
        {showPopUp && typePopUp === "profileChanged" && (
          <BriefPopUp>
            <BriefPopUpContent text={"Profile has been changed"} />
          </BriefPopUp>
        )}
        <div className="my-10 border-y-4 border-gray-700 py-4 text-center">
          <FontAwesomeIcon icon={faWrench} className="size-12 " />
          <h1 className=" text-[30px] font-bold">User Settings</h1>
        </div>

        <section className="mx-auto mb-20 flex max-w-[1000px] flex-row bg-white p-4 shadow-gray-500  drop-shadow-md ">
          <div className="w-full">
            <div className="p-4">
              <h1 className="text-3xl font-medium">Profile</h1>
              <div className="mt-8 space-y-6">
                {profileContent?.map((item, index) => (
                  <ProfileContent
                    key={"profile-content-" + index}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mx-10 mt-10">
            <ImageKit
              currentImage={userProfile?.picture}
              onUpdateValue={handleSetUserProfile}
            />
          </div>
        </section>
      </MainLayouts>
    </>
  );
}

export default UserSetting;
