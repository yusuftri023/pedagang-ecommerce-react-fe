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
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" flex  w-[800px] overflow-hidden rounded-xl text-zinc-100 ">
          <div className="flex  min-h-full w-[50%] items-center justify-center bg-blue-100 bg-opacity-50 ">
            <img src={registersvg} className="w-[80%] "></img>
          </div>
          <div className="w-[50%] bg-blue-700 bg-opacity-55 px-10 py-6">
            <h1 className="my-5 text-center text-3xl">Sign Up Your Account</h1>
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
                className="my-3 flex w-full items-center justify-center rounded-lg bg-[#FFCA1D] px-4 py-2 text-white"
              >
                Signup
              </button>
              <div className="">
                <p className="text-md text-center font-light text-red-500 ">
                  {error}
                </p>
              </div>
              <div className="mt-4 space-x-1 text-center">
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
