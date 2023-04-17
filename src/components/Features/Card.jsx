import React from 'react'

const Card = ({img,title,details}) => {
  return (
    <div className='w-[361px] h-[200px] bg-[#EEEEFF] flex flex-col justify-start gap-4 px-4 py-4'>
<img src={img} alt="" className='w-[47px] h-[47px]' />
<p className='w-[150px] h-[20px] lexend font-semibold text-[13.6527px] leading-[100%] text-textPrimary text-start'>{title}</p>
<p className='w-[320px] h-[42px] lexend text-[11.38px] leading-[19px] text-textPrimary text-start'>{details}</p>
    </div>
  )
}

export default Card;