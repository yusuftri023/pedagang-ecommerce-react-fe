/* eslint-disable react/prop-types */
function FeatureList({ feature }) {
  return (
    <div className="flex  w-[25%]  justify-top items-center space-x-8 px-2  ">
      <img src={feature.image} alt="" className="size-20 " />
      <p>{feature.name}</p>
    </div>
  );
}

export default FeatureList;
