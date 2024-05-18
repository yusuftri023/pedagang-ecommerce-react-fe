import { useNavigate } from "react-router-dom";
import FormLayouts from "../layouts/Formlayouts";
import registersvg from "../assets/register.svg";
// import googleIcon from "../assets/google-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { setError } from "../store/reducers/authenticationSlicer";
import googleIcon from "../assets/images/landing-page/logo_google_g_icon.svg";
import { getGoogleSignIn, webSignIn } from "../services/auth.service";
function LoginPage() {
  const navigate = useNavigate();
  const password = useRef();
  const email = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authentication.error);
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      password: password.current.value,
      email: email.current.value,
    };

    const response = await webSignIn(data);

    if (data.email == "" || data.password == "") {
      dispatch(setError("Lengkapi input terlebih dahulu"));
    } else if (response.success) {
      dispatch(setError(null));
      navigate("/");
    } else {
      dispatch(setError("Email or password is incorrect"));
    }
  };
  const googleHandle = async () => {
    const response = await getGoogleSignIn();
    console.log(response);
    window.location.href = response.url;
  };
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
                <div className="">
                  <p className="pl-4 ">Email</p>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    className="w-full pl-4 rounded-md py-1 text-black"
                    placeholder="Enter your email"
                    ref={email}
                    onClick={() => dispatch(setError(null))}
                    required
                  />
                </div>

                <div className="">
                  <p className="pl-4 ">Password</p>
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    className="w-full pl-4 rounded-md py-1 text-black"
                    placeholder="Enter Your Password"
                    ref={password}
                    onClick={() => dispatch(setError(null))}
                    required
                  />
                </div>

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

              {/* <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-gray-700 text-white w-full">
                  <img src={googleIcon} className="size-7 mr-4"></img>
                  Or Sign In with Google
                </button> */}

              <div className="text-center mt-4 space-x-1">
                <span className="">Do not have an account? </span>
                <span
                  onClick={() => navigate("/register")}
                  className="hover:cursor-pointer"
                >
                  Signup
                </span>
              </div>
              <div
                className="flex items-center justify-center py-1 px-4 rounded-lg bg-[#444342] text-white w-full mt-10 hover:cursor-pointer"
                onClick={googleHandle}
              >
                <img src={googleIcon} className=" h-8" />
                Login with Google
              </div>
            </div>
          </div>
        </div>
      </FormLayouts>
    </>
  );
}

export default LoginPage;
