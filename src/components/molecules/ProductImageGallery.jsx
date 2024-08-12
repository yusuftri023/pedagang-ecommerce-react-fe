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
      <div className=" overflow-hidden rounded-2xl">
        <ZoomImageHover
          imagesrc={currentImage}
          height={500}
          width={500}
          maxwidth={500}
          size={200}
          position={"center"}
        />
      </div>
      <div className=" overflow-y-hidden py-2 no-scrollbar max-w-[500px] mx-auto">
        <div className="flex justify-left gap-x-2">
          {images?.map((val, i) => (
            <img
              key={"product-img" + i}
              className={
                (currentImage === val
                  ? `border-[2px] border-blue-600 border-opacity-50 `
                  : ``) +
                ` size-[76px] aspect-square rounded-xl hover:cursor-pointer hover:brightness-75 transition-all duration-100`
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
