import React from "react";
import Button from "../../UI/Button/Button";
import MainLogo from "../../../assets/mainLogo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ToggleMode from "../../UI/Toggler/ToggleMode";
import { useState } from 'react'
import { useContext } from "react";
import { switchMode } from "../../../hooks/switchMode";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const Navabar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navabrItem = [
    {
      name: "Contact us",
      link: "http://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77"
    },
    {
      name: "FAQs",
      link: "https://linkcollect.super.site/help"
    },
    {
      name: "Feedback",
      link: "https://forms.gle/Dg5ehCAR4AEZBnF89"
    },
  ];

  // dark and light mode switch
  const { selectedMode, setSelectedMode } = useContext(switchMode)

  // handling theme switch
  const handleSwitchMode = (value) => {
    setSelectedMode(value)
  }

  const windowWidth = useMediaQuery()

  return (
    <div className={`flex justify-between w-full border-b ${selectedMode === "dark" ? "bg-dark-primary border-dark-border" : "border-neutral-200 bg-neutral-50"}`}>

      {windowWidth < 768 &&
        <div className="flex items-center justify-start px-4 my-auto align-center sm:w-32 sm:h-10">
          <Link to="/">
            <img src={MainLogo} alt="" className="w-32 sm:ml-2 h-14" />
          </Link>
        </div>
      }
      <nav className="flex items-center justify-end w-full gap-5 px-8 max-w-[1500px] py-3 ">

        {/* dark mode and light mode */}
        <ToggleMode
          handleSwitchMode={handleSwitchMode}
          selectedMode={selectedMode}
        />

        {(navabrItem.map(({ name, link }) => (
          <a href={link} target="_blank" className="items-center justify-center hidden rounded sm:flex" key={link} rel="noreferrer">
            <span className={`text-base font-normal text-center ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"} `}>
              {name}
            </span>
          </a>
        )))}
        {!isLoggedIn && <a href="https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif" rel="noreferrer" target="_blank"><Button className="px-[9.6px] py-[1rem] rounded-[4.8px] text-[0.75rem] font-normal h-6 w-max">Try LinkCollect</Button></a>}
      </nav>
    </div>
  );
};

export default Navabar;
