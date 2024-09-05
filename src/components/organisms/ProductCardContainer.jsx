import { useRef } from "react";
import OfferCountdown from "../molecules/OfferCountdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
function ProductCardContainer({ children, title }) {
  const slideRef = useRef();

  const handleLeftArrow = () => {
    const { width } = slideRef.current.getBoundingClientRect();
    slideRef.current.scrollBy({
      left: -width,
      behavior: "smooth",
    });
  };
  const handleRightArrow = () => {
    const { width } = slideRef.current.getBoundingClientRect();
    slideRef.current.scrollBy({ left: width, behavior: "smooth" });
  };
  return (
    <section className="mb-40 mt-4 max-h-[280px]  overflow-y-visible ">
      <div className="-z-10 mb-4 flex justify-between border-b-2  border-gray-400">
        <div className="-mb-[2px] border-b-2 border-[#FFCA1D]">{title}</div>
        {title === "Top Selling Product" && <OfferCountdown />}
      </div>

      <div ref={slideRef} className="no-scrollbar overflow-x-scroll   ">
        <FontAwesomeIcon
          onClick={handleLeftArrow}
          icon={faArrowCircleLeft}
          className=" absolute mt-[140px] h-[35px] items-center   text-3xl text-zinc-200 opacity-20 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 "
        />
        <FontAwesomeIcon
          onClick={handleRightArrow}
          icon={faArrowCircleRight}
          className=" absolute ml-[1000px] mt-[140px]  h-[35px] translate-x-[-100%] items-center  text-3xl text-zinc-200 opacity-20 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 "
        />

        <div className=" justify-left  flex   ">{children}</div>
      </div>
    </section>
  );
}

export default ProductCardContainer;
