import React from "react";

const Card = ({ img, title, details }) => {
  return (
    <div className="w-[273px] h-[120px] bg-[#EEEEFF] flex flex-col justify-start gap-2 px-4 py-2 border-solid xl:w-[361px] xl:h-[200px] xl:py-4 xl:gap-4 ">
      <img src={img} alt="" className="w-[29.81px] h-[29.81px] xl:w-[47px] xl:h-[47px]" />
      <p className="lexend w-[141px] h-[16px] text-[12px] font-semibold text-normal leading-[12px] text-textPrimary text-start">
        {title}
      </p>
      <p className="w-[255px] h-[26px] lexend text-[10px] leading-[18px] text-textPrimary text-start xl:w-[320px] xl:h-[42px] xl:text-[12px]">
        {details}
      </p>
    </div>
  );
};

export default Card;
