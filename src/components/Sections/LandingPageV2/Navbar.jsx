import React, { useState } from "react";
import { useNavigate } from "react-router";
// images
import MainLogo from '../../../assets/mainLogo.svg'
import Hamburger from '../../../assets/landingPage/hamburger.svg'
import Close from '../../../assets/landingPage/closeIcon.svg'
// others
const links = {
    extensionUrl: 'https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif/',
    contact: 'https://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
    feedback: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
    instagram: 'https://www.instagram.com/linkcollect/',
    discord: 'https://discord.gg/askwhy-1074020862489022514',
    x: 'https://x.com/linkcollect_io'
}

const Navbar = () => {
  const navigate = useNavigate()
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  }

  return (
    <header className="relative lg:sticky z-[100] top-0 bg-white h-[4.25rem] w-screen px-[clamp(1rem,5vw,5rem)] py-[0.75rem] flex justify-between align-middle border-b-[1px] border-b-neutral-200 text-neutral-700">
      <div className="logo">
        <img src={MainLogo} alt="" className="h-[2.5rem]" />
      </div>
      <button onClick={handleMenu} className="block lg:hidden z-[101]">
        <img src={!sideMenuOpen ? Hamburger : Close} alt="" />
      </button>
      <nav className={`navbar top-[calc(100%_+_2px)] lg:top-0 right-0 py-[3rem] lg:py-0 border-b lg:border-none border-b-neutral-300 absolute lg:relative lg:w-auto w-screen bg-white z-[100] flex flex-col lg:flex-row align-middle gap-[1.75rem] items-center justify-center transition-all lg:transition-none lg:translate-x-0 ${sideMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <a href="#home" rel="noreferrer">Home</a>
        <a href="#features" rel="noreferrer">Feature</a>
        <a href="#pricing" rel="noreferrer">Pricing</a>
        <a href={links.contact} rel="noreferrer">Contact Us</a>
        <button onClick={() => {navigate('/login')}} className="p-[0.75rem] w-[150px] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px] hover:scale-[1.02] hover:shadow-md transition">Log In</button>
        <button onClick={() => {window.open(links.extensionUrl, "_blank")}} className="py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white hover:scale-[1.05] hover:shadow-md transition">Install Extension</button>
      </nav>
    </header>
  )
}

export default Navbar;