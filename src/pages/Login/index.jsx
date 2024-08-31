/* eslint-disable react-hooks/exhaustive-deps */
import FormLayouts from "../../layouts/Formlayouts";
import registersvg from "../../assets/register.svg";
// import googleIcon from "../assets/google-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setError } from "../../store/reducers/authenticationSlicer";
import googleIcon from "../../assets/images/landing-page/logo_google_g_icon.svg";
import { getGoogleSignIn, postWebSignIn } from "../../services/auth.service";
import { getUserData } from "../../store/actions/customerAction";
import InputForm from "../../components/atoms/InputForm";
function Login() {
  const passwordRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authentication.error);
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      password: passwordRef.current.value,
      email: emailRef.current.value,
    };

    const response = await postWebSignIn(data);

    if (data.email == "" || data.password == "") {
      dispatch(setError("Lengkapi input terlebih dahulu"));
    } else if (response.success) {
      dispatch(setError(null));
      window.location.href = "/";
    } else {
      dispatch(setError("Email or password is incorrect"));
    }
  };
  const googleHandle = async () => {
    const response = await getGoogleSignIn();
    window.location.href = response.url;
  };

  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => (window.location.href = "/"), 1000);
    }
  }, [isLoggedIn]);
  return (
    <>
      <FormLayouts>
        <div className="pt-16">
          <div className="w-[800px] h-[500px] mx-auto flex rounded-xl overflow-hidden text-zinc-100 ">
            <div className="w-[50%] h-full flex items-center justify-center bg-blue-100 bg-opacity-50 ">
              <img src={registersvg} className="w-[80%] "></img>
            </div>
            <div className="w-[50%] px-10 py-2 bg-blue-700 bg-opacity-55">
              <h1 className="text-center text-3xl my-5">
                Sign In To Your Account
              </h1>
              <form action="" className="">
                <InputForm
                  placeholder={"Email"}
                  ref={emailRef}
                  inputType={"email"}
                  maxLength={50}
                />
                <InputForm
                  placeholder={"Password"}
                  ref={passwordRef}
                  inputType={"password"}
                  maxLength={50}
                />

                <button
                  onClick={handleLogin}
                  className="flex items-center justify-center py-2 px-4 rounded-lg bg-[#FFCA1D] text-white w-full my-3"
                >
                  Sign In
                </button>
                {error && (
                  <div>
                    <p className="text-center text-md font-light text-red-500 ">
                      {error}
                    </p>
                  </div>
                )}
              </form>

              <div className="text-center mt-4 space-x-1">
                <span className="">Do not have an account? </span>
                <span
                  onClick={() => (window.location.href = "/register")}
                  className="hover:cursor-pointer"
                >
                  Signup
                </span>
              </div>

              <div
                className="flex items-center justify-center py-2 px-4 mt-10 rounded-lg bg-gray-700 text-white w-full transition-colors duration-150 hover:cursor-pointer hover:bg-gray-500"
                onClick={googleHandle}
              >
                <img src={googleIcon} className=" size-7 mr-4" />
                Signin with Google
              </div>
            </div>
          </div>
        </div>
      </FormLayouts>
    </>
  );
}

export default Login;
