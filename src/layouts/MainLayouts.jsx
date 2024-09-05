/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";

function MainLayouts({ children }) {
  return (
    <main className="-z-10 min-h-[100vh] bg-zinc-100 ">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default MainLayouts;
