/* eslint-disable react/prop-types */
function Banner({ banner, quantity }) {
  return (
    <div
      key={banner.id}
      style={{
        minWidth: `${100 / quantity}%`,
        height: `${400 - quantity * 70}px`,
      }}
      className={` overflow-hidden`}
    >
      <div className="size-full duration-300 hover:scale-105 ">
        <div className="flex h-[140%] justify-end">
          <img
            src={banner.image}
            style={{
              objectPosition: "120px 100%",
              background: `linear-gradient(${banner.bg.color}, ${banner.bg.gradient}`,
            }}
            className={`w-full object-cover`}
          />
        </div>
        <div className="relative flex h-[100%] -translate-y-[150%] flex-col flex-nowrap justify-end px-5">
          <h2 className="mb-4 w-[50%] text-xl">{banner.title}</h2>
          <h2>{banner.body}</h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
