import UserUtils from "../../molecules/UserUtils";

import SearchBar from "../../molecules/SearchBar";
import LogoPedagangFull from "../../atoms/LogoPedagangFull";
function MainNavBar() {
  return (
    <nav className="font-poppins  bg-[#4B4AEF] min-w-[1000px] mx-auto ">
      <div className="h-[90px] flex items-center justify-between px-4 ">
        <div className="min-w-[170px]">
          <LogoPedagangFull />
        </div>
        <SearchBar />
        <UserUtils />
      </div>
    </nav>
  );
}

export default MainNavBar;
