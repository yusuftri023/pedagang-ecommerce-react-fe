import { useEffect, useState } from "react";

function OfferCountdown() {
  const [time, setTime] = useState(new Date());
  const hours = 24 - time.getHours();
  const minutes = 60 - time.getMinutes();
  const seconds = 60 - time.getSeconds();
  useEffect(() => {
    const delay = setInterval(() => {
      clearInterval(delay);
      setTime(() => new Date());
    }, 1000);
    return () => clearInterval(delay);
  }, [time]);
  return (
    <div className="h-full flex space-x-5 items-center ">
      <p>Offers ends in: </p>
      <div className=" bg-red-600 px-4 flex text-white text-sm items-baseline  space-x-2 ">
        <div className="flex items-baseline ">
          <div className="text-xl min-w-[28px]">
            {hours < 10 ? "0" + hours : hours}
          </div>
          <div>Hours</div>
        </div>
        <div className="flex items-baseline">
          <div className="text-xl min-w-[28px]">
            {minutes < 10 ? "0" + minutes : minutes}
          </div>
          <div>Minutes</div>
        </div>
        <div className="flex items-baseline">
          <div className="text-xl min-w-[28px]">
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default OfferCountdown;
