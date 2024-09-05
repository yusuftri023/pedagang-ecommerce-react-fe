/* eslint-disable react/prop-types */
function EmptyCart({ text }) {
  return (
    <div className="mx-auto min-h-[400px]  w-[1000px]   px-10">
      <div className="h-[fit-content] w-full  bg-white  py-20  shadow-gray-500 drop-shadow-md">
        <h1 className="text-center text-2xl">{text}</h1>
      </div>
      <button
        onClick={() => (window.location.href = "/")}
        className="right-0 my-4  mt-2 w-[fit-content] animate-fade-in-drop  bg-[#FFCA1D] px-8 py-3 font-[500] transition-colors duration-300 hover:bg-[#968447]"
      >
        Return to Shop
      </button>
    </div>
  );
}

export default EmptyCart;
