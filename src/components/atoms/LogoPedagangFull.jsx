import Logo from "../../assets/images/landing-page/logo.svg";
function LogoPedagangFull() {
  return (
    <a href="/">
      <img
        src={Logo}
        alt="logo pedagang"
        className="h-[40px] hover:cursor-pointer"
      />
    </a>
  );
}

export default LogoPedagangFull;
