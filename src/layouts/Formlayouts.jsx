/* eslint-disable react/prop-types */
import Footer from "../components/organisems/Footer";
import MainNavBar from "../components/organisems/Navbar/MainNavBar";

function FormLayouts({ children }) {
  return (
    <main className="bg-gradient-to-br from-cyan-300 to-blue-400 h-[100vh]">
      {children}
    </main>
  );
}

export default FormLayouts;
