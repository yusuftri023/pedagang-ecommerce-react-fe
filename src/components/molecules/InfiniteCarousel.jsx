/* eslint-disable react/prop-types */
function InfiniteCarousel({ images, imgHeight, imgWidth }) {
  return (
    <div className="group my-4 w-full overflow-hidden whitespace-nowrap ">
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
            className={`inline-block object-contain px-5 transition-all  duration-300 hover:scale-110`}
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
            className={` inline-block object-contain px-5 transition-all duration-300 hover:scale-110`}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default InfiniteCarousel;
