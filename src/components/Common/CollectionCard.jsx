import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/Upvote.svg";
import pinSvg from "../../assets/pinSvg.svg";
import filledPinSvg from "../../assets/filledPinSvg.svg";
import viewsSvg from "../../assets/views.svg";
import defultCollectionImage from "../../assets/defaultCollectio.svg";
import { nameShortner } from "../../utils/utils";
import bmSidebar from "../../assets/bmSidebar.svg";
import upvoted from "../../assets/upvoted.svg"
import saved from "../../assets/saved.svg"
import Chip from "../UI/Chip/Chip";
import IconButton from "../UI/IconButton/IconButton";
import { useDispatch, useSelector } from "react-redux";

const CollectionitemV2 = ({
  id,
  image,
  title,
  links,
  isPublic,
  upvotes,
  isPinned,
  tags,
  username,
  windowWidth,
  isOwner,
  views,
  isSavedOptionVisible,
  onUpvote,
  onDownVote,
  onSave,
  onUnsave
}) => {
  const auth = useSelector(state=>state.auth)
  const isUpvoted = upvotes?.findIndex(userId=>auth.userId===userId)>=0;
  const isSaved = auth.userData.savedCollections?.findIndex(saveId=>saveId===id)>=0;
  const dispatch = useDispatch();

  const upvoteHandler = ()=>{
    if(!isUpvoted){
      dispatch(onUpvote(id,auth.userId));
    }else{
      dispatch(onDownVote(id,auth.userId));
    }
  }

  const saveHandler = () =>{
    if(!isSaved){
      dispatch(onSave(id));
    }else{
      dispatch(onUnsave(id));
    }
  }
 
  return (
    <>
      <div
        className="relative bg-bgPrimary border  border-neutral-300 rounded-lg w-[48%] md:w-[calc(100%/2-24px)] lg:w-[calc(100%/3-24px)] xl:w-[calc(100%/4-24px)] 3xl:w-[calc(100%/5-20px)] group 
        hover:shadow-md h-[210px] transition duration-300 ease-in-out"
      >
        {isOwner && (
          <div
            className={`absolute p-1 transition-all duration-500 rounded-sm cursor-pointer bg-black/[0.20] top-2 left-2 ${!isPinned ? "group-hover:opacity-100 opacity-0" : "opacity-1"}`}
            // onClick={() => {
            //   setIsPinned(!isPinned);
            // }}
          >
            {isPinned ? (
              <img src={filledPinSvg} alt="pin" />
            ) : (
              <img src={pinSvg} alt="pin" />
            )}
          </div>
        )}
        <Link to={`/${username}/c/${id}`}>
          <div className="w-full h-[109px]">
            <img
              src={
                image !== "undefined" && image !== undefined && image !== "null" && image !== null
                  ? image
                  : defultCollectionImage
              }
              className="object-cover w-full h-full rounded-t-md "
              alt="collection img"
            />
          </div>
          <div className="flex items-center justify-between pt-2.5 px-1.5 ">
            <p className="text-sm font-normal text-neutral-900">
              {windowWidth > 700
                ? nameShortner(title, 20)
                : nameShortner(title, 10)}
            </p>
            <p className="text-sm font-normal text-neutral-600">
              {links} Links
            </p>
          </div>
        </Link>
        <div className="flex items-start justify-between pt-2.5 px-1.5 gap-2 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            {isOwner && <Chip name={isPublic ? "Public" :  "Private"}/>}
            {tags?.length > 0 ? tags?.map(tag=> <Chip name={tag}/> ) : <Chip name={`by ${username}`}/>}
          </div>
          <div className="flex items-center w-full justify-between ">
            <div className="flex items-center ">
              {/* veiws */}
              <div className="flex items-center m-1">
                <img src={viewsSvg} alt="views" className="w-5 h-5 mr-1" />
                <p className="text-sm font-normal text-neutral-500 ">
                  {views ? views : 0}
                </p>
              </div>
              {/* votes */}
              <IconButton className="m-1 text-sm font-normal text-neutral-500 " onClick={upvoteHandler}>
                <img src={isUpvoted ? upvoted : upvote} alt="upvote" className="w-4 h-4 mr-1" />
                  {upvotes ? upvotes.length : 0}
              </IconButton>
            </div>

            {/* Saved  */}
          { isSavedOptionVisible &&
            <IconButton className={`gap-1 ${isSaved? 'text-primary-500':"text-neutral-500"}  text-[14px]`} onClick={saveHandler}>
              <img src={isSaved ? saved : bmSidebar}/>{isSaved ? "saved":"save"}
            </IconButton>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionitemV2;
