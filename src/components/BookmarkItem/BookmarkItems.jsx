import React, { useState } from 'react'
import Copy from '../../assets/copyIcon.svg'
import Menu from '../../assets/menuIcon.svg'
import Redirect from '../../assets/redirectIcon.svg'
import { nameShortner,getOrigin, fromNow } from '../../utils/utils'

const BookmarkItems = ({ id, name, url, favicon,windowWidth,updatedAt }) => {
  const [show, setShow] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link)
  }
  return (
    <div className='flex items-center justify-between w-full h-[55px] rounded-xl mx-auto py-2 bg-bgPrimary' style={{ border: `1px solid rgba(97, 102, 241, 0.16)` }}>
      <div className="flex items-center gap-2 sm:gap-5 mx-4  w-[130px] h-[46px]">
        <div className="w-[46px] h-[48px] flex items-center justify-center">
          <img src={favicon} alt="Icon" className='w-[30.68px] h-[30px] rounded-md object-cover' />
        </div>
        <div className="flex flex-col items-start justify-center gap-[2.63px] w-12 h-10 sm:h-10 sm:w-[4.8rem]">
          <p className='font-medium text-start para text-[12px] sm:text-[16px] text-textPrimary sm:w-max sm:h-[21px]'>{nameShortner(name,35)}</p>
          <p className='text-textPrimary text-start text-[10px] sm:text-[12px] sm:w-[271px] sm:h-[16px] para'>{nameShortner(getOrigin(url),22)}</p>
        </div>
      </div>
      <div className="w-[40%] flex items-center justify-between ">
        {windowWidth > 700 && <div className='flex items-center justify-center w-20 h-9'>
          <p className='lexend font-light text-xs text-textDark text-center'>{fromNow(updatedAt)}</p>
        </div>}
        <div className="flex  items-center justify-end sm:justify-center w-[138px] h-[45px] gap-[33px]">
          <div className="flex justify-center items-center gap-2 h-[45px] w-[98.18px] ">
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-[#F7F7F7] rounded-full flex items-center justify-center" onClick={() => { handleCopy(url) }}>
              <img src={Copy} alt="" className='w-4 h-4 sm:w-6 sm:h-6 mx-auto block cursor-pointer' />

            </div>
            <a href={url} className="w-8 h-8 sm:w-9 sm:h-9 bg-[#F7F7F7] rounded-full flex items-center justify-center" target='_blank' rel='noreferer'>
              <img src={Redirect} alt="" className='w-7 h-7 mx-auto block cursor-pointer' />
            </a>
          </div>
          {isLoggedIn &&
            <div className="relative pr-4">
              <div className='w-4  h-4 flex items-center justify-center'>
                <img src={Menu} alt="" className='w-[25px] h-[25px] cursor-pointer' onClick={() => { setShow(!show) }} />
              </div>
              {show &&
                <div className="bg-bgPrimary w-[156px] h-[88px] flex flex-col items-center absolute justify-center gap-4 right-[8px] top-[40px] shadow-lg">
                  <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Delete link</div>
                  <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Add Note</div>
                </div>
              }
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default BookmarkItems