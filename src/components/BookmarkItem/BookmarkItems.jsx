import React, { useState } from 'react'
import Copy from '../../assets/copyIcon.svg'
import Menu from '../../assets/menuIcon.svg'
import Redirect from '../../assets/redirectIcon.svg'

const BookmarkItems = ({ Thumbnail, linkTitle, link }) => {
  const [show, setShow] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const openLink = (link) => {
    if (link) {
      window.open(link, '_blank')
    }
  }
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link)
  }
  return (
    <div className='flex items-center justify-between w-full h-[55px] rounded-xl mx-auto py-2 bg-bgPrimary' style={{ border: `1px solid rgba(97, 102, 241, 0.16)` }}>
      <div className="flex items-center gap-5 mx-4  w-[130px] h-[46px]">
        <div className="w-[46px] h-[48px]">
        <img src={Thumbnail} alt="Icon" className='w-[44.68px] h-[46px] rounded-md object-cover' />
        </div>
        <div className="flex flex-col items-start justify-center gap-[2.63px] h-[40px] w-[77px]">
          <p className='font-medium text-start para text-[16px] text-[#232438] w-max h-[21px]'>{linkTitle}</p>
          <p className='text-[#232438] text-start text-[12px] w-[271px] h-[16px] para'>{link}</p>
        </div>
      </div>
      <div className="w-[40%] flex items-center justify-between ">
        <div className='flex items-center justify-center w-20 h-9'>
          <p className='lexend font-light text-xs text-textDark text-center'>21 yrs ago</p>
        </div>
        <div className="flex  items-center justify-center w-[138px] h-[45px] gap-[33px]">
          <div className="flex justify-center items-center gap-2 h-[45px] w-[98.18px] ">
            <div className="w-[35px] h-[35px] bg-[#F7F7F7] rounded-full flex items-center justify-center" onClick={() => { handleCopy(link) }}>
              <img src={Copy} alt="" className='w-[25.68px] h-[25.68px] mx-auto block cursor-pointer' />

            </div>
            <a href={link} className="w-[35px] h-[35px] bg-[#F7F7F7] rounded-full flex items-center justify-center" target='_blank' rel='noreferer'>
              <img src={Redirect} alt="" className='w-[30.59px] h-[30.59px] mx-auto block cursor-pointer' />
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