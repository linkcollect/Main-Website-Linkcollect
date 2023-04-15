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
  const handleShowCollection = () => {
    setShowCollections(!showCollections);
  };
  return (
    <div className="flex flex-col items-center justify-between h-[100vh] w-full px-2">
      <img src={mainlogo} alt="" className="w-48 mx-auto" />
      {/* Profile Info */}
      <div className="w-full">
        <img
          src={ProfileImage}
          alt=""
          className="w-20 h-20 rounded-2xl mx-auto"
        />
        <p className="font-bold text-[25px]">Harsh Singh</p>
        <p className="text-center h-5 para text-sm mx-auto w-[247px]">
          ohiostudent@gmail.com
        </p>
      </div>

      {/* Collection priavaci info */}
      <div className="w-full">
        <div className="w-full rounded-lg font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-3 flex justify-btween px-3">
          <div className="w-full flex items-center gap-2">
            <img src={StackIcon} alt="" className="w-8 h-8" />
            <span className="text-textPrimary">Collections</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span
              className="font-normal w-5 h-5"
              style={{ color: "#6166F1", fontSize: "16px", lineHeight: "20px" }}
            >
              48
            </span>
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
          </div>
        </div>
        <div style={{ height: "65px" }}>
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

      {/* Action buttons */}
      <div className="w-full">
        <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-3 flex justify-center items-center gap-2">
          <img src={AddIcon} alt="" className="w-4" />
          <span>Create Collection</span>
        </button>

        <button className="w-full rounded-lg font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-3 flex justify-center mt-1">
          <span className="">Share Profile</span>
          <img src={Link} alt="" className="w-4" />
        </button>

        <div className="w-full rounded-lg font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-3 flex justify-center mt-1">
          <span>Share Profile</span>
          <img src={Link} alt="" className="w-4" />
        </div>
        <button className=" w-full flex items-center justify-center gap-2 cursor-pointer bg-white py-5">
          <img src={Logout} alt="" className="w-5 h-5" />
          <span
            className="text-danger para text-xl"
            style={{ fontSize: "16px", lineHeight: "16px" }}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
