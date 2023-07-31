import React, { forwardRef } from 'react'
import { classMerge } from '../../../utils/utils'

const IconButton = forwardRef((icon,className,iconClass,onClick,iconRef) => {
    return (
        <button className={classMerge("flex items-center",className)} onClick={onClick}>
        <img
          src={icon}
          alt=""
          ref={ref}
          className={classMerge("block mx-auto cursor-pointer",iconClass)}
        />
        </button>
    )
  })

export default IconButton

