import React from 'react'
import { NavLink } from 'react-router-dom'
const NavbarItem = ({name,link,isActive,icon}) => {
  return (
    <NavLink key={link} to={link} className={`flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer border-1 text-base ${isActive ? ' text-primary-500 bg-primary-50 ':' text-neutarl-50 '} hover:bg-primary-50 hover:text-primary-500`}>
      <img src={icon} /><span>{name}</span>
    </NavLink>
  )
}

export default NavbarItem