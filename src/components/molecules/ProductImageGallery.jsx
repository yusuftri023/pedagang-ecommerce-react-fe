/* eslint-disable react/prop-types */
import { useState } from "react";
import ZoomImageHover from "../atoms/ZoomImageHover";

function ProductImageGallery({ defaultImg, images }) {
  const [currentImage, setCurrentImage] = useState(defaultImg);
  const handleThumbnail = (img) => {
    setCurrentImage(img);
  };
  return (
    <div className="p-6">
      <div className="overflow-hidden  rounded-2xl">
        <ZoomImageHover
          imagesrc={currentImage}
          height={500}
          width={500}
          maxwidth={500}
          size={200}
          position={"center"}
        />
      </div>
      <div className=" no-scrollbar mx-auto max-w-[500px] overflow-y-hidden py-2">
        <div className="justify-left flex gap-x-2">
          {images?.map((val, i) => (
            <img
              key={"product-img" + i}
              className={
                (currentImage === val
                  ? `border-[2px] border-blue-600 border-opacity-50 `
                  : ``) +
                ` aspect-square size-[76px] rounded-xl transition-all duration-100 hover:cursor-pointer hover:brightness-75`
              }
              src={val}
              onClick={() => handleThumbnail(val)}
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductImageGallery;
