import { useNavigate } from "react-router-dom";
import FormLayouts from "../layouts/Formlayouts";
import registersvg from "../assets/register.svg";
// import googleIcon from "../assets/google-icon.svg";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../store/reducers/authenticationSlicer";
import { postWebRegister } from "../services/auth.service";
import { getUserData } from "../store/actions/customerAction";

function RegisterPage() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const email = useRef();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authentication.error);
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
    };

    if (data.email == "" || data.username == "" || data.password == "") {
      dispatch(setError("Complete your input"));
    } else if (data.username.length < 8) {
      dispatch(setError("Username minimum length is 8"));
    } else if (password.current.value !== confirmPassword.current.value) {
      dispatch(setError("Password should be matched"));
    } else if (password.current.value.length < 8) {
      dispatch(setError("Password minimum length is 8"));
    } else {
      const responseRegister = await postWebRegister(data);
      if (responseRegister.success) {
        dispatch(setError(null));
        navigate("/login");
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
      setTimeout(() => navigate("/"), 1000);
    }
  }, [isLoggedIn]);
  return (
    <FormLayouts>
      <div className="pt-16">
        <div className="w-[800px] h-[500px] mx-auto flex rounded-xl overflow-hidden text-zinc-100 ">
          <div className="w-[50%] h-full flex items-center justify-center bg-blue-100 bg-opacity-50 ">
            <img src={registersvg} className="w-[80%] "></img>
          </div>
          <div className="w-[50%] px-10 py-2 bg-blue-700 bg-opacity-55">
            <h1 className="text-center text-3xl my-5">Sign Up Your Account</h1>
            <form action="" className="">
              <div className="">
                <p className="pl-4  ">Username</p>
                <label htmlFor="full_name"></label>
                <input
                  type="text"
                  className="w-full pl-4 rounded-md py-px text-black "
                  placeholder="Enter Your Full Name"
                  ref={username}
                  required
                />
              </div>

              <div className="">
                <p className="pl-4 ">Email</p>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="Enter your active email"
                  ref={email}
                  required
                />
              </div>

              <div className="">
                <p className="pl-4 ">Password</p>
                <label htmlFor="password"></label>
                <input
                  type="password"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="Enter Your Password"
                  ref={password}
                  required
                />
              </div>
              <div className="">
                <p className="pl-4 ">Confirm Password</p>
                <label htmlFor="confirmpassword"></label>
                <input
                  type="password"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="Enter Your Password"
                  ref={confirmPassword}
                  required
                />
              </div>

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
            </form>

            <div className="text-center mt-4 space-x-1">
              <span className="">Already have an account? </span>
              <span
                onClick={() => navigate("/login")}
                className="hover:cursor-pointer"
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormLayouts>
  );
}

export default RegisterPage;
