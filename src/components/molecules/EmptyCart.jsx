/* eslint-disable react/prop-types */
function EmptyCart({ text }) {
  return (
    <div className="min-h-[400px] mx-auto  px-10   w-[1000px]">
      <div className="bg-white py-20  shadow-gray-500  drop-shadow-md  w-full h-[fit-content]">
        <h1 className="text-center text-2xl">{text}</h1>
      </div>
      <button
        onClick={() => (window.location.href = "/")}
        className="right-0 w-[fit-content]  py-3 px-8 my-4  mt-2 bg-[#FFCA1D] hover:bg-[#968447] font-[500] animate-fade-in-drop transition-colors duration-300"
      >
        Return to Shop
      </button>
    </div>
  );
}

export default EmptyCart;
