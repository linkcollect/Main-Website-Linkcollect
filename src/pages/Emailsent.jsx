import React from 'react'
import mainLogo from "../assets/mainLogo.svg";
import Banner from '../components/Banner/Banner';
import check from '../assets/check.svg'
const Emailsent = () => {
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
                  className="mx-auto h-16 w-36"
                  src={check}
                  alt="LinkCollect"
                />
                <h1 className='lexend text-lg font-bold mt-5' >Email Sent</h1>
                <p className='mt-2 opacity-50 lexend font-light text-[19px]'>Check your inbox and verify signup </p>
            </div>
          </div>
        </div>
      </div>
</>
  )
}

export default Emailsent