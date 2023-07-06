import React, { useRef, useState } from "react";
import mainlogo from "../../assets/mainLogo.svg";
// import ProfileImage from "../../assets/profile.jpeg";
import StackIcon from "../../assets/stack-simple.svg";
import ArrowIcon from "../../assets/back-arrow.svg";
import AddIcon from "../../assets/add-tab.svg";
import LinkIcon from "../../assets/link.svg";
import Logout from "../../assets/logout.svg";
import approve from "../../assets/approve.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LinkCopied from "../../assets/LinkCopied.svg";
import defaultImage from "../../assets/defaultImage.svg";
import home from "../../assets/homeSidebar.svg";
import bookmark from "../../assets/bmSidebar.svg";
import settings from "../../assets/settingsSidebar.svg";
import navigation from "../../assets/navSidebar.svg";
import energy from "../../assets/energy.svg";

const Sidebar = ({ user, handleSetUser, windowWidth }) => {
  const copyRef = useRef();
  const navigate = useNavigate();
  const [showCollections, setShowCollections] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleShowCollection = () => {
    setShowCollections(!showCollections);
  };
  const onCopy = () => {
    if (copyRef) {
      copyRef.current.src = approve;
    }
    navigator.clipboard.writeText("https://linkcollect.io/" + user.username);
    setIsCopied(true);
    setTimeout(() => {
      copyRef.current.src = LinkIcon;
      setIsCopied(false);
    }, 1500);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    handleSetUser(null, null, false);
    return navigate("/");
  };
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
          <Link to="/">
            <img src={mainlogo} alt="" className="w-40 mx-auto" />
          </Link>
          <div className="w-full border-2  border-[#D1D1DB] rounded-lg py-3 px-3 ">
            <div className=" h-[100px] w-[100px] mx-auto mb-2 overflow-hidden">
              <img
                src={defaultImage}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <p className="font-bold text-[16px]">
              {user.isLoggedIn && user.isOwner ? user.username : user.name}
            </p>
            {/* {user.email && <p className="font-light text-[16px] pt-1">{user.email}</p>} */}

            <div className="flex flex-col justify-evenly items-start text-base font-normal text-[#4B4C63] gap-2 pt-8">
              <div className="flex flex-row justify-between items-center gap-[118px] text-xs">
                <p>Link Saved</p>
                <p className="ml-1">
                  {user.link?.privateCollection + user.link?.publicCollection ||
                    0}
                </p>
              </div>
              <div className="flex flex-row justify-between items-center gap-24 text-xs whitespace-nowrap">
                <p>Total Collection</p>
                <p>50</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-start flex-col items-start gap-4">
            <div className="flex flex-row justify-start gap-3 items-center w-full bg-[#DADBFF] cursor-pointer border-1 rounded-md py-3 px-2 ">
              <img src={home} /> <span className="text-base text-[#6166F1] ">Home </span> 
            </div>
            <div className="flex flex-row justify-start gap-3 items-center w-full hover:bg-[#DADBFF] cursor-pointer border-1 rounded-md py-3 px-2 ">
              <img src={navigation} /> Explore{" "}
            </div>
            <div className="flex flex-row justify-start gap-3 items-center w-full hover:bg-[#DADBFF] cursor-pointer border-1 rounded-md py-3 px-2 ">
              <img src={bookmark} /> Saved Collection
            </div>
            <div className="flex flex-row justify-start gap-3 items-center w-full hover:bg-[#DADBFF] cursor-pointer border-1 rounded-md py-3 px-2 ">
              <img src={settings} /> Settings
            </div>
          </div>

          {/* Collection priavaci info */}
          {/* <div className={`${windowWidth < 700 ? " flex items-center justify-center gap-2 w-full" : ""}`}>
            <div className={`${windowWidth < 700 ? "w-[163px]" : "w-[281px]"} h-[41px]  rounded-lg font-bold text-textPrimary border-[1px] ${user ? 'border-borderPrimary' : 'border-primary'}  py-1 flex items-center justify-between px-2`}>

              <div className="flex items-center gap-2 ">
                <img src={StackIcon} alt="" className="w-5 h-5" />
                <span className={`text-textPrimary text-[13px] sm:text-[16px] w-[60px] h-[23px] sm:h-[25px]`}>Collections</span>
              </div> */}

          {/* <div className="flex items-center justify-center gap-2">

                <span
                  className={`font-normal w-5 h-5 leading-5 text-[14px] sm:text-[16px] text-primary `}
                >
                  {user.link?.privateCollection + user.link?.publicCollection || 0}
                </span>
                {user?.isLoggedIn && user.isOwner &&
                  <img
                    src={ArrowIcon}
                    alt=""
                    className={
                      showCollections
                        ? "w-6 h-6 rotate-0 cursor-pointer hidden sm:block"
                        : "w-6 h-6 rotate-180 cursor-pointer hidden sm:block"
                    }
                    onClick={handleShowCollection}
                  />
                }
              </div> */}
        </div>
        {/* for responsive button */}
        {/* <button onClick={onCopy} className={` w-[160px]  border-borderPrimary border-[1px] font-bold text-textPrimary   rounded-lg py-2 flex justify-center items-center gap-[8px] sm:gap-1 mt-1 mb-1 ${windowWidth < 700 ? "block" : "hidden"} relative`}>
              <span className="text-[14px]">Share Profile</span>
              <img ref={copyRef} src={LinkIcon} alt="" className="w-4" />
              {isCopied &&
              <div className={`absolute ${isCopied ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 -top-8`}>
                <img alt='LinkCopied' src={LinkCopied} />
              </div>
            }
            </button> */}
        {/* problem aarha ha tha when adjusting width of collections in mobile devicess so added the logic of windowWidth */}
        {/* <div className={`h-[65px] w-[281px] ${windowWidth < 700 ? "hidden" : 'block'}`}>
              {showCollections && (
                <div className="flex flex-col py-3 mx-auto cursor-pointer bg-bgSecondary">
                  <div className="flex items-center justify-between px-2 pb-3">
                    <span className="font-normal text-black">Private</span>
                    <span className="w-5 h-5 font-normal text-primary">{user.link?.privateCollection || 0}</span>
                  </div>
                  <div className="flex items-center justify-between px-2 cursor-pointer">
                    <span className="font-normal text-black">Public</span>
                    <span className="w-5 h-5 font-normal text-primary">{user.link?.publicCollection || 0}</span>
                  </div>
                </div>
              )}
            </div> */}
        {/* </div>
        </div> */}
        {/* Action buttons */}
        {/* {user?.isOwner &&
            <button className="flex items-center justify-center w-full gap-2 py-2 font-bold rounded-lg bg-primary text-bgPrimary">
              <img src={AddIcon} alt="" className="w-4" />
              <span className="text-[14px]">Create Collection</span>
            </button>
          } */}
        {/* Share Profile */}
        {/* <button onClick={onCopy} className={`w-full font-bold text-textPrimary border-[1px] ${'border-primary'} rounded-lg py-2 flex justify-center items-center gap-1 mt-1 mb-1 ${windowWidth < 700 ? "hidden" : ""} relative`}>
            <span className="text-[14px]">Share Profile</span>
            <img ref={copyRef} src={LinkIcon} alt="" className="w-4" />
            {isCopied &&
              <div className={`absolute ${isCopied ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 -top-8`}>
                <img alt='LinkCopied' src={LinkCopied} />
              </div>
            }
          </button> */}

        {/* Upgrade button */}

        <div className="flex justify-start items-center my-5 mx-5">
          <button
            className={` font-normal  text-[#fff] outline-none px-20 py-3   bg-primary  rounded-lg  flex justify-start items-center gap-4  ${
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
