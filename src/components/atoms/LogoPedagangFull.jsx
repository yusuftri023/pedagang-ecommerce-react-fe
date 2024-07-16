import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/landing-page/logo.svg";
function LogoPedagangFull() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")}>
      <img
        src={Logo}
        alt="logo pedagang"
        className="h-[40px] hover:cursor-pointer"
      />
    </div>
  );
}

export default LogoPedagangFull;
