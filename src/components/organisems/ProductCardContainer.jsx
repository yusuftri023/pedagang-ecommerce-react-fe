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
    <section className="mt-4 overflow-y-visible mb-40  max-h-[280px] ">
      <div className="border-b-2 border-gray-400 mb-4 flex -z-10  justify-between">
        <div className="border-b-2 border-[#FFCA1D] -mb-[2px]">{title}</div>
        {title === "Top Selling Product" && <OfferCountdown />}
      </div>

      <div ref={slideRef} className="overflow-x-scroll no-scrollbar   ">
        <FontAwesomeIcon
          onClick={handleLeftArrow}
          icon={faArrowCircleLeft}
          className=" mt-[140px] h-[35px] items-center absolute   text-3xl text-zinc-200 hover:cursor-pointer hover:text-opacity-100 text-opacity-50 transition-opacity duration-150 "
        />
        <FontAwesomeIcon
          onClick={handleRightArrow}
          icon={faArrowCircleRight}
          className=" ml-[1000px] mt-[140px] translate-x-[-100%]  h-[35px] items-center absolute  text-3xl text-zinc-200 hover:cursor-pointer hover:text-opacity-100 text-opacity-50 transition-opacity duration-150 "
        />

        <div className=" flex  justify-left   ">{children}</div>
      </div>
    </section>
  );
}

export default ProductCardContainer;
