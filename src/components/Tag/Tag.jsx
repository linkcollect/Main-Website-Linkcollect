import React from 'react'

const Tag = ({name}) => {
  return (
    <p className="px-2 bg-neutral-200  text-neutral-500 border border-neutral-300  rounded-[24px] text-[10px] sm:text-xs  font-normal h-[18px] w-fit">
        {name}
    </p>
  )
}

export default Tag