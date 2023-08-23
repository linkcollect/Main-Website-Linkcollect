// Package Imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Assets imports
import backarrow from "../../../assets/back-arrow.svg";
import share from "../../../assets/share.svg";
import MainLogo from "../../../assets/mainLogo.svg";
import defultCollectionImage from "../../../assets/defaultCollectio.svg";
import editIcon from "../../../assets/edit.svg";
import addIcon from "../../../assets/add.svg";
import deleteIcon from "../../../assets/delete2.svg";

// Utilites/Fuctions Import
import { nameShortner } from "../../../utils/utils";
import Chip from "../../UI/Chip/Chip";
import EcBookamrkModal from "./ECBookmarkModal";
import Button from "../../UI/Button/Button";
import IconButton from "../../UI/IconButton/IconButton";

const CollectionInfoHeader = ({
  windowWidth,
  onBack,
  collectionName,
  collectionDesc,
  noOfLinks,
  image,
  isOwner,
  editCollectionModalOpener,
  createBookmarkModalOpener,
  tags,
  isPublic,
  collectionId
}) => {

  
  
  return (
    <>
      <div className="w-full bg-bgPrimary pb-2">
        {/* Actions : Back */}
        <div className="flex justify-between bg-bgPrimary mb-5">
          <div className="flex items-center">
            <Button
              onClick={onBack}
              variant="secondaryOutline"
              className="bg-white"
            >
              <img src={backarrow} className="w-[20px] h-[20px] mr-1" alt="" />
              <p>Back</p>
            </Button>
          </div>
          {windowWidth < 600 && (
            <div className="flex items-center justify-end w-32 h-10">
              <Link to="/">
                <img src={MainLogo} alt="" className="w-32 ml-2 h-14" />
              </Link>
            </div>
          )}
        </div>

        {/* Collection Inormation */}
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
                <Chip name={isPublic ? "Public" : "Private"}/>
                {tags?.length>0 && tags.map(tag=>(<Chip name={tag} />))}
              </div>

              <p className="w-full mt-2 text-sm ">
                {windowWidth < 600
                  ? nameShortner(collectionDesc, 18)
                  : collectionDesc}
              </p>
            </div>
          </div>

          {/* Collection Actions */}
          {windowWidth > 600 &&   (
            <div className="flex justify-center gap-2 items-start">
              {/* Add bookmark */}
              <IconButton onClick={createBookmarkModalOpener}>
                <img src={addIcon} />
              </IconButton>
              {/* Edit */}
              <IconButton onClick={editCollectionModalOpener}>
                <img src={editIcon} />
              </IconButton>
              {/* Delete */}
              <IconButton>
                <img src={deleteIcon} />
              </IconButton>
            </div>
          )}
        </div>

       
      </div>
    </>
  );
};

export default CollectionInfoHeader;
