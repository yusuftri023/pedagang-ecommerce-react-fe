/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import MinimumNavbar from "../components/organisms/Navbar/MinimumNavbar";

function MinimumLayouts({ children }) {
  return (
    <main className="-z-10 min-h-[100vh] bg-zinc-100 ">
      <MinimumNavbar />
      {children}
      <Footer view="minimum" />
    </main>
  );
}

export default MinimumLayouts;
