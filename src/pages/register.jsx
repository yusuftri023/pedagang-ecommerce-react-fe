import { useNavigate } from "react-router-dom";
import FormLayouts from "../layouts/Formlayouts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGooglePlusG,
  faGooglePlusSquare,
} from "@fortawesome/free-brands-svg-icons";

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <FormLayouts>
      <div className="pt-16">
        <div className="w-[800px] h-[500px] mx-auto flex rounded-xl overflow-hidden text-zinc-100 ">
          <div className="w-[50%] h-full flex items-center justify-center bg-blue-100 bg-opacity-50 ">
            <img src="../../src/assets/register.svg" className="w-[80%] "></img>
          </div>
          <div className="w-[50%] px-10 py-2 bg-blue-700 bg-opacity-55">
            <h1 className="text-center text-3xl my-5">Sign Up Your Account</h1>
            <form action="" className="">
              <div className="">
                <p className="pl-4  ">Full Name</p>
                <label htmlFor="full_name"></label>
                <input
                  type="text"
                  className="w-full pl-4 rounded-md py-px text-black "
                  placeholder="Enter Your Full Name"
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
                  required
                />
              </div>
              <div className="">
                <p className="pl-4 ">Phone Number</p>
                <label htmlFor="last_name"></label>
                <input
                  type="text"
                  className="w-full pl-4 rounded-md py-px text-black"
                  placeholder="your phone number"
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
                  required
                />
              </div>

              <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-yellow-400 text-white w-full my-3">
                Signup
              </button>
            </form>

            <button className="flex items-center justify-center py-2 px-4 rounded-lg bg-gray-700 text-white w-full">
              <img
                src="../../src/assets/google-icon.svg"
                className="size-7 mr-4"
              ></img>
              Or Signup with Google
            </button>

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
