// Package Imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Assets imports
import backarrow from "../../../assets/back-arrow.svg";
import share from "../../../assets/share.svg";
import MainLogo from "../../../assets/mainLogo.svg";
import defultCollectionImage from "../../../assets/defaultCollectio.svg";
import editIcon from "../../../assets/edit.svg";
import addIcon from "../../../assets/add.svg";
import deleteIcon from "../../../assets/delete2.svg";
import upvoteIcon from "../../../assets/Upvote.svg"
import upvotedIcon from "../../../assets/upvoted.svg"
import savedIcon from "../../../assets/saved.svg"
import saveIcon from "../../../assets/bmSidebar.svg"

// Utilites/Fuctions Import
import { nameShortner } from "../../../utils/utils";

// Components
import Chip from "../../UI/Chip/Chip";
import Button from "../../UI/Button/Button";
import IconButton from "../../UI/IconButton/IconButton";

// Actions
import { upvoteAction,downvoteAction,saveAction,unsaveAction } from "../../../store/actions/bookmarks.action";
import SahreCollectionModal from "./SahreCollectionModal";




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
  deleteCollectionModalHandler,
  tags,
  isPublic,
  upvotes,
  collectionId,
  collectionUsername,
}) => {
  const [isUpvoted,setIsUpvoted] = useState(false);
  const [isSaved,setIsSaved] = useState(false);
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shareModelOpen,setShareMpdelOpen] = useState(false);

  useEffect(()=>{
    const isUpvoted = upvotes?.findIndex(userId=>auth.userId===userId)>=0;
    const isSaved = auth.userData.savedCollections?.findIndex(saveId=>saveId===collectionId)>=0;
    setIsSaved(isSaved);
    setIsUpvoted(isUpvoted);
  },[])

  const upvoteHandler = ()=>{
    if(!auth.isLoggedIn){
      navigate(-1);
      return;
    }
    if(!isUpvoted){
      setIsUpvoted(true);
      dispatch(upvoteAction(collectionId,auth.userId));
    }else{
      setIsUpvoted(false);
      dispatch(downvoteAction(collectionId,auth.userId));
    }
  }

  const saveHandler = () =>{
    if(!auth.isLoggedIn){
      navigate(-1);
      return;
    }
    if(!isSaved){
      setIsSaved(true);
      dispatch(saveAction(collectionId));
    }else{
      setIsSaved(false);
      dispatch(unsaveAction(collectionId));
    }
  }

  const shareModalOpenHandler = () =>{
    setShareMpdelOpen(prev=>!prev);
  }

  

  return (
    <>
      <SahreCollectionModal onClose={shareModalOpenHandler} isOpen={shareModelOpen} collectionName={collectionName} tags={tags}/>
      <div className="w-full bg-bgPrimary pb-2">
        {/* Actions : Back */}
        <div className="flex justify-between bg-bgPrimary mb-5">
          <div className="flex items-center">
            <Button
              onClick={onBack}
              variant="secondaryOutline"
              className="bg-white gap-0 px-4"
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
                {isOwner?  <button
                  // onClick={onBack}
                  onClick={shareModalOpenHandler}
                  className="flex items-center justify-center w-[76x] h-[24px] bg-neutral-200 border border-primary-500 rounded-[40px] p-2"
                >
                  <img src={share} className="w-[20px] h-[20px] mr-1" alt="" />
                  <p className="text-[14px] text-neutral-700 ">Share</p>
                </button> : <Link to={`/${collectionUsername}`}>by <span>{collectionUsername}</span></Link>}
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Chip name={isPublic ? "Public" : "Private"} />
                {tags?.length > 0 && tags.map(tag => (<Chip name={tag} />))}
              </div>

              <p className="w-full mt-2 text-sm ">
                {windowWidth < 600
                  ? nameShortner(collectionDesc, 18)
                  : collectionDesc}
              </p>
            </div>
          </div>

          {/* Collection Actions for logged In user*/}
          {windowWidth > 600 && auth.isLoggedIn && isOwner ? (
            <div className="flex justify-center gap-3 items-start">
              {/* Add bookmark */}
              <IconButton onClick={createBookmarkModalOpener}>
                <img src={addIcon} />
              </IconButton>
              {/* Edit */}
              <IconButton onClick={editCollectionModalOpener}>
                <img src={editIcon} />
              </IconButton>
              {/* Delete */}
              <IconButton onClick={deleteCollectionModalHandler}>
                <img src={deleteIcon} />
              </IconButton>
            </div>
          ) :
            <div className="flex justify-center gap-3 items-start">
              {/* Add bookmark */}
              <IconButton onClick={upvoteHandler}>
                <img src={isUpvoted?upvotedIcon:upvoteIcon} className="w-[19px] h-[19px]"/>
              </IconButton>
              {/* Edit */}
              <IconButton onClick={saveHandler}>
                <img src={isSaved?savedIcon:saveIcon} className="w-[19px] h-[19px]"/>
              </IconButton>
              {/* Delete */}
              <IconButton onClick={shareModalOpenHandler}>
                <img src={share} className="w-[20px] h-[20px]"/>
              </IconButton>
            </div>
          }
        </div>


      </div>
    </>
  );
};

export default CollectionInfoHeader;
