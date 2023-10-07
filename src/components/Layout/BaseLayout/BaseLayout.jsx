import React, { useContext } from 'react';
import Navabar from '../Navbar/Navabar';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { switchMode } from '../../../hooks/switchMode';

const BaseLayout = ({ windowWidth, children }) => {
  const auth = useSelector(state => state.auth);

  // getting current selected mode
  const { selectedMode } = useContext(switchMode);

  const navabrItem = [
    {
      name: 'Contact us',
      link: 'http://linkcollect.io/askwhyharsh/c/64ecd6198fac6bae8d54fb77',
    },
    {
      name: 'FAQs',
      link: 'https://linkcollect.super.site/help',
    },
    {
      name: 'Feedback',
      link: 'https://forms.gle/Dg5ehCAR4AEZBnF89',
    },
  ];

  return (
    <div
      className={`flex overflow-clip  ${
        selectedMode === 'dark' ? 'bg-dark-primary' : 'bg-neutral-50'
      } ${windowWidth < 700 ? 'flex-col' : ''}`}
    >
      {/* <Helmet>
        <title>{nameOfUser?.toUpperCase()} - (User on Linkcollect)</title>
      </Helmet> */}
      {auth.isLoggedIn && (
        <div className={`hidden md:block flex-1`}>
          <Sidebar />
        </div>
      )}
      <div className="flex flex-col items-center justify-start w-full h-[100vh] gap-0 overflow-y-hidden overflow-x-hidden flex-2 max-h-none sm:h-screen">
        {/* navbar */}
        <Navabar />

        {children}

        {/* Footer */}
        {/* <div className="flex md:hidden mt-auto items-center border-t-2 border-neutral-200 justify-around w-full gap-5 max-w-[1500px] py-3 "> */}
        {/* {(navabrItem.map(({ name, link }) => (
          <a href={link} target="_blank" className="items-center justify-center rounded flex" key={link} rel="noreferrer">
            <span className={`text-base font-normal text-center ${selectedMode === "light" ? "text-neutral-600" : "text-borderPrimary"} `}>
              {name}
            </span>
          </a>
        )))} */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default BaseLayout;
