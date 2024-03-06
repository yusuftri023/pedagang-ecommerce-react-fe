import IconIOS from "../../../assets/images/landing-page/app_ios.png";
import IconAndroid from "../../../assets/images/landing-page/app_android.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagramSquare,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <footer className="w-full bg-[#2f3037]  text-white font-poppins text-sm ">
        <div className="overflow-hidden  ">
          <div className="flex justify-between my-10 mx-auto w-[1000px] space-x-16">
            <div className="">
              <h3 className="text-xl mb-5">Follow Us</h3>
              <p>
                We make consolidating, marketing and tracking your social <br />{" "}
                media website easy.
              </p>
              <ul className="flex space-x-2 mt-4">
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
            <div className="mx-4">
              <h3 className="text-xl mb-5">Sign Up To Newsletter</h3>
              <p>
                Join 60.000+ subscribers and get a new discount coupon <br /> on
                every Saturday.
              </p>
              <div className="mt-4">
                <form method="post">
                  <div className="flex flex-nowrap w-full">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      className="w-full pl-4 rounded-l-lg text-black"
                    />
                    <button
                      type="submit"
                      value=""
                      className="px-2 py-3 bg-[#FFCA1D] rounded-r-lg text-black"
                    >
                      SUBSCRIBE{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl mb-5">Download App</h3>
              <p>
                Pedagang App is now available on App Store & Google Play. Get it
                now.
              </p>
              <div className="flex w-full space-x-4 mt-4">
                <a href="#">
                  <img src={IconIOS} alt="" srcSet="" className="w-52" />
                </a>
                <a href="">
                  <img src={IconAndroid} alt="" srcSet="" className="w-52" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
