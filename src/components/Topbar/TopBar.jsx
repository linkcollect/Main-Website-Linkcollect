// Package Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components Imports
import Search from "../Search/Search";

// Assets imports
import backarrow from "../../assets/back-arrow.svg";
import share from "../../assets/share.svg";
import MainLogo from "../../assets/mainLogo.svg";
import defultCollectionImage from "../../assets/defaultCollectio.svg";
import editIcon from "../../assets/edit.svg";
import addIcon from "../../assets/add.svg";
import deleteIcon from "../../assets/delete2.svg";
import Tag from "../Tag/Tag";
import SortByIcon from '../../assets/sortBy.svg'

// Utilites/Fuctions Import
import { nameShortner } from "../../utils/utils";

const TopBar = ({
  windowWidth,
  onBack,
  collectionName,
  collectionDesc,
  noOfLinks,
  image,
  isLoggedIn,
  searchHnadeler,
  isOwner,
  editCollectionModalOpener
}) => {
  const [showDropdown, setShowDropdown] = useState(false);


  return (
    <>
      <div className="w-full px-[5rem] mt-2 bg-bgPrimary sm:py-4">
        {/* Actions : Back ,Login , SignUp */}
        <div className="flex justify-between mb-5 bg-bgPrimary sm:mb-2 md:mb-10">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="flex items-center justify-center w-[106px] h-[44px] bg-neutral-200 border border-neutral-300 rounded-md"
            >
              <img src={backarrow} className="w-[20px] h-[20px] mr-1" alt="" />
              <p>Back</p>
            </button>
          </div>
          {windowWidth < 600 && (
            <div className="flex items-center justify-end w-32 h-10">
              <Link to="/">
                <img src={MainLogo} alt="" className="w-32 ml-2 h-14" />
              </Link>
            </div>
          )}
          {windowWidth > 600 && !isLoggedIn && (
            <div className="flex space-x-2">
              <Link
                to="/login"
                className="px-3 py-2 text-base border-2 rounded-lg lexend text-primary border-primary sm:px-7 sm:py-2"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-base border-2 rounded-lg lexend bg-primary border-primary sm:px-7 sm:py-2 text-bgPrimary"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <div className="flex justify-between sm:mt-2 gap-10">
          {/* Collection Details Section */}
          <div className="flex">
            {/* Collection Thumbnail */}
            <div className="flex justify-between w-[294px] h-[137px]">
              <img
                src={
                  image != "undefined" && image !== undefined
                    ? image
                    : defultCollectionImage
                }
                className="block rounded object-cover"
                alt=""
              />
            </div>

            {/* Collection Info */}
            <div className="flex flex-col text-left ml-5">
              {/* Collection Title, Links, Share */}
              <div className="flex gap-2 items-center mb-1">
                <h1 className="text-xl font-bold lexend text-neutral-700">
                  {windowWidth < 600
                    ? nameShortner(collectionName, 14)
                    : collectionName}
                </h1>
                <h1 className="text-base text-neutral-500">
                  {noOfLinks} links
                </h1>
                <button
                  // onClick={onBack}
                  className="flex items-center justify-center w-[76x] h-[24px] bg-neutral-200 border border-primary-500 rounded-[40px] p-2"
                >
                  <img src={share} className="w-[20px] h-[20px] mr-1" alt="" />
                  <p className="text-[14px] text-neutral-700 ">Share</p>
                </button>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Tag name="public" />
                <Tag name="Design" />
                <Tag name="UI/UX" />
              </div>

              <p className="w-full mt-2 text-sm ">
                {windowWidth < 600
                  ? nameShortner(collectionDesc, 18)
                  : collectionDesc}
              </p>
            </div>
          </div>

          {/* Collection Actions */}
          {windowWidth > 600 && (
            <div className="flex justify-center gap-2">
              {/* Add bookmark */}
              <button className="flex">
                <img src={addIcon} />
              </button>
              {/* Edit */}
              <button className="flex" onClick={editCollectionModalOpener}>
                <img src={editIcon} />
              </button>
              {/* Delete */}
              <button className="flex">
                <img src={deleteIcon} />
              </button>
            </div>
          )}
        </div>

        {/* Search Bar and Filter */}
        <div className="flex mt-5 gap-2">
          <Search onSearch={searchHnadeler} />
          <div onClick={() => setShowDropdown(!showDropdown)} className="w-48  cursor-pointer h-[46px] relative p-4 flex items-center justify-center rounded-lg border-neutral-300 bg-neutral-200 gap-2 border">
                <img src={SortByIcon} alt="" />
                <span className="text-sm font-medium">Sort by</span>

                {/* dropdown */}
                {showDropdown &&
                  <div className="w-[188px] rounded border absolute z-50 bottom-[-105px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                    <p className="text-base font-normal text-neutral-800">Recently Added</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800">Alphabetically</p>
                  </div>
                }
              </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
