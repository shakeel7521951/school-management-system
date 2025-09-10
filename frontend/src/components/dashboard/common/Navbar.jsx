import React, { useState, useEffect } from "react";
import { Bell, User, Search, Menu, Settings, LogOut } from "lucide-react";

const Navbar = ({ onMenuClick, userName = "Admin User", userRole = "Administrator" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);

  // Close dropdown on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsProfileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-6 py-3 sticky top-0 h-16 ">
      {/* Left Section */}
      <div className="flex items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg mr-4 bg-gray-100 hover:bg-gray-200 transition-all"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-gray-700" />
        </button>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center ms-[350px] bg-gray-100 rounded-xl px-3 py-2 w-64 shadow-inner">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-gray-700 placeholder-gray-400 outline-none w-full"
            aria-label="Search"
          />
        </div>
      </div>

      {/* Center Title - Visible on mobile */}
      <h1 className="md:hidden font-bold text-xl text-gray-800 tracking-tight">School DMS</h1>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all">
            <Bell size={20} />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {notificationsCount}
              </span>
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-all"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-expanded={isProfileOpen}
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 border border-gray-300">
              <User size={20} />
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl  shadow-lg py-1 border border-gray-100 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mr-2">
                  <Settings size={16} />
                </div>
                Settings
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 mr-2">
                  <User size={16} />
                </div>
                Profile
              </a>
              <div className="border-t border-gray-100 my-1"></div>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 mr-2">
                  <LogOut size={16} />
                </div>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
