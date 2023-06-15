import React from "react";
import mainLogo from "../../assets/mainLogo.svg";
import check from "../../assets/check.svg";
const Emailsent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[-32px]">
        <div className="rounded-2xl bg-bgPrimary p-10 w-[410px] height[600px]">
          <img className="mx-auto h-11 w-44" src={mainLogo} alt="LinkCollect" />
          <img className="mx-auto h-14 w-14" src={check} alt="LinkCollect" />
          <h1 className="mt-5 text-[40px] leading-[50px] text-textDark font-bold lexend">Email Sent</h1>
          <p className="mt-2  lexend font-normal text-textDark text-[16px]">
            Check your inbox and verify signup{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Emailsent;
