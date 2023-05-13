import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/Upvote.svg";
import dot from "../../assets/3dot.svg";
import noUpvote from "../../assets/Vector.svg";
import toogle from "../../assets/toggle.svg";
import paste from "../../assets/paste.svg";
import bin from "../../assets/bin.svg";
import defultCollectionImage from "../../assets/defaultCollectio.png";
import { nameShortner } from "../../utils/utils";
import approve from "../../assets/approve.svg";
const Collectionitem = ({
  id,
  image,
  title,
  links,
  username,
  type,
  description,
  explore,
  isUpvoted,
  upVote,
  windowWidth,
  onDelete,
  isOwner,
  vistiedUser,

}) => {
  const copyImageRef = useRef();
  const [copyText, setCopyText] = useState("Copy Link")
  const [display, setDisplay] = useState(false);
  const menuhandler = () => {
    setDisplay(!display);
  };

  
  const handleCopy = (collectionId) => {
    setCopyText("Copied!")
if(copyImageRef)    {copyImageRef.current.src = approve

}

    navigator.clipboard.writeText(
      `http://linkcollect.io/${vistiedUser.username}/c/${collectionId}`
    );

setTimeout(() => {  copyImageRef.current.src = paste;
setCopyText("Copy Link")
}, 2500);
  };
  return (
    <>
      <div className="bg-bgPrimary border-2 border-bgSecondary rounded-lg overflow-hidden w-[48%] sm:w-[269px]">
        <div className="border-[#EBECFD]-500">
          <Link
            to={`/${username}/c/${id}`}
            state={{
              title: title,
              description: description,
              links: links,
              image: image,
            }}
          >
            <div>
              <img
                src={
                  image != "undefined" && image !== undefined
                    ? image
                    : defultCollectionImage
                }
                className="w-[269px] h-[162px]"
              />
            </div>
            <div className="flex justify-between items-center m-3">
              <p className="font-semibold text-textPrimary text-[14px]">
                {windowWidth > 700
                  ? nameShortner(title, 20)
                  : nameShortner(title, 10)}
              </p>
              <p className="text-textPrimary font-light text-[12px]">
                {links} Links
              </p>
            </div>
          </Link>

          {/* Condional rendering based on tabs 
            if explore tab opens
              ==> Show Upvote button
            if My collections tab open
              ==> show public or private option
          */}
          <div className="flex justify-between m-3 items-center">
            {explore ? (
              <button
                className={`rounded-lg w-[50%] transition duration-200 ease-in-out ${
                  isUpvoted
                    ? "bg-primary text-bgPrimary"
                    : "bg-bgPrimary text-textPrimary"
                } font-normal py-2 px-4 flex items-center justify-center gap-2 border border-primary`}
                onClick={() => upVote(id)}
              >
                <span className="text-[13px]">Upvote</span>{" "}
                <img src={isUpvoted ? upvote : noUpvote} alt="upvote" />
              </button>
            ) : (
              <div>
                <p className="px-4 sm:px-6   border border-textSecondary rounded-full text-[12px] sm:text-sm font-light">
                  {type ? "Public" : "Private"}
                </p>
              </div>
            )}

            {/* 3dots menu button */}
            {isOwner && (
              <button
              
                onClick={menuhandler}
                className="rounded-md border-2 border-secondary py-3 px-4"
              >
                <img src={dot} alt="menu" />
              </button>
            )}
          </div>
          {/* 3dots menu */}
          {isOwner && 
          
          <div className={`threedotmenu ${display ? "" : "hidden"}`}>
            <div className="absolute flex flex-col justify-end ml-20 bg-bgPrimary p-5 rounded-xl text-xs leading-5 ">
              <button className="flex justify-between items-center pr-4" onClick={()=>{handleCopy(id)}} >
                <p className="lexend"> {copyText}</p>{" "}
                <img className="pl-3   w-6 h-6" ref={copyImageRef} src={paste}  alt="" />
              </button>
              <button className="flex justify-between pr-4 ">
                <p className="lexend">Public</p> <img className="pt-1" src={toogle} alt="" />
              </button>

              <button
                className="flex justify-between pr-4"
                onClick={() => {
                  menuhandler();
                  onDelete(id);
                }}
              >
                <p className="lexend">Delete</p> <img src={bin} alt="" />
              </button>
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default Collectionitem;
