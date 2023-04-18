import React from "react";
import Vector from "../../assets/Vector.png";
const Banner = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center ">
            <img src={Vector} alt="Vector" width="470px" height="470px" />
            <h1 className="">Stay organized, save your web links</h1>
            <p className="text-textPrimary text-[15px] ">
              linkcollect is the simplest way to save & share web links from
              anywhere to anyone
            </p>
        
      </div>
    </>
  );
};

export default Banner;
