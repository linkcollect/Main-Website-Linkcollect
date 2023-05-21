import React, { useRef, useState } from 'react'
import Copy from '../../assets/copyIcon.svg'
import Menu from '../../assets/menuIcon.svg'
import Redirect from '../../assets/redirectIcon.svg'
import approve from "../../assets/approve.svg"

import { nameShortner,getOrigin, fromNow } from '../../utils/utils'

const BookmarkItems = ({ id, name, url, favicon,windowWidth,updatedAt,user }) => {
  const [show, setShow] = useState(false)
  const copyRef = useRef()
  const onCopy = () => {
    if(copyRef) copyRef.current.src=approve;
    navigator.clipboard.writeText(url);
    setTimeout(()=>{
      copyRef.current.src=Copy
    },1500);
  };
  return (
    <div  className='cursor-pointer flex items-center justify-between w-full h-[55px] rounded-xl mx-auto py-2 bg-bgPrimary hover:bg-bookmarkItemBG  duration-200 hover:scale-[1.01] transition-all ' style={{ border: `1px solid rgba(97, 102, 241, 0.16)` }}>
      <a href={url} target='_blank' rel='noreferer' className="flex items-center gap-2 sm:gap-5 mx-4  w-[130px] h-[46px]">
        <div className="w-[46px] h-[48px] flex items-center justify-center">
          <img src={favicon} alt="Icon" className='w-[30.68px] h-[30px] rounded-md object-cover' />
        </div>
        <div className="flex flex-col items-start justify-center gap-[2.63px] w-12 h-10 sm:h-10 sm:w-[4.8rem]">
          <p className='w-64 font-medium text-start para text-[12px] sm:text-[16px] text-textPrimary sm:w-max sm:h-[21px]'>{windowWidth<600? nameShortner(name,20) : nameShortner(name,60)}</p>
          <p className='w-56 text-textPrimary text-start text-[10px] sm:text-[12px] sm:w-[271px] sm:h-[16px] para'>{windowWidth<700? nameShortner(getOrigin(url),15): nameShortner(getOrigin(url),30)}</p>
        </div>
      </a>
      <div className="w-[40%] flex items-center justify-between ">
        {windowWidth > 700 && <div className='flex items-center justify-center w-20 h-9'>
          <p className='text-xs font-light text-center lexend text-textDark'>{fromNow(updatedAt)}</p>
        </div>}
        <div className="flex  items-center justify-end sm:justify-center w-[138px] h-[45px] gap-[33px]">
          <div className="flex justify-center items-center gap-2 h-[45px] w-[98.18px] ">
            <button onClick={onCopy} className="w-7 h-7 sm:w-9 sm:h-9 bg-[#F7F7F7] rounded-full flex items-center justify-center">
              <img ref={copyRef} src={Copy} alt="" className='block w-4 h-4 mx-auto cursor-pointer sm:w-6 sm:h-6' />

            </button>
            <a href={url} className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F7F7F7] rounded-full flex items-center justify-center" target='_blank' rel='noreferer'>
              <img src={Redirect} alt="" className='block mx-auto cursor-pointer w-7 h-7' />
            </a>
          </div>
            {user.isLoggedIn && user.isOwner && <div className="relative pr-4">
              <div className='flex items-center justify-center w-4 h-4'>
                <img src={Menu} alt="" className='w-[25px] h-[25px] cursor-pointer' onClick={() => { setShow(!show) }} />
              </div>
              {show &&
                <div className="bg-bgPrimary w-[156px] h-[88px] flex flex-col items-center absolute justify-center gap-4 right-[8px] top-[40px] shadow-lg">
                  <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Delete link</div>
                  <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Add Note</div>
                </div>
              }
            </div>}
        </div>
      </div>

    </div>
  )
}

export default BookmarkItems