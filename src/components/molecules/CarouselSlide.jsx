import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import carousel1 from "../../assets/2148912818.jpg";
import carousel2 from "../../assets/19114.jpg";
import carousel3 from "../../assets/woman-choosing-earphones-store.jpg";

const carouselContents = [
  {
    id: 1,
    image: carousel1,
    body: "The Best Place To Find And Buy Amazing Products",
  },
  {
    id: 2,
    image: carousel2,
    body: "Get The Best Deals On Electronics",
  },
  {
    id: 3,
    image: carousel3,
    body: "Keep Looking Stylish",
  },
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
    <section className="w-full min-w-[1000px]">
      <div className="mx-auto  h-[calc(100vh-130px)] w-full min-w-[1000px] overflow-hidden  bg-black">
        <div
          className={`flex transform flex-row brightness-95 duration-300 ease-in-out `}
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {carouselContents.map((content) => (
            <div key={content.id} className={`relative min-w-full `}>
              <p className="absolute left-1/2 top-3/4 w-full -translate-x-1/2 text-center text-3xl text-white">
                {content.body}
              </p>
              <img
                src={content.image}
                alt="carousel image"
                className="h-[calc(100vh-130px)]  min-w-full object-cover object-top"
              />
            </div>
          ))}
        </div>
        <div className=" relative top-[-50%] flex h-[calc(100vh-130px)]  w-[100%] min-w-[1000px] -translate-y-[50%] flex-col flex-nowrap items-center justify-between text-white opacity-10 transition-opacity duration-300 hover:opacity-100">
          <div className="flex h-full w-full items-center justify-between">
            <div className="py-[125px] ">
              <FontAwesomeIcon
                onClick={handlePrev}
                icon={faArrowAltCircleLeft}
                className="rounded-full text-4xl hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
              />
            </div>

            <div className=" py-[125px]">
              <FontAwesomeIcon
                onClick={handleNext}
                icon={faArrowAltCircleRight}
                className="rounded-full text-4xl hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-50"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between pb-2">
            <div className="mx-auto flex space-x-1 ">
              {carouselContents.map((content) => (
                <div
                  key={content.id}
                  className={
                    (content.id - 1 === slide ? "w-12 " : "size-3 ") +
                    `rounded-full bg-gray-200  transition-all duration-200 hover:cursor-pointer hover:bg-gray-700`
                  }
                  onClick={() => handleClickBullet(content.id - 1)}
                >
                  {content.id - 1 == slide && (
                    <div
                      className={`h-full animate-grow-width rounded-full bg-gray-800 hover:cursor-pointer`}
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
