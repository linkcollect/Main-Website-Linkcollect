import React, { useState } from 'react'
import Copy from '../../assets/copyIcon.svg'
import Menu from '../../assets/menuIcon.svg'
import Redirect from '../../assets/redirectIcon.svg'

const BookmarkItems = ({Thumbnail,linkTitle,link}) => {
  const [show, setShow] = useState(false)
  const openLink = (link) => {
    window.open(link, '_blank')
  }
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link)
  }
  return (
    <div className='flex items-center justify-between w-full h-[65px] rounded-xl mx-auto my-12 bg-bgPrimary' style={{ border: `1px solid rgba(97, 102, 241, 0.16)` }}>
      <div className="flex items-center gap-5 para mx-4  w-[130px] h-[46px]">
        <img src={Thumbnail} alt="Icon" className='w-[44.68px] h-[46px] rounded-md' />
        <div className="flex flex-col items-start justify-center gap-[2.63px] h-[40px] w-[77px]">
          <p className='font-medium text-start para text-[16px] text-[#232438] w-max h-[21px]'>{linkTitle}</p>
          <p className='text-[#232438] text-start text-[12px] w-[271px] h-[16px] para'>{link}</p>
        </div>
      </div>
      <div className="flex  items-center justify-between w-[138px] h-[45px] gap-[33px] mr-6">
        <div className="flex justify-center gap-2 h-[45px] w-[98.18px] ">
          <div className="w-[45px] h-[45px] bg-[#F7F7F7] rounded-full flex items-center justify-center" onClick={()=>{handleCopy(link)}}>
            <img src={Copy} alt="" className='w-[30.68px] h-[30.68px] mx-auto block cursor-pointer' />

          </div>
          <div className="w-[45px] h-[45px] bg-[#F7F7F7] rounded-full flex items-center justify-center" onClick={()=>{openLink(link)}}>
            <img src={Redirect} alt="" className='w-[30.59px] h-[30.59px] mx-auto block cursor-pointer' />
          </div>
        </div>
        <div className="relative">
        <img src={Menu} alt="" className='w-[36.82px] h-[30.82px] cursor-pointer' onClick={()=>{setShow(!show)}}/>
{show && 
      <div className="w-[156px] h-[88px] flex flex-col items-center absolute justify-center gap-4  bg-white para right-[8px] top-[40px] shadow-lg">
        <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Delete link</div>
        <div className="w-[115px] h-[14px] text-[#232438] para text-[14px] mx-auto text-start cursor-pointer">Add Note</div>
      </div>
}
        </div>
      </div>

    </div>
  )
}

export default BookmarkItems