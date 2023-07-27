import React, { useRef, useState } from "react";
import mainlogo from "../../../assets/mainLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import defaultImage from "../../../assets/defaultImage.svg";
import home from "../../../assets/homeSidebar.svg";
import bookmark from "../../../assets/bmSidebar.svg";
import settings from "../../../assets/settingsSidebar.svg";
import navigation from "../../../assets/navSidebar.svg";
import energy from "../../../assets/energy.svg";

const Sidebar = ({ user, handleSetUser, windowWidth }) => {
  const [showCollections, setShowCollections] = useState(false);
  return (
    <aside
      className={` bg-[#F3F3F6] border-r-[1px] border-[#D1D1DB] ${
        windowWidth < 700 ? "h-[350px] w-full " : "w-[270px]"
      } `}
    >
      <div
        className={`flex flex-col top-0 items-center justify-between h-[100vh] w-full  ${
          user ? "" : "pb-2"
        } `}
      >
        {/* Profile Info */}
        <div className="flex flex-col gap-8">
          <Link to="/" className="flex items-center justify-center w-full py-4 ">
            <img src={mainlogo} alt="" className="w-40 h-10 mx" />
          </Link>
          <div className="w-full border-2  border-[#D1D1DB] rounded-lg py-3 px-3 ">
            <div className=" h-[100px] w-[100px] mx-auto mb-2 overflow-hidden">
              <img
                src={defaultImage}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
            <p className="font-bold text-[16px]">
              Harsh Singh
            </p>

            <div className="flex flex-col justify-evenly items-start text-base font-normal text-[#4B4C63] gap-2 pt-8">
              <div className="flex flex-row justify-between items-center gap-[118px] text-xs">
                <p>Link Saved</p>
                <p className="ml-1">
                    24
                </p>
              </div>
              <div className="flex flex-row items-center justify-between gap-24 text-xs whitespace-nowrap">
                <p>Total Collection</p>
                <p>50</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-col items-start justify-start gap-4">
            <NavLink to={'/johndoe'} className="flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer bg-primary-50 border-1 ">
              <img src={home} /> <span className="text-base text-[#6166F1] ">Home </span> 
            </NavLink>
            <NavLink to={'/explore'} className="flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-primary-50 border-1 ">
              <img src={navigation} /> Explore
            </NavLink>
            <NavLink to={'/saved'} className="flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer hover:bg-primary-50 border-1 ">
              <img src={bookmark} /> Saved Collection
            </NavLink>
            <NavLink to={'/settings'} className={`flex flex-row justify-start gap-3 items-center w-full ${({isActive})=>isActive? 'bg-primary-50': ''} hover:bg-[#DADBFF] cursor-pointer border-1 rounded-md py-3 px-2 `}>
              <img src={settings} /> Settings
            </NavLink>
          </div>
        </div>

        {/* Upgrade button */}

        <div className="flex items-center justify-center w-full mx-5 my-5">
          <button
            className={` font-normal  text-white outline-none px-4 py-3  bg-primary-500  rounded-lg  flex justify-start items-center gap-2 w-11/12  ${
              windowWidth < 700 ? "hidden" : ""
            } relative`}
          >
            <img src={energy} width={16} /> Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
