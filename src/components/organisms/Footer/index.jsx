/* eslint-disable react/prop-types */
import CopyrightsFooter from "./CopyrightsFooter";
import SocialMedia from "../../molecules/SocialMedia";
import NewsletterSignup from "../../molecules/NewsletterSignup";
import AppDownload from "../../molecules/AppDownload";

function Footer({ view = "full" }) {
  return (
    <footer className="w-full min-w-[1000px] bg-[#2f3037]  font-poppins text-sm text-white ">
      {view === "full" && (
        <div className="overflow-hidden">
          <div className="mx-auto my-10 flex min-w-[1000px] justify-evenly space-x-16">
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
