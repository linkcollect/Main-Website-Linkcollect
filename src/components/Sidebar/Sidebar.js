import React, { useRef, useState } from "react";
import mainlogo from "../../assets/mainLogo.svg";
import ProfileImage from "../../assets/profile.jpeg";
import StackIcon from "../../assets/stack-simple.svg";
import ArrowIcon from "../../assets/back-arrow.svg";
import AddIcon from "../../assets/add-tab.svg";
import Link from "../../assets/link.svg";
import Logout from "../../assets/logout.svg";
import approve from "../../assets/approve.svg"
import { useNavigate } from "react-router-dom";

const Sidebar = ({user,handleSetUser}) => {
  const copyRef= useRef();
  const navigate = useNavigate()
  const [showCollections, setShowCollections] = useState(false);
  const handleShowCollection = () => {
    setShowCollections(!showCollections);
  };
  const onCopy = () => {
    if(copyRef) copyRef.current.src=approve;
    navigator.clipboard.writeText("https://linkcollect.io/"+user.username);
    setTimeout(()=>{
      copyRef.current.src=Link
    },1500);
  };

  const logoutHandler =  () =>{
    localStorage.removeItem("token");
    handleSetUser(null,null,false)
    return navigate("/")
  }
  return (
    <aside className="w-[305px] bg-bgPrimary ">
      <div className={`flex flex-col top-0 items-center justify-between h-[100vh] w-full px-2 ${user?'':'pb-12'} `}>
        {/* Profile Info */}
        <div className="flex flex-col gap-8">
        <img src={mainlogo} alt="" className="w-40 mx-auto" />
          <div className="w-full">
            <div className="w-[90px] h-[73px] rounded-2xl mx-auto mb-2 overflow-hidden">
            <img
              src={ProfileImage}
              className="w-[90px] h-[73px] object-cover"
              
            />
            </div>
            <p className="font-bold text-[16px]">{user.isLoggedIn ? user.username : user.name}</p>
            {user.email && <p className="font-light text-[16px] pt-1">{user.email}</p>}
          </div>

          {/* Collection priavaci info */}
          <div className="w-full #">
            <div className={`w-[281px] h-[41px]  rounded-lg font-bold text-textPrimary border-[1px] ${user? 'border-[#ededed]':'border-primary'}  py-1 flex justify-between px-2`}>
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
                  {user.link?.privateCollection+user.link?.publicCollection || 0}
                </span>
                {user?.isLoggedIn && user.isOwner &&
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
                    <span className="font-normal w-5 h-5 text-primary">{user.link?.privateCollection || 0}</span>
                  </div>
                  <div className="flex items-center justify-between px-2 cursor-pointer">
                    <span className="text-black font-normal">Public</span>
                    <span className="font-normal w-5 h-5 text-primary">{user.link?.publicCollection || 0}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Action buttons */}
        <div className="w-full">
          {/* {user?.isOwner &&
            <button className="w-full rounded-lg bg-primary font-bold text-bgPrimary py-2 flex justify-center items-center gap-2">
              <img src={AddIcon} alt="" className="w-4" />
              <span className="text-[14px]">Create Collection</span>
            </button>
          } */}

          <button onClick={onCopy} className={`w-full font-bold text-textPrimary border-[1px] ${'border-primary'} rounded-lg py-2 flex justify-center items-center gap-1 mt-1 mb-1`}>
            <span className="text-[14px]">Share Profile</span>
            <img ref={copyRef} src={Link} alt="" className="w-4" />
          </button>
          {user?.isOwner &&
            <>
              {/* <div className="w-full font-bold text-textPrimary border-2 border-[#ededed] rounded-lg py-2 flex justify-center items-center gap-1 mt-1">
                <span className="text-[14px]">Public</span>
                <img src={Link} alt="" className="w-4" />
              </div> */}
              <button className=" w-full flex items-center justify-center gap-1 cursor-pointer bg-white py-4" onClick={logoutHandler}>
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
































