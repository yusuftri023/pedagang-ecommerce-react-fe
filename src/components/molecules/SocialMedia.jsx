import {
  faFacebookSquare,
  faInstagramSquare,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialMedia() {
  return (
    <div className="">
      <h3 className="mb-5 text-xl">Follow Us</h3>
      <p>
        We make consolidating, marketing and tracking your social <br /> media
        website easy.
      </p>
      <ul className="mt-4 flex space-x-2">
        <li>
          <a href="#" target="_blank">
            <FontAwesomeIcon
              icon={faFacebookSquare}
              className="size-12 text-blue-600"
            />
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            <FontAwesomeIcon
              icon={faInstagramSquare}
              className="size-12 text-red-600"
            />
          </a>
        </li>
        <li>
          <a href="#" target="_blank">
            <FontAwesomeIcon
              icon={faSquareXTwitter}
              className="size-12 text-black"
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SocialMedia;
