import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const carouselContents = [
  { id: 1, image: "/src/assets/2148912818.jpg" },
  { id: 2, image: "/src/assets/19114.jpg" },
  { id: 3, image: "/src/assets/woman-choosing-earphones-store.jpg" },
];

function CarouselSlide() {
  const [slide, setSlide] = useState(0);

  const handlePrev = () => {
    if (slide <= 0) return setSlide(carouselContents.length - 1);
    setSlide(slide - 1);
  };
  const handleNext = () => {
    if (slide >= carouselContents.length - 1) return setSlide(0);
    setSlide(slide + 1);
  };
  const handleClickBullet = (id) => {
    setSlide(() => id);
  };
  useEffect(() => {
    const delay = setInterval(() => {
      clearInterval(delay);

      handleNext();
    }, 5000);
    return () => clearInterval(delay);
  }, [slide]);

  return (
    <section className="w-full min-w-[1000px] h-[80vh]">
      <div className="w-full h-[80vh] min-w-[1000px] mx-auto bg-black  overflow-hidden">
        <div
          className={` backdrop-brightness-75 flex flex-row transform duration-300 ease-in-out -translate-x-[${
            slide * 100
          }%]`}
        >
          {carouselContents.map((content) => (
            <img
              key={content.id}
              src={content.image}
              alt="carousel image"
              className="min-w-full h-[80vh] object-cover object-top"
            />
          ))}
        </div>
        <div className=" flex-nowrap relative top-[-50%] h-[80vh] -translate-y-[50%] w-[100%] min-w-[1000px] flex flex-col justify-between items-center transition-opacity duration-300 text-white opacity-10 hover:opacity-100">
          <div className="flex justify-between w-full h-full items-center">
            <div className="py-[125px] ">
              <FontAwesomeIcon
                onClick={handlePrev}
                icon={faArrowAltCircleLeft}
                className="text-4xl rounded-full hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
              />
            </div>

            <div className=" py-[125px]">
              <FontAwesomeIcon
                onClick={handleNext}
                icon={faArrowAltCircleRight}
                className="text-4xl rounded-full hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
              />
            </div>
          </div>
          <div className="w-full pb-2 flex justify-between items-center">
            <div className=" mx-auto flex   space-x-1">
              {carouselContents.map((content) => (
                <div
                  key={content.id}
                  className={
                    (content.id - 1 === slide ? "w-12 " : "size-3 ") +
                    `rounded-full bg-gray-200  hover:bg-gray-700 transition-all duration-200 hover:cursor-pointer`
                  }
                  onClick={() => handleClickBullet(content.id - 1)}
                >
                  {content.id - 1 == slide && (
                    <div
                      className={`h-full bg-gray-800 rounded-full animate-grow-width hover:cursor-pointer`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CarouselSlide;
