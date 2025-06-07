import React, { useState } from "react";
import { Link } from "react-router-dom";
import { uiMenu } from "./MenuData";

const DropdownMenu = ({ menu }) => {
  return (
    <div className="absolute top-full -right-4 bg-slate-700 rounded shadow-lg w-60 h-[60vh] z-20 overflow-y-auto">
      <div>
        {menu.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.path}
              className="block px-4 py-2 hover:bg-slate-600 transition-colors"
            >
              {item.id}. {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Header = () => {
  const [isUIDropdownOpen, setIsUIDropdownOpen] = useState(false);

  const handleUIMouseEnter = () => {
    setIsUIDropdownOpen(true);
  };

  const handleUIMouseLeave = () => {
    setIsUIDropdownOpen(false);
  };

  // JSX START
  return (
    <header className="bg-slate-800 text-white py-4 px-12">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl"></div>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-300 transition-colors">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={handleUIMouseEnter}
            onMouseLeave={handleUIMouseLeave}
          >
            <button className="hover:text-blue-300 transition-colors">
              UI
            </button>

            {isUIDropdownOpen && <DropdownMenu menu={uiMenu} />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
