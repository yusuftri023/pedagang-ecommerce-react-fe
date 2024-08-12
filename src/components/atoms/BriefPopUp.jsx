/* eslint-disable react/prop-types */
function BriefPopUp({ children }) {
  return (
    <div className="bg-black w-[50vw] p-2 flex justify-between rounded-xl right-[25vw] animate-fade-in-drop text-white fixed top-[20%] z-10 ">
      {children}
    </div>
  );
}

export default BriefPopUp;
