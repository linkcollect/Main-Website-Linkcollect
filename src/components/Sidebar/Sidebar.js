import React, { useState } from "react";
import mainlogo from "../../assets/mainLogo.svg";
import ProfileImage from "../../assets/profileImage.svg";
import StackIcon from "../../assets/stack-simple.svg";
import ArrowIcon from "../../assets/back-arrow.svg";
import AddIcon from "../../assets/add-tab.svg";
import Link from "../../assets/link.svg";
import Logout from "../../assets/logout.svg";
const Sidebar = () => {
  const [showCollections, setShowCollections] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const handleShowCollection = () => {
    setShowCollections(!showCollections);
  };
  return (
    <aside className="flex-1 w-[305px] bg-bgPrimary fixed">
      <div className={`flex flex-col top-0 items-center justify-between h-[100vh] w-full px-2 ${isLoggedIn?'':'pb-12'} `}>
        {/* Profile Info */}
        <div className="flex flex-col gap-8">
        <img src={mainlogo} alt="" className="w-40 mx-auto" />
          <div className="w-full">
            <img
              src={ProfileImage}
              alt=""
              className="w-[73px] h-[73px] rounded-2xl mx-auto"
            />
            <p className="font-bold text-[16px]">Harsh Singh</p>
            {isLoggedIn &&
              <p className={`text-center h-5 para text-sm mx-auto w-[247px]`}>
                ohiostudent@gmail.com
              </p>
            }
          </div>

          {/* Collection priavaci info */}
          <div className="w-full #">
            <div className={`w-[281px] h-[41px]  rounded-lg font-bold text-textPrimary border-[1px] ${isLoggedIn? 'border-[#ededed]':'border-primary'}  py-1 flex justify-between px-2`}>
              <div className=" flex items-center gap-2">
                <img src={StackIcon} alt="" className="w-5 h-5" />
                <span className="text-textPrimary text-[16px] w-[80px] h-[25px]">Collections</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span
                  className="font-normal w-5 h-5"
                  style={{
                    color: "#6166F1",
                    fontSize: "16px",
                    lineHeight: "20px",
                  }}
                >
                  48
                </span>
                {isLoggedIn &&
                  <img
                    src={ArrowIcon}
                    alt=""
                    className={
                      showCollections
                        ? "w-6 h-6 rotate-0 cursor-pointer"
                        : "w-6 h-6 rotate-180 cursor-pointer"
                    }
                    onClick={handleShowCollection}
                  />
                }
              </div>
            </div>
            <div className='h-[65px] w-[281px]'>
              {showCollections && (
                <div className="flex flex-col mx-auto bg-bgSecondary py-3 cursor-pointer">
                  <div className="flex items-center justify-between px-2 pb-3">
                    <span className="text-black font-normal">Private</span>
                    <span className="font-normal w-5 h-5 text-primary">36</span>
                  </div>
                  <div className="flex items-center justify-between px-2 cursor-pointer">
                    <span className="text-black font-normal">Public</span>
                    <span className="font-normal w-5 h-5 text-primary">12</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div className="w-full">
          {isLoggedIn &&
            <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-2 flex justify-center items-center gap-2">
              <img src={AddIcon} alt="" className="w-4" />
              <span className="text-[14px]">Create Collection</span>
            </button>
          }

          <button className={`w-full font-bold text-textPrimary border-[1px] ${isLoggedIn? 'border-[#ededed]':'border-primary'} rounded-lg py-2 flex justify-center items-center gap-1 mt-1`}>
            <span className="text-[14px]">Share Profile</span>
            <img src={Link} alt="" className="w-4" />
          </button>
          {isLoggedIn &&
            <>
              <div className="w-full font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-2 flex justify-center items-center gap-1 mt-1">
                <span className="text-[14px]">Public</span>
                <img src={Link} alt="" className="w-4" />
              </div>
              <button className=" w-full flex items-center justify-center gap-1 cursor-pointer bg-white py-4">
                <img src={Logout} alt="" className="w-5 h-5" />
                <span
                  className="text-danger para  text-[12px] leading-[12px]"                >
                  Logout
                </span>
              </button>
            </>
          }

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
