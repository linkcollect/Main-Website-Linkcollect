import React from "react";
import Banner from "../components/Banner/Banner";
import mainLogo from "../assets/mainLogo.svg";
import checkG from "../assets/check-in-green.svg";

const Loginsucc = () => {
  return (
    <>
      <div className="bg-white ">
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="rounded-2xl bg-white p-10 w-[410px] height[600px] flex flex-col items-center justify-center gap-4">
              <img
                className="h-16 mx-auto w-36"
                src={mainLogo}
                alt="LinkCollect"
              />
              <img
                className="h-16 mx-auto w-36 "
                src={checkG}
                alt="LinkCollect"
              />
              <h1 className="mt-5 text-4xl font-bold text-center text-neutral-900 lexend">Login Success</h1>
              <p className="mt-2 text-lg font-normal text-left lexend text-neutral-600">
                You were succesfully logged in, enjoy using linkcollect, open extension and start using 😁
                <br />
                <br />
                Make sure you pin LinkCollect extension in your extension manager so you can access it easily :) happy
                surfing
              </p>
              <button className={`flex items-center justify-center w-full py-3 font-bold rounded-lg bg-primary-500 text-white`}>
                Continue
              </button>
            </div>
          </div>
      </div>

    </>
  );
};

export default Loginsucc;
