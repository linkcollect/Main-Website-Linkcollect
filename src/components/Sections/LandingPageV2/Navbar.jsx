import React from "react";
import { useNavigate } from "react-router";
// images
import MainLogo from '../../../assets/mainLogo.svg'
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

  return (
    <header className="sticky z-[100] top-0 bg-white h-[4.25rem] w-screen px-[5rem] py-[0.75rem] flex justify-between align-middle border-b-[1px] border-b-neutral-200 text-neutral-700">
      <div className="logo">
        <img src={MainLogo} alt="" className="h-[2.5rem]" />
      </div>
      <nav className="navbar flex align-middle gap-[1.75rem] items-center">
        <a href="#home" rel="noreferrer">Home</a>
        <a href="#features" rel="noreferrer">Feature</a>
        <a href="#pricing" rel="noreferrer">Pricing</a>
        <a href={links.Contact} rel="noreferrer">Contact Us</a>
        <button onClick={() => {navigate('/login')}} className="p-[0.75rem] w-[150px] h-min leading-[calc(1.25rem-4px)] border-2 border-primary-300 rounded-[5px]">Log In</button>
        <button onClick={() => {window.open(links.ExtensionUrl, "_blank")}} className="py-[0.75rem] px-[1rem] w-[175px] h-min leading-[1.25rem] bg-primary-400 rounded-[5px] text-white">Install Extension</button>
      </nav>
    </header>
  )
}

export default Navbar;