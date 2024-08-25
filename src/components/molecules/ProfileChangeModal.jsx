/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import ModalWindow from "../atoms/ModalWindow";
import UniqueInput from "./UniqueInput";
import { useDispatch } from "react-redux";
import {
  modalChange,
  modalToggle,
  popUpChange,
  popUpToggle,
} from "../../store/reducers/webContentSlicer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  updateCustomerPassword,
  updateCustomerProfile,
} from "../../services/customer.service";
import { getUserData } from "../../store/actions/customerAction";

function ProfileChangeModal({ content, oldValue, onUpdateValue }) {
  const dispatch = useDispatch();
  let defaultValue = content.value;

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  let placeholder1, placeholder2, placeholder3, inputType, maxLength;
  if (content.name === "Password") {
    placeholder1 = "New Password";
    placeholder2 = "Confirm New Password";
    placeholder3 = "Current Password";
    defaultValue = "";
    inputType = "password";
    maxLength = 100;
  } else if (content.name === "Email") {
    placeholder1 = "New Email";
    inputType = "email";
    maxLength = 50;
  } else if (content.name === "Phone Number") {
    placeholder1 = "New Phone Number";
    inputType = "text";
    maxLength = 20;
  } else if (content.name === "Username") {
    placeholder1 = "New Username";
    inputType = "text";
    maxLength = 20;
  }
  const handleCloseModal = () => {
    dispatch(modalToggle(false));
    dispatch(modalChange({ type: null, content: null }));
  };
  const handleSaveChange = async () => {
    if (content.name === "Password") {
      if (inputRef1.current.value === inputRef2.current.value) {
        const data = {
          current_password: inputRef3.current.value,
          new_password: inputRef1.current.value,
        };
        updateCustomerPassword(data).then(() => {
          dispatch(modalToggle(false));
          dispatch(modalChange({ type: null, content: null }));
          dispatch(popUpChange({ type: "profileChanged" }));
          dispatch(popUpToggle(true));
        });
      } else {
        alert("Passwords do not match");
      }
    } else {
      const data = {
        username:
          content.name === "Username"
            ? inputRef1.current.value
            : oldValue.username,
        email:
          content.name === "Email" ? inputRef1.current.value : oldValue.email,
        phone_number:
          content.name === "Phone Number"
            ? inputRef1.current.value
            : oldValue.phone_number,
      };
      updateCustomerProfile(data).then(() => {
        dispatch(getUserData());
        dispatch(modalToggle(false));
        dispatch(modalChange({ type: null, content: null }));
        dispatch(popUpChange({ type: "profileChanged" }));
        dispatch(popUpToggle(true));
      });
    }
  };
  useEffect(() => {
    return () => {
      onUpdateValue();
    };
  }, []);
  return (
    <ModalWindow>
      <div className="min-w-[500px] ">
        <div className="py-4 border-b-2">
          <div className="relative">
            <h1 className="text-center text-2xl font-medium">
              Change {content.name}
            </h1>
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-0"
            >
              <FontAwesomeIcon className="text-3xl" icon={faXmark} />
            </button>
          </div>
        </div>
        <div className="mx-[10%] mt-6">
          {content.name === "Password" && (
            <UniqueInput
              placeholder={placeholder3}
              inputRef={inputRef3}
              inputType={inputType}
              defaultValue={defaultValue}
              maxLength={maxLength}
            />
          )}
          <UniqueInput
            placeholder={placeholder1}
            inputRef={inputRef1}
            inputType={inputType}
            defaultValue={defaultValue}
            maxLength={maxLength}
          />
          {content.name === "Password" && (
            <>
              <UniqueInput
                placeholder={placeholder2}
                inputRef={inputRef2}
                inputType={inputType}
                defaultValue={defaultValue}
                maxLength={maxLength}
              />
            </>
          )}
          <div className="mt-10 pb-6 flex justify-evenly w-full text-white">
            <button
              onClick={handleSaveChange}
              className="px-6 py-2 rounded-lg bg-green-500"
            >
              Save Change
            </button>
            <button
              onClick={handleCloseModal}
              className="px-6 py-2 rounded-lg bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalWindow>
  );
}

export default ProfileChangeModal;
