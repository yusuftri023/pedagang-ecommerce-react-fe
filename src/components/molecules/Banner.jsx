/* eslint-disable react/prop-types */
function Banner({ banner, quantity }) {
  return (
    <div
      key={banner.id}
      className={`min-w-[${100 / quantity}%] h-[${
        400 - quantity * 70
      }px] overflow-hidden`}
    >
      <div className="size-full hover:scale-105 duration-300 ">
        <div className="h-[140%] flex justify-end">
          <img
            src={banner.image}
            style={{ objectPosition: "120px 100%" }}
            className={`   w-full object-cover  bg-gradient-to-b from-[${banner.bg.color}] via-[${banner.bg.gradient}] to-[${banner.bg.color}]  `}
          />
        </div>
        <div className="relative h-[100%] -translate-y-[150%] flex flex-col px-5 justify-end flex-nowrap">
          <h2 className="mb-4 text-xl w-[50%]">{banner.title}</h2>
          <h2>{banner.body}</h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
