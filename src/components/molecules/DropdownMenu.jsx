/* eslint-disable react/prop-types */
function DropdownMenu({ children, width, height, x, isHover = false }) {
  return (
    <div
      style={{ display: isHover ? "block" : "none" }}
      className={
        "z-50 transform ease-in-out duration-300  absolute  w-0 h-0  mt-[-10px] animate-fade-in-drop"
      }
    >
      <div
        style={{ width: `${width}px`, height: `${height}px`, left: `-${x}px` }}
        className={`bg-zinc-100  shadow-[#c2c2c2] relative text-black top-[5px]  block whitespace-nowrap  shadow-md  `}
      >
        {children}
      </div>
    </div>
  );
}

export default DropdownMenu;
