import React from "react";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import checkG from "../assets/check-in-green.svg";

const Loginsucc = () => {
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
              <img
                className="mx-auto h-16 w-36 "
                src={checkG}
                alt="LinkCollect"
              />
              <h1 className="lexend text-lg font-bold mt-5">Login Success</h1>
              <p className="text-left mt-2 text-[#background: #232438] lexend font-light text-[14px]">
                You were succesfully logged in, enjoy using linkcollect, open extension and start using 😁
                <br/>
                <br/>
                Make sure you pin LinkCollect extension in your extension manager so you can access it easily :) happy 
                surfing
              </p>
            
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Loginsucc;
