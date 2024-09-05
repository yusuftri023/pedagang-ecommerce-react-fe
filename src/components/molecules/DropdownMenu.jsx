/* eslint-disable react/prop-types */
function DropdownMenu({
  children,
  width,
  height = "fit-content",
  x,
  isHover = false,
}) {
  return (
    <div
      className={
        (isHover ? "" : "hidden") +
        " absolute z-50 mt-[-10px] h-0  w-0  transform animate-fade-in-drop  duration-300 ease-in-out"
      }
    >
      <div
        style={{ width: `${width}px`, height: `${height}`, left: `-${x}px` }}
        className={`relative  top-[5px] block whitespace-nowrap bg-zinc-100  text-black shadow-md  shadow-[#c2c2c2]`}
      >
        {children}
      </div>
    </div>
  );
}

export default DropdownMenu;
