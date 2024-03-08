import UpperNavbar from "./UpperNavBar";
import MainNavBar from "./MainNavBar";

function Navbar() {
  return (
    <header className="font-poppins  bg-[#4B4AEF] min-w-[1000px] z-10">
      <UpperNavbar />
      <MainNavBar />
    </header>
  );
}

export default Navbar;
