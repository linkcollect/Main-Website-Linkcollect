import React, { useContext } from "react";
import Navabar from "../Navbar/Navabar";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { switchMode } from "../../../hooks/switchMode";

const BaseLayout = ({ windowWidth, children }) => {
  const auth = useSelector(state => state.auth);

  // getting current selected mode
  const {selectedMode} = useContext(switchMode)

  return (
    <div
      className={`flex ${selectedMode === "dark" ? "bg-dark-primary" : "bg-neutral-50"} ${windowWidth < 700 ? "flex-col" : ""}`}
    >
      {/* <Helmet>
        <title>{nameOfUser?.toUpperCase()} - (User on Linkcollect)</title>
      </Helmet> */}
      {auth.isLoggedIn && <div className={`hidden sm:block flex-1`}>
       <Sidebar/>
      </div>}
      <div className="flex flex-col items-center justify-start w-full h-[100vh] gap-5 overflow-y-hidden flex-2 max-h-none sm:h-screen">
        {/* navbar */}
        <Navabar />

        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
