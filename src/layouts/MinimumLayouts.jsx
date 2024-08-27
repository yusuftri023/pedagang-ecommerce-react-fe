/* eslint-disable react/prop-types */
import Footer from "../components/organisms/Footer";
import MinimumNavbar from "../components/organisms/Navbar/MinimumNavbar";

function MinimumLayouts({ children }) {
  return (
    <main className="bg-zinc-100 -z-10 min-h-[100vh] ">
      <MinimumNavbar />
      {children}
      <Footer view="minimum" />
    </main>
  );
}

export default MinimumLayouts;
