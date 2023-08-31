import React from 'react'
import { NavLink } from 'react-router-dom'
const NavbarItem = ({name,link,isActive,icon, activeIcon, selectedMode}) => {
  return (
    <NavLink key={link} to={link} className={`flex flex-row items-center justify-start w-full gap-3 group px-2 py-3 rounded-md cursor-pointer border-1 text-base ${selectedMode === "dark" ? isActive?"text-primary-500 bg-dark-border" : "text-[#B3B3B3] hover:text-primary-500 hover:bg-dark-border" : ""} ${selectedMode === "light" ? isActive?' text-primary-500 bg-primary-50  hover:bg-primary-50 hover:text-primary-500':  ' text-[#636363] hover:bg-primary-50 hover:text-primary-500': "" } `}>
      {/* showing blue icon on hover */}
      <img src={isActive? activeIcon: icon} className='block group-hover:hidden w-[17px] h-[17px]'/>
      
      <img src={activeIcon} className='hidden group-hover:block w-[17px] h-[17px]'/>
      <span>{name}</span>
    </NavLink>
  )
}

export default NavbarItem