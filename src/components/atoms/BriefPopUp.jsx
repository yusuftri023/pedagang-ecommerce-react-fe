/* eslint-disable react/prop-types */
function BriefPopUp({ children }) {
  return (
    <div className=" w-[50vw] p-2 rounded-xl right-[25vw] animate-fade-in-drop  fixed top-[20%] z-10 ">
      {children}
    </div>
  );
}

export default BriefPopUp;
