import IconCart from "../../assets/images/landing-page/icon _cart_.svg";
import IconChat from "../../assets/images/landing-page/icon _chat_.svg";
import IconBell from "../../assets/images/landing-page/icon _bell_.svg";
import IconPeople from "../../assets/images/landing-page/icon _people_.svg";
import { useNavigate } from "react-router-dom";

function UserUtils() {
  const navigate = useNavigate();
  return (
    <div className="flex ">
      <div className=" flex space-x-2  items-center">
        <div className="p-4 hover:bg-slate-200 transition-colors duration-300 hover:cursor-pointer size-14 flex items-center justify-center rounded-lg">
          <img src={IconCart} alt="icon cart" className="" />
        </div>
        <div className="p-4 hover:bg-slate-200 transition-colors duration-300 hover:cursor-pointer  size-14 flex items-center justify-center rounded-lg">
          <img src={IconChat} alt="icon chat" className="" />
        </div>
        <div className="p-4 hover:bg-slate-200 transition-colors duration-300 hover:cursor-pointer  size-14 flex items-center justify-center rounded-lg">
          <img src={IconBell} alt="icon bell" className="" />
        </div>
      </div>
      <div
        onClick={() => navigate("/login")}
        className="p-4 hover:bg-yellow-200 transition-colors duration-300 hover:cursor-pointer size-20 flex items-center justify-center rounded-full bg-[#FFCA1D] mr-4"
      >
        <img src={IconPeople} alt="icon profile" className="size-20 " />
      </div>
    </div>
  );
}

export default UserUtils;
