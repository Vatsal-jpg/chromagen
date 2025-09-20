// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Preview", path: "/preview" },
    { name: "Library", path: "/library" },
    { name: "Learn", path: "/learn" },
  ];

  return (
    <div
      className="w-64 min-h-screen text-white flex flex-col p-6"
      style={{
        background: "linear-gradient(to bottom, rgba(22,75,130,0.4), rgba(93,154,205,0.8))",
      }}
    >
      <h1 className="text-2xl font-extrabold mb-8 ">ChromaGen</h1>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `mb-4 p-3 rounded font-bold  transition-colors duration-200 ${
              isActive ? "bg-[#164b82]" : "hover:bg-[#4981bc]/70"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
