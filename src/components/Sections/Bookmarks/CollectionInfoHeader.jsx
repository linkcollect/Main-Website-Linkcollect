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
import ShareCollectionModal from "./ShareCollectionModal";
import BackgroundGradient from "../../UI/BackgroundGraident/BackgroundGradient";




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
      navigate('/login');
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
      navigate('/login');
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
      <ShareCollectionModal onClose={shareModalOpenHandler} isOpen={shareModelOpen} collectionName={collectionName} tags={tags}/>
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
          
        </div>

        {/* Collection Inormation */}
        <div className="flex  justify-between sm:mt-2 gap-10">
          {/* Collection Details Section */}
          <div className="flex gap-4 flex-col w-full overflow-hidden sm:flex-row">
            {/* Collection Thumbnail */}
            {image !== "undefined" && image !== undefined ? (<div className="flex justify-center rounded-sm items-center w-[100%] sm:w-[294px] sm:h-[137px]">
              <img
                src={
                  image !== "undefined" && image !== undefined
                    ? image
                    : ""
                }
                className="block rounded object-cover"
                alt=""
              />
            </div>) : (<BackgroundGradient hashValue={collectionId} title={collectionName} className="sm:w-[294px] sm:h-[137px]" />)}

            {/* Collection Info */}
            <div className="flex flex-col text-left gap-2">
            <div className="flex flex-col sm:flex-row align-center gap-2">
              {/* Collection Title, Links, Share */}
              <div className="flex justify-between sm:justify-start gap-2 items-baseline mb-1">
                <h1 className="text-xl font-bold lexend text-neutral-700">
                  {windowWidth < 640
                    ? nameShortner(collectionName, 50)
                    : collectionName}
                </h1>
                <h1 className="w-[5rem] text-base text-neutral-500">
                  {noOfLinks} links
                </h1>
                
              </div>
              {isOwner?  <button
                  // onClick={onBack}
                  onClick={shareModalOpenHandler}
                  className="flex items-center justify-center px-4 w-min h-[24px] bg-neutral-200 border border-primary-500 rounded-[40px] p-2"
                >
                  <img src={share} className="w-[20px] h-[20px] mr-1" alt="" />
                  <p className="text-[14px] text-neutral-700 ">Share</p>
                </button> : <Link to={`/${collectionUsername}`} className="sm:mt-[2px]">by <span>{collectionUsername}</span></Link>
                }
            </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                <Chip name={isPublic ? "Public" : "Private"} />
                {tags?.length > 0 && tags.map(tag => (<Chip name={tag} />))}
              </div>

              <p className="w-full mt-2 text-sm ">
                {windowWidth > 640
                  ? nameShortner(collectionDesc, 500)
                  : collectionDesc}
              </p>
            </div>
          </div>

          {/* Collection Actions for logged In user*/}
          {windowWidth > 640 && auth.isLoggedIn && isOwner ? (
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
            <div className="hidden sm:flex justify-center gap-3 items-start">
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
