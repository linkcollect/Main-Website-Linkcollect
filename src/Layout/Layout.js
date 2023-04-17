import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ searchHnadeler, setSearchQuery, children }) => {
  return (
    <div className="flex bg-bgSecondary">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
