import React from 'react'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { switchMode } from '../../../hooks/switchMode'
const Tab = ({ onClick, id, aria_controls, activeTab, title, onMouseEnter, onMouseLeave, isHover, hoveredTab }) => {
    const { selectedMode } = useContext(switchMode)
    return (
        <button
            className={`inline-block relative pl-0 font-normal text-xs ${activeTab === aria_controls ? selectedMode === "dark" ? 'text-white' : 'text-neutral-900' : selectedMode === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                }`}
            id={id}
            type="button"
            role="tab"
            aria-controls={aria_controls}
            aria-selected={activeTab === aria_controls}
            onClick={id === "profile-tab" ? onClick : null}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {title}
            {activeTab === aria_controls &&
                <span class="block w-full transition-all duration-1000 h-0.5 bg-primary-500">
                </span>
            }
            {hoveredTab === id && isHover && 
                <motion.div
                    initial={{ opacity: 0, y: 10}}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute bottom-4 -right-28 z-10 w-[113px] bg-primary-500 rounded-xl rounded-bl-none  flex flex-col justify-center shadow-md`}
                >
                    <p
                        className="px-4 py-2 text-xs font-medium text-center text-white ">
                        Coming Soon
                    </p>
                </motion.div>
            }
        </button>
    )
}

export default Tab