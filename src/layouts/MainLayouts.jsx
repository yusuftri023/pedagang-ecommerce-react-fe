/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";

function MainLayouts({ children }) {
  return (
    <main className="bg-zinc-100 -z-10 min-h-[100vh] ">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

export default MainLayouts;
