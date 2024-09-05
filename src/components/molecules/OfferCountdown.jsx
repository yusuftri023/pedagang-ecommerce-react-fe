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
    <div className="flex h-full items-center space-x-5 ">
      <p>Offers ends in: </p>
      <div className="flex items-baseline space-x-2 bg-red-600 px-4 text-sm text-white ">
        <div className="flex items-baseline ">
          <div className="min-w-[28px] text-xl">
            {hours < 10 ? "0" + hours : hours}
          </div>
          <div>Hours</div>
        </div>
        <div className="flex items-baseline">
          <div className="min-w-[28px] text-xl">
            {minutes < 10 ? "0" + minutes : minutes}
          </div>
          <div>Minutes</div>
        </div>
        <div className="flex items-baseline">
          <div className="min-w-[28px] text-xl">
            {seconds < 10 ? "0" + seconds : seconds}
          </div>
          <div>Seconds</div>
        </div>
      </div>
    </div>
  );
}

export default OfferCountdown;
