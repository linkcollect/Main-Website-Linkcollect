import React, { useContext, useState } from 'react';
import mainlogo from '../../../assets/mainLogo.svg';
import mainlogoWhite from '../../../assets/darkMode/mainlogoWhite.svg';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/defaultImage.svg';
import home from '../../../assets/homeSidebar.svg';
import settings from '../../../assets/settingsSidebar.svg';
import navigation from '../../../assets/navSidebar.svg';
import saved from '../../../assets/bmSidebar.svg';
import energy from '../../../assets/energy.svg';
import BlueUpgrade from '../../../assets/UpgradeBlue.svg';
import ActiveSettings from '../../../assets/blueSettings.svg';
import ActiveExplore from '../../../assets/blueExplore.svg';
import ActiveHome from '../../../assets/blueHome.svg';
import ActiveSaved from '../../../assets/outlinedSaved.svg';
import NavbarItem from './NavbarItem';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { login } from '../../../api-services/authService';
import { switchMode } from '../../../hooks/switchMode';

const Sidebar = ({ user, handleSetUser, windowWidth }) => {
  const state = useLocation();
  const auth = useSelector(state => state.auth);

  const [isHovered, setIsHovered] = useState(false);

  //   console.log(auth);
  const menuItem = [
    {
      name: 'Home',
      link: `/${auth.username}`,
      icon: home,
      activeIcon: ActiveHome,
    },
    {
      name: 'Explore',
      link: '/explore',
      icon: navigation,
      activeIcon: ActiveExplore,
    },
    {
      name: 'Saved Collection',
      link: '/saved',
      icon: saved,
      activeIcon: ActiveSaved,
    },
    {
      name: 'Settings',
      link: '/settings',
      icon: settings,
      activeIcon: ActiveSettings,
    },
  ];

  const { selectedMode } = useContext(switchMode);

  return (
    <aside
      className={`${
        selectedMode === 'dark'
          ? 'bg-dark-primary border-r border-dark-secondary'
          : 'bg-neutral-100 border-r border-neutral-300'
      }  ${
        windowWidth < 700 ? 'h-[350px] w-full ' : 'w-[270px]'
      }  overflow-y-scroll scrollbar-hidden no-scrollbar`}
    >
      <div
        className={`flex flex-col top-0 items-center justify-between h-[100vh] w-full  ${
          user ? '' : 'pb-2'
        } `}
      >
        {/* Profile Info */}
        <div className="flex flex-col gap-8">
          <Link
            to="/"
            className="flex items-center justify-center w-full py-4 "
          >
            <img
              src={selectedMode === 'dark' ? mainlogoWhite : mainlogo}
              alt=""
              className="w-40 h-10 mx"
            />
          </Link>
          <div
            className={`w-full border-2 ${
              selectedMode === 'light'
                ? 'border-[#D1D1DB]'
                : 'border-dark-secondary'
            }  rounded-lg py-3 px-3 `}
          >
            <div className=" h-[100px] w-[100px] mx-auto mb-2 overflow-hidden">
              <img
                src={
                  auth.userData.profilePic
                    ? auth.userData.profilePic
                    : defaultImage
                }
                className="object-cover w-full h-full rounded-full"
                alt=""
              />
            </div>
            <p
              className={` ${
                selectedMode === 'dark' ? 'text-white' : 'text-black'
              } font-bold text-[16px]`}
            >
              {auth.userData.name}
            </p>

            <div
              className={`flex flex-col justify-evenly items-start text-base font-normal ${
                selectedMode === 'dark'
                  ? 'text-borderPrimary'
                  : 'text-neutral-600'
              } gap-2 pt-8`}
            >
              <div className="flex flex-row justify-between items-center gap-[118px] text-xs">
                <p>Link Saved</p>
                <p className="ml-1">{auth.userData.totalLinks}</p>
              </div>
              <div className="flex flex-row items-center justify-between gap-24 text-xs whitespace-nowrap">
                <p>Total Collection</p>
                <p>{auth.userData.totalCollections}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
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
            {/* <p className={` relative flex flex-row items-center justify-start w-full gap-3 px-2 py-3 rounded-md cursor-pointer border-1 text-base ${selectedMode === "dark" ? "text-[#B3B3B3] hover:text-primary-500 hover:bg-dark-border" : "text-[#636363] hover:bg-primary-50 hover:text-primary-500"}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {
                isHovered ?
                  <img src={ActiveSettings} />
                  :
                  <img src={settings} />
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
            </p> */}
          </div>
        </div>

        {/* Upgrade button */}

        <div className="flex items-center justify-center w-full mx-5 my-5">
          {/* showing pro user to premium user */}
          {auth.userData.isPremium === true ? (
            <div
              className={` font-normal cursor-pointer outline-none px-4 py-3 text-primary-500 border border-primary-500  rounded-lg  flex justify-start items-center gap-2 w-11/12  ${
                windowWidth < 700 ? 'hidden' : ''
              } relative`}
            >
              <img src={BlueUpgrade} alt="" />
              Pro User
            </div>
          ) : (
            <a
              className={` font-normal  outline-none px-4 py-3 bg-primary-500 text-white rounded-lg  flex justify-start items-center gap-2 w-11/12  ${
                windowWidth < 700 ? 'hidden' : ''
              } relative`}
              href="https://linkcollect.lemonsqueezy.com/checkout/buy/7d135ecc-36de-4977-a2d2-7d56c512706b"
              target="_blank"
              rel="noreferrer"
            >
              <img src={energy} width={16} alt="" />
              Upgrade
            </a>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
