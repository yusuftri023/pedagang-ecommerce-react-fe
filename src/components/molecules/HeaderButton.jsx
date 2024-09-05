/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useMediaQuery from "../../hooks/useMediaQuery";

function HeaderButton({ faIcon, text, url }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const handleLinkClick = (e) => {
    if (isMobile && ["Account", "Cart"].includes(text)) {
      e.preventDefault();
    }
  };
  return (
    <div
      onClick={handleLinkClick}
      className=" rounded-md px-3 py-1 transition-colors duration-150 hover:cursor-pointer hover:bg-[#6e6eb8]"
    >
      <a
        href={url}
        className="flex h-full w-full items-center justify-between space-x-2"
      >
        <p>{text}</p>
        <FontAwesomeIcon icon={faIcon} className="text-[30px]" />
      </a>
    </div>
  );
}

export default HeaderButton;
