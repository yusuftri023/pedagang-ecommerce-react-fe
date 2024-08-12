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
        className={`  fixed font-poppins w-full  bg-[#4B4AEF] min-w-[1000px] z-20 `}
      >
        <UpperNavbar />
        <MainNavBar />
      </header>
      <div
        style={{ paddingBottom: `${headerRef?.current?.clientHeight}px` }}
        className={` block `}
      ></div>
    </>
  );
}

export default Navbar;
