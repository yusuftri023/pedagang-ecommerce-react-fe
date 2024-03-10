import UserUtils from "../../molecules/UserUtils";
import Logo from "../../../assets/images/landing-page/logo.svg";
import SearchBar from "../../molecules/SearchBar";
import { useNavigate } from "react-router-dom";
function MainNavBar() {
  const navigate = useNavigate();
  return (
    <nav className="font-poppins  bg-[#4B4AEF] min-w-[1000px] mx-auto">
      <div className="h-[90px] flex items-center justify-between">
        {" "}
        <div onClick={() => navigate("/")} className="ml-4">
          <img
            src={Logo}
            alt="logo pedagang"
            className="w-[450px] hover:cursor-pointer"
          />
        </div>
        <SearchBar />
        <UserUtils />
      </div>
    </nav>
  );
}

export default MainNavBar;
