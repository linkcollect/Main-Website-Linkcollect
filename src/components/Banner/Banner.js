import React from "react";
import Vector from "../../assets/Vector.png";
import mainLogo from "../../assets/mainLogo.svg";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div className="flex flex-col justify-end items-center md:h-[60%]">
        <Link  to={'/'} className="flex items-center justify-center w-1/2 ">
          <div className="lg:w-[80%]">
            <img src={mainLogo} alt="" className="w-64  md:h-[6.375rem]" />
          </div>
        </Link>
        <div className="flex flex-col items-center">
          <img src={Vector} alt="Vector" className="w-64 h-64 md:w-80 md:h-72" />
          <h1 className="lg:w-[518px] md:w-[400px] h-24 lexend font-semibold text-[28px] leading-[39px] md:text-[38px] md:leading-[49px]">
            Stay organized, save your web links
          </h1>
          <p className="text-textPrimary text-[20px] md:text-[26px] leading-[23px] md:leading-[33px] text-center w-[569px] h-16 font-light">
            linkcollect is the simplest way to save & share web links from
            anywhere to anyone
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
