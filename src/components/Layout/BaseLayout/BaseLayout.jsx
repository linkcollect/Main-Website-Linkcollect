import React from "react";
import Navabar from "../Navbar/Navabar";
import Sidebar from "../Sidebar/Sidebar";

const BaseLayout = ({ windowWidth, children }) => {
  return (
    <div
      className={`flex bg-neutral-50 ${windowWidth < 700 ? "flex-col" : ""}`}
    >
      {/* <Helmet>
        <title>{nameOfUser?.toUpperCase()} - (User on Linkcollect)</title>
      </Helmet> */}
      <div className={`flex-1`}>
       <Sidebar/>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-5 overflow-y-hidden flex-2 max-h-none sm:h-screen">
        {/* navbar */}
        <Navabar/>
        
        {children}
      </div>  
    </div>
  );
};

export default BaseLayout;
