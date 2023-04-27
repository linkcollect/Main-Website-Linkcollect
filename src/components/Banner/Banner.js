import React from "react";
import Vector from "../../assets/Vector.png";
const Banner = () => {
  return (
    <>
      <div className="flex flex-col justify-between items-center ">
        <img src={Vector} alt="Vector" className="w-80 h-72" />
        <h1 className="w-[518px] h-24 lexend font-semibold text-[38px] leading-[49px]">Stay organized, save your web links</h1>
        <p className="text-textPrimary text-[26px] leading-[33px] text-center w-[569px] h-16 font-light">
          linkcollect is the simplest way to save & share web links from
          anywhere to anyone
        </p>

      </div>
    </>
  );
};

export default Banner;
