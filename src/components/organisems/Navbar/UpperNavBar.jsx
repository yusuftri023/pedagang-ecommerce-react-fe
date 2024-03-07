import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
function AdditionalNavbar() {
  return (
    <nav className="h-10 flex items-center text-zinc-100  w-[100%] min-w-[1000px] mx-auto">
      <div className="flex justify-between w-full ">
        <div className="flex ">
          <div className="flex space-x-3 ml-4">
            <a href="/">Download</a>
            <p>|</p>
            <p>Ikuti kami</p>
            <a href="http://instagram.com">
              <FontAwesomeIcon icon={faFacebookF} className=" text-md" />
            </a>
            <a href="http://facebook.com">
              <FontAwesomeIcon icon={faInstagram} className="text-md" />
            </a>
          </div>
        </div>
        <div className="flex mr-4 space-x-2">
          <div>
            <a href="/">
              <FontAwesomeIcon icon={faQuestionCircle} className="md" />
            </a>
          </div>
          <p> Bantuan</p>
          <div>
            <a href="/">
              <FontAwesomeIcon icon={faGlobe} className="md" />
            </a>
          </div>
          <p>Bahasa Indonesia</p>
        </div>
      </div>
    </nav>
  );
}

export default AdditionalNavbar;
