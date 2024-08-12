/* eslint-disable react/prop-types */
function InfiniteCarousel({ images, imgHeight, imgWidth }) {
  return (
    <div className="w-full  overflow-hidden whitespace-nowrap group my-4 ">
      <div className=" inline-block animate-slide group-hover:[animation-play-state:paused] ">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            style={{
              minWidth: `${imgWidth}px`,
              maxWidth: `${imgWidth}px`,
              maxHeight: `${imgHeight}px`,
            }}
            className={`object-contain inline-block px-5 hover:scale-110  transition-all duration-300`}
          ></img>
        ))}
      </div>
      <div className=" inline-block animate-slide group-hover:[animation-play-state:paused] ">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            style={{
              minWidth: `${imgWidth}px`,
              maxWidth: `${imgWidth}px`,
              maxHeight: `${imgHeight}px`,
            }}
            className={` object-contain inline-block px-5 hover:scale-110 transition-all duration-300`}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default InfiniteCarousel;
