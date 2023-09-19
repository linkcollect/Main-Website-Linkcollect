import React from "react";
import { motion } from "framer-motion";

const BookmarkNoteModal = ({ className, note }) => {
    return(
        <motion.div className={`${className} z-[100] bottom-[calc(100%_+_1rem)] right-[26%] `}>
            <div className="relative h-auto min-w-[10rem] z-[100] max-w-[12rem] bg-white rounded-md shadow-[0px_0px_45px_0px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:h-[25px] after:w-[25px] after:bottom-[-22px] after:left-[70%] after:shadow-[0px_0px_30px_5px_rgba(0,0,0,0.3)] after:bg-white after:[clip-path:_polygon(0_0,_100%_0,_50%_60%)] after:z-[99] p-[0.5rem]">
                <h3 className="text-[0.75rem] text-left">Curator's note</h3>
                <p className="text-neutral-500 text-left text-[0.7rem] leading-[0.75rem]">{note}</p>
            </div>
        </motion.div>
    )
}

export default BookmarkNoteModal