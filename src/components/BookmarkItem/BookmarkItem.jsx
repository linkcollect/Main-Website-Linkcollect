// Package Imports
import React, { useRef, useState, useEffect } from "react";

// Assets Imports
import copyIcon from "../../assets/copyIcon.svg";
import menuIcon from "../../assets/3dot.svg";
import redirectIcon from "../../assets/redirectIcon.svg";
import approveIcon from "../../assets/approve.svg";
import bookmarkDefalutIcon from "../../assets/bookmarkDefault.svg";

// Utils Imports
import { nameShortner, getOrigin, fromNow } from "../../utils/utils";

const BookmarkItem = ({
  id,
  name,
  url,
  favicon,
  windowWidth,
  updatedAt,
  user,
  clickedId,
  setClickedId,
  isAllBookmarksSeleted,
  isStillOneBookmarkSelected,
  isSelectedAlready,
  onSelectedBookmark,
  onUnSelectBookamrk
}) => {
  // to see if checked or not
  const [checked, setChecked] = useState(false);
  useEffect(()=>{
    if(isSelectedAlready>=0 && !checked){
      setChecked(true);
    }else
      if(!checked && isAllBookmarksSeleted){
        console.log("hello")
        setChecked(true);
      }else 
      // If all items get unselected there is no items is remaining
      if(checked && !isStillOneBookmarkSelected){
        console.log("Hello")
        setChecked(false);
      }
  },[isAllBookmarksSeleted])


  const copyRef = useRef();

  const handleCheck = (e) => {
    
    if (e.target.checked) {
      setChecked(true);
      onSelectedBookmark(id);
    }
    else {
      setChecked(false);
      onUnSelectBookamrk(id)
    }
  };
  

  const onCopy = () => {
    if (copyRef) copyRef.current.src = approveIcon;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      copyRef.current.src = copyIcon;
    }, 1500);
  };

  return (
    <div className="cursor-pointer relative flex items-center justify-between w-full h-[60px] rounded-xl bg-neutral-100 border border-neutral-200  duration-200 transition-all group">
      {/* Note this below input is to be shown to owner only after  implementing state mangement resolve it */}
      <div className="flex">
      <input
        type="checkbox"
        className={` cursor-pointer custom-checkbox rounded-md ${
          isStillOneBookmarkSelected 
            ? "ml-2"
            : "opacity-0 group-hover:opacity-100 absolute top-0 -left-1"
        } `}
        checked={checked}
        onChange={handleCheck}
      />
      {/* Bookamrk Info: Name , Link, Image */}
      <div className="flex items-center">
        {/* Bookmark Image */}
        <div className="w-[48px] h-[48px] flex items-center justify-center">
          <img
            src={
              favicon !== "undefined" && favicon != undefined
                ? favicon
                : bookmarkDefalutIcon
            }
            alt="Icon"
            className="w-[30.68px] h-[30px] rounded-md object-contain"
          />
        </div>

        {/* Bookmark Name, Link name */}
        <div className="flex flex-col items-start justify-center gap-[2.63px] h-10 sm:h-10">
          {/* Bookmark Name */}
          <p className="font-normal text-start para text-[16px] text-neutral-900  sm:w-max sm:h-[21px]">
            {windowWidth < 600
              ? nameShortner(name, 20)
              : nameShortner(name, 60)}
          </p>

          {/* Link Name */}
          <p className="text-start text-[14px] sm:text-[12px] sm:w-[271px] text-neutral-500 mt-[0.1rem]">
            {windowWidth < 700
              ? nameShortner(getOrigin(url), 15)
              : nameShortner(getOrigin(url), 30)}
          </p>
        </div>
      </div>
      </div>

      {/* Timestamp, Actions: Note, Open Link, Popup menu */}
      <div className="flex items-center gap-20">
        {/* Timestamp */}
        <p className="text-xs font-medium whitespace-nowrap  text-neutral-500 ">
          Added {fromNow(updatedAt)}
        </p>

        {/* Actions: Note, Open Link, Popup menu */}
        <div className="flex gap-4 mr-2">
          <button
            onClick={onCopy}
            className="flex items-center justify-center "
          >
            <img
              ref={copyRef}
              src={copyIcon}
              alt=""
              className="block mx-auto cursor-pointer"
            />
          </button>
          <button className="flex items-center">
            <img
              src={redirectIcon}
              alt=""
              className="block mx-auto cursor-pointer "
            />
          </button>
          <div className="relative">
          <button className="flex items-center" onClick={()=>setClickedId(prev => prev==id ? null : id)}>
            <img
              src={menuIcon}
              alt=""
              className="block mx-auto cursor-pointer"
            />
          </button>
          {clickedId == id &&
                  <div className="w-[188px] rounded border absolute z-[9990] bottom-[-184px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                    <p className="text-base font-normal text-neutral-800" onClick={()=>setClickedId(null)}>Edit</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800" onClick={()=>setClickedId(null)}>Pin</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800" onClick={()=>setClickedId(null)}>Move</p>
                    <hr className="w-full border border-neutral-300" />
                    <p className="text-base font-normal text-neutral-800" onClick={()=>setClickedId(null)}>Delete</p>
                  </div>
                }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItem;
