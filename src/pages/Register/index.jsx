/* eslint-disable react-hooks/exhaustive-deps */
import FormLayouts from "../../layouts/Formlayouts";
import registersvg from "../../assets/register.svg";
// import googleIcon from "../assets/google-icon.svg";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../store/reducers/authenticationSlicer";
import { postWebRegister } from "../../services/auth.service";
import { getUserData } from "../../store/actions/customerAction";
import InputForm from "../../components/atoms/InputForm";

function Register() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authentication.error);
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    if (data.email == "" || data.username == "" || data.password == "") {
      dispatch(setError("Complete your input"));
    } else if (data.username.length < 8) {
      dispatch(setError("Username minimum length is 8"));
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      dispatch(setError("Password should be matched"));
    } else if (passwordRef.current.value.length < 8) {
      dispatch(setError("Password minimum length is 8"));
    } else {
      const responseRegister = await postWebRegister(data);
      if (responseRegister.success) {
        dispatch(setError(null));
        window.location.href = "/login";
      } else {
        dispatch(setError("Your email already exist"));
      }
    }
  };
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => (window.location.href = "/"), 1000);
    }
  }, [isLoggedIn]);
  return (
    <FormLayouts>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" w-[800px]  flex rounded-xl overflow-hidden text-zinc-100 ">
          <div className="w-[50%]  min-h-full flex items-center justify-center bg-blue-100 bg-opacity-50 ">
            <img src={registersvg} className="w-[80%] "></img>
          </div>
          <div className="w-[50%] px-10 py-6 bg-blue-700 bg-opacity-55">
            <h1 className="text-center text-3xl my-5">Sign Up Your Account</h1>
            <form action="" className="">
              <InputForm
                inputType={"text"}
                ref={usernameRef}
                placeholder={"Username"}
                maxLength={50}
              />
              <InputForm
                inputType={"email"}
                ref={emailRef}
                placeholder={"Email"}
                maxLength={50}
              />
              <InputForm
                inputType={"Password"}
                ref={passwordRef}
                placeholder={"Password"}
                maxLength={50}
              />
              <InputForm
                ref={confirmPasswordRef}
                placeholder={"Confirm Password"}
                maxLength={50}
                inputType={"password"}
              />

              <button
                onClick={handleRegister}
                className="flex items-center justify-center py-2 px-4 rounded-lg bg-[#FFCA1D] text-white w-full my-3"
              >
                Signup
              </button>
              <div className="">
                <p className="text-center text-md font-light text-red-500 ">
                  {error}
                </p>
              </div>
              <div className="text-center mt-4 space-x-1">
                <span className="">Already have an account? </span>
                <span
                  onClick={() => (window.location.href = "/login")}
                  className="hover:cursor-pointer"
                >
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormLayouts>
  );
}

export default Register;
