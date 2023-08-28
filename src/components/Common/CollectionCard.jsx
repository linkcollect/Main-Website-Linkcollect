import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import BackgroundGradient from "../UI/BackgroundGraident/BackgroundGradient";

const CollectionitemV2 = React.forwardRef(({
  id,
  image,
  title,
  links,
  isPublic,
  upvotes,
  isPinned,
  description,
  tags,
  username,
  windowWidth,
  isOwner,
  views,
  isSavedOptionVisible,
  onUpvote,
  onDownVote,
  onSave,
  onUnsave,
  onPin
},ref) => {
  const auth = useSelector(state=>state.auth)
  const navigate = useNavigate();
  // LOCAL STATE WILL HELP TO MUTATE THE ITEM SO QUICKLY WHEN IT COMES TO LARGE DATA
  const [isSaved,setIsSaved] = useState(false);
  const [hover, setHover] = useState(false)
  const [isUpvoted,setIsUpvoted] = useState({
    isClicked:false,
    number:0,
  });
  useEffect(()=>{
    if(!auth.isLoggedIn){
      // in this case need to set the upvote length
      setIsUpvoted({
        isClicked:false,
        number:upvotes.length,
      });
      return;
    }
    const isUpvoted = upvotes?.findIndex(userId=>auth.userId===userId)>=0;
    const isSaved = auth.userData.savedCollections?.findIndex(saveId=>saveId===id)>=0;
    setIsSaved(isSaved);
    setIsUpvoted({
      isClicked:isUpvoted,
      number:upvotes.length,
    });
  },[])
  const dispatch = useDispatch();

//   const titleRef = useRef()

//   useEffect(()=>{
//       if (hover) {
//         titleRef.current = title
//       } else {
//           titleRef.current = description
//       }
//   }, [hover])
  const upvoteHandler = (e)=>{
    e.stopPropagation()
    if(!auth.isLoggedIn){
      navigate('/login');
      return;
    }
    if(!isUpvoted.isClicked){
      setIsUpvoted(prev=>({
        isClicked:true,
        number:prev.number+1
      }));
      dispatch(onUpvote(id,auth.userId));
    }else{
      setIsUpvoted(prev=>({
        isClicked:false,
        number:prev.number-1
      }));
      dispatch(onDownVote(id,auth.userId));
    }
  }

  const saveHandler = (e) =>{
    e.stopPropagation()
    if(!auth.isLoggedIn){
      navigate('/login');
      return;
    }
    if(!isSaved){
      setIsSaved(true);
      dispatch(onSave(id));
    }else{
      setIsSaved(false);
      dispatch(onUnsave(id));
    }
  }

 
  return (
    <>

      <div
        className="relative bg-bgPrimary border  border-neutral-300 rounded-lg w-full group 
        hover:shadow-md h-[210px] transition duration-300 ease-in-out cursor-pointer"
        ref={ref}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={()=>navigate(`/${username}/c/${id}`)}

      >
        {isOwner && (
          <IconButton
            className={`z-10 absolute p-1 transition-all duration-500 rounded-sm bg-black/[0.20] top-2 left-2 ${!isPinned ? "group-hover:opacity-100 opacity-0" : "opacity-1"}`}
            onClick={(e)=>onPin(e, id)}
          >
            {isPinned ? (
              <img src={filledPinSvg} alt="pin" />
            ) : (
              <img src={pinSvg} alt="pin" />
            )}
          </IconButton>
        )}
        
          {image !== "undefined" && image !== undefined && image !== "null" && image !== null ? 
          (<div className="w-full h-[109px] relative">
          <img
            src={
              image !== "undefined" && image !== undefined && image !== "null" && image !== null
                ? image
                : defultCollectionImage
            }
            className="object-cover w-full h-full rounded-t-md"
            alt="collection img"
          />
          <div className="absolute rounded-t-md top-0 left-0 w-full h-full z-5 shadow-[inset_0_0_15px_5px_rgba(0,0,0,0.1)]">

          </div>
        </div>
        ) : (<BackgroundGradient hashValue={id} title={!hover ? title : description ? description : title}/>)}
          <div className="flex items-center justify-between pt-2.5 px-1.5 ">
            <p className="text-sm font-normal text-neutral-800">
              {windowWidth > 640
                ? windowWidth > 768 
                  ? windowWidth > 1024 
                    ? windowWidth > 1280 
                      ? nameShortner(title, 18)
                      : nameShortner(title, 22)
                    : nameShortner(title, 18)
                  : nameShortner(title, 22)
                : nameShortner(title, 28)}
            </p>
            <p className="text-sm font-normal text-neutral-600">
              {links} Links
            </p>
          </div>
       
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
                <img src={isUpvoted.isClicked ? upvoted : upvote} alt="upvote" className="w-4 h-4 mr-1" />
                  {isUpvoted.number}
              </IconButton>
            </div>

            {/* Saved  */}
          { isSavedOptionVisible &&
            <IconButton className={`gap-1 ${isSaved? 'text-primary-500':"text-neutral-500"}  text-[14px]`} onClick={saveHandler}>
              <img src={isSaved ? saved : bmSidebar}/>{isSaved ? "":"save"}
            </IconButton>
          }
          </div>
        </div>
      </div>
    </>
  );
})

export default CollectionitemV2;
