import UserUtils from "../../molecules/UserUtils";

import SearchBar from "../../molecules/SearchBar";
import LogoPedagangFull from "../../atoms/LogoPedagangFull";
function MainNavBar() {
  return (
    <nav className="mx-auto  min-w-[1000px] bg-[#4B4AEF] font-poppins ">
      <div className="flex h-[90px] items-center justify-between px-4 ">
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
