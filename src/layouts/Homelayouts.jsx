/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import Navbar from "../components/organisms/Navbar";

function HomeLayouts({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayouts;
