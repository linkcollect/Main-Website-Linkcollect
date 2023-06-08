import React, { useRef, useState, } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/Upvote.svg";
import dot from "../../assets/3dot.svg";
import noUpvote from "../../assets/Vector.svg";
import toogle from "../../assets/toggle.svg";
import paste from "../../assets/paste.svg";
import bin from "../../assets/bin.svg";
import pinSvg from "../../assets/pinSvg.svg";
import filledPinSvg from "../../assets/filledPinSvg.svg";
import viewsSvg from "../../assets/views.svg";
import defultCollectionImage from "../../assets/defaultCollectio.png";
import { nameShortner } from "../../utils/utils";
import approve from "../../assets/approve.svg";
const CollectionitemV2 = ({
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
    votes,
    views,
}) => {
  const copyImageRef = useRef();
  const [copyText, setCopyText] = useState("Copy Link")
  const [display, setDisplay] = useState(false);
  const [isPublic, setIsPublic] = useState(true)
  const  [isPinned, setIsPinned] = useState(false) 
  const menuhandler = () => {
    setDisplay(prev => !prev);
  };
  //collection Popup stuff
  const menuRef = useRef()
  const popupRef = useRef()

  // Popup menu close functiinality if users clocked outside of it
  window.addEventListener("click", e => {
    if (e.target !== popupRef.current && e.target !== menuRef.current && display) {
      setDisplay(false);
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
      <div className="relative bg-bgPrimary border-2  border-grey/50 rounded-lg   w-[48%] sm:w-[294px] group 
        hover:shadow-md transition duration-300 ease-in-out">
       {
          isOwner && (
            <div className="absolute p-0.5 rounded-sm bg-grey/50 top-3 left-3 opacity-0 group-hover:opacity-100 cursor-pointer"  
            onClick={
              () => {
                setIsPinned(!isPinned)
              }
              
            }
          >
              {
                isPinned ? <img src={filledPinSvg} alt="pin" /> : <img src={pinSvg} alt="pin" />
              }
          </div>
          )

       }
          <Link to={`/${username}/c/${id}`}>
              <img src={image !== "undefined" && image !== undefined ? image : defultCollectionImage} className="w-full h-[137px]
                rounded-t-md
              " alt="collection img"
              />
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
          <div className="flex items-center justify-between m-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className=" px-2 bg-[#E5E5EB]  text-lightGrey border border-textSecondary  rounded-full text-[12px] sm:text-sm font-normal">
                      {type ? "Public" : "Private"}
                    </p>
                  <p className="px-2  bg-[#E5E5EB]  text-lightGrey border border-textSecondary  rounded-full text-[12px] sm:text-sm font-normal">
                    Design
                    </p>
                  <p className=" px-2 bg-[#E5E5EB]  text-lightGrey border border-textSecondary  rounded-full text-[12px] sm:text-sm font-normal">
                    Product
                    </p>
                  </div>
                  <div className="flex items-center mt-3">
                      {/* veiws */}
                      <div className="flex items-center m-1">
                              <img src={viewsSvg} alt="views" className="w-5 h-5 mr-1" />
                          <p className="text-textPrimary font-light text-[12px]">
                              {
                                  views ? views : 0
                              } 
                          </p>
                      </div>
                      {/* votes */}
                      <div className="flex items-center m-1">
                          <img src={upvote} alt="upvote" className="w-4 h-4 mr-1"/>

                          <p className=" font-light text-[12px]">
                              {
                                upVote ? upVote : 0
                              } 
                          </p>
                      </div>
                  </div>
                </div>
          </div>
        </div>
    </>
  );
};

export default CollectionitemV2;
