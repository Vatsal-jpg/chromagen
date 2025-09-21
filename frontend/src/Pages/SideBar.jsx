// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Eye, BookOpen, Palette } from "lucide-react"; // install lucide-react if not installed

const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={18} /> },
    { name: "Preview", path: "/preview", icon: <Eye size={18} /> },
    { name: "Library", path: "/library", icon: <BookOpen size={18} /> },
    { name: "Learn", path: "/learn", icon: <Palette size={18} /> },
  ];

  return (
    <div
      className="w-64 min-h-screen text-white flex flex-col p-6"
      style={{
        background: "linear-gradient(to bottom, #164b82, #4981bc)",
      }}
    >
      {/* Logo / Title */}
      <h1 className="text-2xl font-extrabold mb-8 tracking-wide border-b border-white/20 pb-4">
        ChromaGen
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#164b82] text-white shadow-md"
                  : "text-white/90 hover:bg-[#4981bc]/70 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
