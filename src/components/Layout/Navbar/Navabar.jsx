import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import MainLogo from "../../../assets/mainLogo.svg";
import darkModeLogo from '../../../assets/darkMode/mainlogoWhite.svg'
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ToggleMode from "../../UI/Toggler/ToggleMode";
import { useContext } from "react";
import { switchMode } from "../../../hooks/switchMode";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { logout } from "../../../store/Slices/user.slice";
import { motion } from "framer-motion";
// images
import Hamburger from '../../../assets/landingPage/hamburger.svg'
import Close from '../../../assets/landingPage/closeIcon.svg'
import WhiteHamburgerIcon from '../../../assets/darkMode/menu.svg'
import WhiteCloseIcon from '../../../assets/darkMode/cancelWhite.svg'
import home from "../../../assets/homeSidebar.svg";
import settings from "../../../assets/settingsSidebar.svg";
import navigation from "../../../assets/navSidebar.svg";
import saved from "../../../assets/bmSidebar.svg";
import energy from "../../../assets/energy.svg";
import ActiveSettings from '../../../assets/blueSettings.svg'
import ActiveExplore from '../../../assets/blueExplore.svg'
import ActiveHome from '../../../assets/blueHome.svg'
import ActiveSaved from '../../../assets/outlinedSaved.svg'
import NavbarItem from "../Sidebar/NavbarItem";

const Navabar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useLocation();
  const auth = useSelector(state => state.auth)
  const [isHovered, setIsHovered] = useState(false);
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
  const menuItem = [
    {
      name: "Home",
      link: `/${auth.username}`,
      icon: home,
      activeIcon: ActiveHome
    },
    {
      name: "Explore",
      link: "/explore",
      icon: navigation,
      activeIcon: ActiveExplore
    },
    {
      name: "Saved Collection",
      link: "/saved",
      icon: saved,
      activeIcon: ActiveSaved
    },
  ];
  // dark and light mode switch
  const { selectedMode, setSelectedMode } = useContext(switchMode)

  // handling theme switch
  const handleSwitchMode = (value) => {
    setSelectedMode(value)
  }

  const logoutHandler = () =>{
    dispatch(logout());
    navigate("/login");
  }

  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  }

  const windowWidth = useMediaQuery()

  return (
    <div className={`flex mb-[0.5rem] md:mb-[1rem] py-[0.5rem] px-[1rem] sm:px-8 3xl:px-[2rem] relative justify-between items-center w-full border-b  ${selectedMode === "dark" ? "bg-dark-primary border-dark-secondary" : "border-neutral-200 bg-neutral-50"}`}>
        <div className="flex items-center justify-start my-auto mr-[1rem] align-center w-32 h-10">
        {(windowWidth < 768 || !auth.isLoggedIn)&& 
          <Link to="/">
            {selectedMode === "light" ?
              <img src={MainLogo} alt="" className="w-32 h-14" />
              :
              <img src={darkModeLogo} alt="" className="w-32 h-14" />
            }
          </Link>
        }
        </div>
      
      <div className="flex flex-row items-center">
        {/* dark mode and light mode */}
        <ToggleMode
          handleSwitchMode={handleSwitchMode}
          selectedMode={selectedMode}
        />
      {auth.isLoggedIn && <button onClick={handleMenu} className="ml-[1rem] block md:hidden min-w-max z-[101]">
       {switchMode === "light"?
        <img src={!sideMenuOpen ? Hamburger : Close} alt="" className="w-6 h-6"/>
        :
        <img src={!sideMenuOpen ? WhiteHamburgerIcon : WhiteCloseIcon} alt="" className="w-6 h-6"/>
       }
      </button>}
      <div className={`sidebar absolute top-[calc(100%+2px)] right-0 ${selectedMode === "dark" ? "bg-dark-primary border-r border-dark-secondary" : "bg-neutral-50 border-r border-neutral-200"} w-screen z-[100] border-b-2 px-[2rem] py-[3rem] transition ${sideMenuOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>
      <div className="flex flex-col items-start justify-start gap-4">
        {menuItem.map(({ name, link, icon, activeIcon }) => (
          <NavbarItem
            name={name}
            link={link}
            icon={icon}
            isActive={link === state.pathname}
            key={name}
            activeIcon={activeIcon}
            selectedMode={selectedMode}
          />
        ))}
        {/* Temorary until setting page come */}
        <p className={` relative flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer border-1 text-base ${selectedMode === "dark" ? "text-[#B3B3B3] hover:text-primary-500 hover:bg-dark-border" : "text-[#636363] hover:bg-primary-50 hover:text-primary-500"}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {
            isHovered ?
              <img src={ActiveSettings} alt=""/>
              :
              <img src={settings} alt=""/>
          }
          <span>Settings</span>
          {isHovered && <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-4 right-0 z-10 w-[113px] bg-primary-500 rounded-xl rounded-bl-none  flex flex-col justify-center shadow-md`}
          >
            <p
              className="px-4 py-2 text-xs font-medium text-center text-white ">
              Coming Soon
            </p>
          </motion.div>}
        </p>
      </div>
      {isLoggedIn && <Button onClick={logoutHandler} className={`px-[9.6px] py-[1rem] mt-[2rem] rounded-[4.8px] text-[0.75rem] h-6 w-full flex  ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"} transition-all duration-200 rounded-md hover:scale-110 border border-error-500 bg-white-10`}>Logout</Button>}
      </div>
      <nav className="ml-[1rem] hidden md:flex items-center justify-end w-full gap-5 max-w-[1500px] ">
        {(navabrItem.map(({ name, link }) => (
          <a href={link} target="_blank" className="flex items-center justify-center rounded" key={link} rel="noreferrer">
            <span className={`text-base font-normal text-center ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"} `}>
              {name}
            </span>
          </a>
        )))}
        {isLoggedIn && <Button onClick={logoutHandler} className={`py-[1rem] rounded-[4.8px] text-[0.75rem] h-6 w-max flex  ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"} transition-all duration-200 rounded-md hover:scale-110 border border-error-500 bg-white-10`}>Logout</Button>}
      </nav>
      {!isLoggedIn && <a href="https://chrome.google.com/webstore/detail/linkcollect/knekpacpcgkieomkhhngenjeeokddkif" rel="noreferrer" target="_blank"><Button className="ml-[0.5rem] sm:ml-[1rem] py-[1rem] rounded-[4.8px] text-[0.75rem] font-normal h-6 w-max">Try LinkCollect</Button></a>}
      </div>
    </div>
  );
};

export default Navabar;
