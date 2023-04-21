import React from "react";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";

const Error = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-gradinetInitial to-gradientEnd from-50% h-screen">
        <div className="w-[50%] m-auto">
          <img src={mainLogo} alt="" />
        </div>
        <div className="flex flex-row justify-evenly items-center">
          <Banner />
          <div className="flex flex-col items-center justify-center mt-[-32px]">
            <div className="rounded-2xl bg-bgPrimary shadow-2xl p-10 w-[410px] height[600px]">
              <img
                className="mx-auto h-16 w-36"
                src={mainLogo}
                alt="LinkCollect"
              />

              <h1 className="lexend text-lg font-bold mt-5">
                An Error Occurred 😕
              </h1>
              <p className="mt-2 text-[#232438] lexend font-light   text-[14px] w-[338px] text-left ">
                We are facing some technical difficulties, please try again some
                time later, if the error still occurs please reach out to us at &nbsp;
               <span className="text-[#6166F1]">linkcollect.io@gmail.com</span>               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
