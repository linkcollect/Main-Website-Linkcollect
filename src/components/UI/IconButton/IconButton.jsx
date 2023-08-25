import React, { forwardRef } from 'react'
import { classMerge } from '../../../utils/utils'

const IconButton = forwardRef(({className,onClick,...props}) => {
    return (
        <button className={classMerge("flex items-center justify-center",className)} onClick={onClick} {...props}/>
    )
})

export default IconButton

