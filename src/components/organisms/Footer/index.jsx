/* eslint-disable react/prop-types */
import CopyrightsFooter from "./CopyrightsFooter";
import SocialMedia from "../../molecules/SocialMedia";
import NewsletterSignup from "../../molecules/NewsletterSignup";
import AppDownload from "../../molecules/AppDownload";

function Footer({ view = "full" }) {
  return (
    <footer className="w-full min-w-[1000px] bg-[#2f3037]  text-white font-poppins text-sm ">
      {view === "full" && (
        <div className="overflow-hidden">
          <div className="flex justify-evenly my-10 mx-auto min-w-[1000px] space-x-16">
            <SocialMedia />
            <NewsletterSignup />
            <AppDownload />
          </div>
        </div>
      )}
      <CopyrightsFooter />
    </footer>
  );
}

export default Footer;
