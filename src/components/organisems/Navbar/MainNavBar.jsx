import UserUtils from "../../molecules/UserUtils";
import Logo from "../../../assets/images/landing-page/logo.svg";
import SearchBar from "../../molecules/SearchBar";
function MainNavBar() {
  return (
    <nav className="font-poppins  bg-[#4B4AEF] w-[1000px] mx-auto">
      <div className="h-[90px] flex items-center justify-between">
        {" "}
        <div className="ml-4">
          <img src={Logo} alt="logo pedagang" className="w-[450px]" />
        </div>
        <SearchBar />
        <UserUtils />
      </div>
    </nav>
  );
}

export default MainNavBar;
