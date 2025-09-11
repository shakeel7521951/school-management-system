import React, { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm 
                 px-4 py-2 flex items-center justify-between lg:ml-64 transition-all"
    >
      {/* Left: Search Bar (hidden on small screens) */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full
                       focus:ring-2 focus:ring-[#104C80] focus:outline-none shadow-sm
                       transition duration-200"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} className="text-gray-700" /> : <Menu size={26} className="text-gray-700" />}
        </button>

        {/* Notifications */}
        <button className="relative hover:scale-110 transition-transform hidden sm:block">
          <Bell size={24} className="text-gray-600 hover:text-[#104C80]" />
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 
                       flex items-center justify-center rounded-full shadow"
          >
            3
          </span>
        </button>

        {/* Profile */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 
                     rounded-full transition"
        >
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full 
                       bg-gradient-to-r from-[#104C80] to-[#1e64a9] 
                       text-white font-medium shadow"
          >
            A
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            Ahmed Ali
          </span>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute top-14 right-4 w-64 bg-white shadow-lg border border-gray-200 rounded-xl p-4 
                     flex flex-col gap-4 md:hidden animate-fade-in"
        >
          {/* Search in Mobile */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full
                         focus:ring-2 focus:ring-[#104C80] focus:outline-none shadow-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex items-center gap-2 text-gray-700 hover:text-[#104C80] transition">
            <Bell size={22} />
            <span>Notifications</span>
            <span className="absolute -top-1 left-4 bg-red-500 text-white text-xs w-4 h-4 
                           flex items-center justify-center rounded-full shadow">
              3
            </span>
          </button>

          {/* Profile */}
          <div
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <div
              className="w-9 h-9 flex items-center justify-center rounded-full 
                         bg-gradient-to-r from-[#104C80] to-[#1e64a9] 
                         text-white font-medium shadow"
            >
              A
            </div>
            <span className="text-sm font-medium text-gray-700">Ahmed Ali</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
