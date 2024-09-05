/* eslint-disable react/prop-types */
import { useState } from "react";
import { useRef } from "react";

export const ZoomImageHover = ({
  height,
  maxwidth,
  width,
  position,
  size,
  imagesrc,
}) => {
  const divref = useRef();
  const [isHover, setIsHover] = useState(false);
  const [pos, setPos] = useState("");

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleMouseMove = (e) => {
    setIsHover(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPos(`${x}% ${y}%`);
  };

  const handleMouseOut = () => {
    handleMouseLeave();
  };

  const styles = {
    backgroundImage: `url(${imagesrc})`,
    height: `${height}px`,
    maxWidth: `${maxwidth}px`,
    width: `${width}px`,
    backgroundPosition: isHover ? pos : position,
    backgroundSize: isHover ? `${size}%` : `contain`,
    backgroundRepeat: `no-repeat`,
    cursor: "zoom-in",
  };

  return (
    <>
      <div
        ref={divref}
        onMouseLeave={handleMouseOut}
        onMouseMove={handleMouseMove}
        style={{ ...styles }}
        className="mx-auto transition-all duration-200 hover:transition-none"
      ></div>
    </>
  );
};

export default ZoomImageHover;
