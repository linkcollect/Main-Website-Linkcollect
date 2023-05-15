import React, { useState } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/Upvote.svg";
import dot from "../../assets/3dot.svg";
import noUpvote from "../../assets/Vector.svg";
import toogle from "../../assets/toggle.svg";
import paste from "../../assets/paste.svg";
import bin from "../../assets/bin.svg";
import defultCollectionImage from "../../assets/defaultCollectio.png";
import { nameShortner } from "../../utils/utils"

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
  windowWidth
}) => {
  const [display, setDisplay] = useState(false);
  const menuhandler = () => {
    setDisplay(!display);
  };

  return (
    <>
      <div className="bg-bgPrimary border-2 border-bgSecondary rounded-lg overflow-hidden w-[48%] sm:w-[269px]">
        <div className="border-[#EBECFD]-500">
          <Link to={`/${username}/c/${id}`}>
            <div >
              <img src={image != "undefined" && image !== undefined ? image : defultCollectionImage} className="w-[269px] h-[162px]" />
            </div>
            <div className="flex items-center justify-between m-3">
              <p className="font-semibold text-textPrimary text-[14px]">
                {windowWidth > 700 ? nameShortner(title, 20) : nameShortner(title, 10)}
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
            {/* <button
              onClick={menuhandler}
              className="px-4 py-3 border-2 rounded-md border-secondary"
            >
              <img src={dot} alt="menu" />
            </button> */}
          </div>
          {/* 3dots menu */}
          {/* <div className={`threedotmenu ${display ? "" : "hidden"}`}>
            <div className="absolute flex flex-col justify-end p-5 ml-20 text-xs leading-5 bg-bgPrimary rounded-xl">
              <div className="flex justify-between pr-4">
                <p className="lexend "> Copy link</p>{" "}
                <img className="pl-8" src={paste} alt="" />
              </div>
              <div className="flex justify-between pr-4">
                <p className="lexend">Public</p> <img src={toogle} alt="" />
              </div>
              <div className="flex justify-between pr-4">
                <p className="lexend">Delete</p> <img src={bin} alt="" />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Collectionitem;
