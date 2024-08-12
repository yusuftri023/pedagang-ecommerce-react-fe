import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function ProductDetailTabContent({ detail }) {
  const [splitLine, setSplitLine] = useState("");
  const handleReadMore = () => {
    setSplitLine(detail.split("\n"));
  };
  const handleSeeLess = () => {
    setSplitLine(detail.slice(0, 300).split("\n"));
  };

  useEffect(() => {
    setSplitLine(detail ? detail.slice(0, 300).split("\n") : "");
  }, [detail]);
  return (
    <div className="my-4">
      {splitLine &&
        splitLine?.map((line, i) => (
          <p key={i + "detail"}>
            {line}
            {splitLine?.length - 1 === i &&
            splitLine?.join("")?.length <= 300 &&
            detail.length > 300
              ? "..."
              : ""}
          </p>
        ))}
      {splitLine && splitLine?.join("")?.length > 300 ? (
        <span
          onClick={handleSeeLess}
          className="text-blue-600 hover:cursor-pointer"
        >
          See less
        </span>
      ) : splitLine && detail.length > 300 ? (
        <span
          onClick={handleReadMore}
          className="text-blue-600 hover:cursor-pointer"
        >
          Read more
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetailTabContent;
