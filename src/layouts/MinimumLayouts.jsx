/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import MinimumNavbar from "../components/organisms/Navbar/MinimumNavbar";

function MinimumLayouts({ children }) {
  return (
    <>
      <MinimumNavbar />
      {children}
      <Footer view="minimum" />
    </>
  );
}

export default MinimumLayouts;
