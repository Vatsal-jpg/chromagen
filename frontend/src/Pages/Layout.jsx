import React from "react";
import Sidebar from "./SideBar"; 

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> 
      <div className="flex-1 bg-[#F7F8FA]">{children}</div>
    </div>
  );
};

export default Layout;
