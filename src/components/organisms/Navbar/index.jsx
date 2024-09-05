import UpperNavbar from "./UpperNavBar";
import MainNavBar from "./MainNavBar";
import { useRef } from "react";

function Navbar() {
  const headerRef = useRef();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.innerHeight <= window.scrollY) {
  //       headerRef.current.classList.add("fixed");
  //       headerRef.current.classList.add("animate-fade-in-drop");
  //     } else {
  //       headerRef.current.classList.remove("fixed");
  //       headerRef.current.classList.remove("animate-fade-in-drop");
  //     }
  //   };
  //   document.addEventListener("scroll", handleScroll);
  //   return () => document.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <>
      <header
        ref={headerRef}
        className={`  fixed z-20 w-full  min-w-[1000px] bg-[#4B4AEF] font-poppins  `}
      >
        <UpperNavbar />
        <MainNavBar />
      </header>
      <div style={{ paddingBottom: `130px` }} className={` block `}></div>
    </>
  );
}

export default Navbar;
