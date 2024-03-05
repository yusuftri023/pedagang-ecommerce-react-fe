import UpperNavbar from "./UpperNavBar";
import MainNavBar from "./MainNavBar";

function Navbar() {
  return (
    <header className="font-poppins  bg-[#1d1dcd]">
      <UpperNavbar />
      <MainNavBar />
      <nav className="w-full text-zinc-200 py-2">
        <ul className=" flex w-[1000px] mx-auto space-x-5">
          <li>
            <a href="/" className="">
              Fashion
            </a>
          </li>
          <li>
            <a href="/" className="">
              Elektronik
            </a>
          </li>
          <li>
            <a href="/" className="">
              Peralatan Rumah
            </a>
          </li>
          <li>
            <a href="/" className="">
              Aksesori
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
