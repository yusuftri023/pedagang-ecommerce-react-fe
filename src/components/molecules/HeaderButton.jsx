/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeaderButton({ faIcon, text, url }) {
  return (
    <div className=" hover:bg-[#6e6eb8] px-3 py-1 rounded-md hover:cursor-pointer transition-colors duration-150">
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
