import { useNavigate } from "react-router-dom";
import FormLayouts from "../layouts/Formlayouts";
import registersvg from "../assets/register.svg";
import googleIcon from "../assets/google-icon.svg";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, setError } from "../store/reducers/authenticationSlicer";

function RegisterPage() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const age = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.authentication.error);
  const handleRegister = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const data = {
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      age: age.current.value,
      phoneNumber: phoneNumber.current.value,
    };

    if (
      data.email == "" ||
      data.username == "" ||
      data.password == "" ||
      data.age == "" ||
      data.phoneNumber == ""
    ) {
      dispatch(setError("Complete your input"));
    } else if (data.username.length < 8) {
      dispatch(setError("Username minimum length is 8"));
    } else if (data.age < 15) {
      dispatch(setError("Minimum age is 15"));
    } else if (
      !userData?.some(({ email }) => {
        if (email === data.email) {
          return true;
        } else {
          return false;
        }
      })
    ) {
      dispatch(register(data));
      dispatch(setError(null));
      navigate("/login");
    } else {
      dispatch(setError("Your email already exist"));
    }
  };

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
                <p className="pl-4 ">Age</p>
                <label htmlFor="age"></label>
                <input
                  type="number"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="Input Your Age"
                  min="15"
                  max="99"
                  ref={age}
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
                <p className="pl-4 ">Phone Number</p>
                <label htmlFor="phoneNumber"></label>
                <input
                  type="text"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="your phone number"
                  ref={phoneNumber}
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

            {/* <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-gray-700 text-white w-full">
              <img src={googleIcon} className="size-7 mr-4"></img>
              Or Signup with Google
            </button> */}

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
