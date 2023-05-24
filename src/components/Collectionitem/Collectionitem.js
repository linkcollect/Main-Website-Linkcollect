import React, { useRef, useState, } from "react";
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
  const [isPublic, setIsPublic] = useState(true)
  const menuhandler = () => {
    setDisplay(prev => !prev);
    console.log(display)
  };
  console.log(display)

  //collection Popup stuff
  const menuRef = useRef()
  const popupRef = useRef()

  // Popup menu close functiinality if users clocked outside of it
  window.addEventListener("click", e => {
    if (e.target !== popupRef.current && e.target !== menuRef.current && display) {
      setDisplay(false);
      console.log(display)
    }
  })

  const handleCopy = (collectionId) => {
    setCopyText("Copied!")
    if (copyImageRef) {
      copyImageRef.current.src = approve
    }

    navigator.clipboard.writeText(
      `http://linkcollect.io/${vistiedUser.username}/c/${collectionId}`
    );

    setTimeout(() => {
      copyImageRef.current.src = paste;

      setCopyText("Copy Link")
    }, 2500);
  };
  // Privacy handler
  const handlePrivacy = () => {
    setIsPublic(!isPublic)
  }
  return (
    <>
      <div className="bg-bgPrimary border-2 relative border-bgSecondary rounded-lg   w-[48%] sm:w-[269px]">
        <div className="border-[#EBECFD]-500">
          <Link to={`/${username}/c/${id}`}>
            <div >
              <img src={image != "undefined" && image !== undefined ? image : defultCollectionImage} className="w-[269px] h-[162px]" />
            </div>
            <div className="flex items-center justify-between m-3">
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
          <div className="flex items-center justify-between m-3">
            {explore ? (
              <button
                className={`rounded-lg w-[50%] transition duration-200 ease-in-out ${isUpvoted
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
            {/* not resolvedd yet */}
            {/* {isOwner && (
              <button
                onClick={menuhandler}
                ref={menuRef}
                className="px-4 py-3 border-2 rounded-md border-secondary"
              >
                <img src={dot} alt="menu" />
              </button>
            )} */}
          </div>
          {/* 3dots menu */}
          {isOwner &&
            <div onClick={(e) => e.stopPropagation()} ref={popupRef} className={`absolute right-4 z-[999] -bottom-20 ${display ? "" : "hidden"}`}>
              <div className="flex flex-col justify-end p-5 text-xs leading-5 shadow-2xl -bottom-20 drop-shadow-xl bg-bookmarkItemBG rounded-xl">
                {/* Copy collection */}
                <button className="flex items-center justify-between gap-5 pr-4" onClick={() => { handleCopy(id) }} >
                  <p className="w-12 lexend whitespace-nowrap"> {copyText}</p>
                  <img className="w-6 h-6 pl-3" ref={copyImageRef} src={paste} alt="" />
                </button>

                {/* Collection Privacy */}
                <button className="flex justify-between pr-4 " onClick={handlePrivacy}>
                  <p className="lexend">Public</p>
                  <div className={`w-4 h-[9.5px] px-0.5 py-0.5 rounded-xl mt-1 ${isPublic? 'bg-primary': 'bg-textSecondary'} flex items-center  ${isPublic? 'justify-end': 'justify-start'}`}>
                    <div className="w-[6px] h-[6px] rounded-full bg-bgPrimary"></div>
                  </div>
                  {/* <img className="pt-1" src={toogle} alt="" /> */}
                </button>

                {/* Delete Collection */}
                <button
                  className="flex justify-between pr-4"
                  onClick={() => {
                    menuhandler();
                    onDelete(id);
                  }}
                >
                  <p className="lexend ">Delete</p> <img className="w-5 h-5 pl-2" src={bin} alt="" />
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
