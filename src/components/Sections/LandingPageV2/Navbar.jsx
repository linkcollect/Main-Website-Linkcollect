import React from "react";
import { useNavigate } from "react-router";
// images
import MainLogo from '../../../assets/mainLogo.svg'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 bg-white h-[4.25rem] w-screen px-[5rem] py-[0.75rem] flex justify-between align-middle border-b-[1px] border-b-neutral-200 text-neutral-700">
      <div className="logo">
        <img src={MainLogo} alt="" className="h-[2.5rem]" />
      </div>
      <nav className="navbar flex align-middle gap-[1.75rem] items-center">
        <a href="http://localhost:3000/landing" rel="noreferrer">Home</a>
        <a href="http://localhost:3000/landing" rel="noreferrer">Feature</a>
        <a href="http://localhost:3000/landing" rel="noreferrer">Pricing</a>
        <a href="http://localhost:3000/landing" rel="noreferrer">Contact Us</a>
        <button onClick={() => {navigate('/login')}} className="p-[0.75rem] w-[150px] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px]">Log In</button>
        <button onClick={() => {window.location.href = 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/'}} className="py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white">Install Extension</button>
      </nav>
    </header>
  )
}

export default Navbar;