import React from 'react';
import { motion } from 'framer-motion';
function ToolTip() {
  return (
    <motion.div className={`absolute z-[100] top-4 left-10 `}>
      <div
        className="relative h-auto z-[100] min-w-max 
       bg-white rounded-md shadow-[0px_0px_45px_0px_rgba(0,0,0,0.2)] 
       after:content-[''] after:absolute after:h-[25px] after:w-[25px] 
       after:top-0 after:-left-2 after:shadow-[0px_0px_30px_5px_rgba(0,0,0,0.3)]
        after:bg-white after:[clip-path:_polygon(0_0,_100%_0,_50%_60%)] after:z-[99] p-[0.5rem]"
      >
        <p className="text-neutral-500 text-left text-[0.8rem] leading-[0.95rem]">
          Duplicate collection
        </p>
      </div>
    </motion.div>
  );
}

export default ToolTip;
