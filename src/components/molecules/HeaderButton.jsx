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
      className=" hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150"
    >
      <a
        href={url}
        className="w-full flex items-center justify-between h-full space-x-2"
      >
        <p>{text}</p>
        <FontAwesomeIcon icon={faIcon} className="text-[30px]" />
      </a>
    </div>
  );
}

export default HeaderButton;
