import IconIOS from "../../assets/images/landing-page/app_ios.png";
import IconAndroid from "../../assets/images/landing-page/app_android.png";

function AppDownload() {
  return (
    <div className="">
      <h3 className="text-xl mb-5">Download App</h3>
      <p>
        Pedagang App is now available on App Store & Google Play. Get it now.
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
  );
}

export default AppDownload;
