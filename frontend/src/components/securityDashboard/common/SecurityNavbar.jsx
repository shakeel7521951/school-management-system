import React, { useState } from "react";
import { Bell, Search, Menu, Pencil } from "lucide-react";

const SecurityNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userName] = useState("Ahmed"); // Later fetch from API

  // Get first letter of name
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm 
                 px-4 py-3 flex items-center justify-between md:ml-64 transition-all"
    >
      {/* Left: Hamburger on Mobile + Search on Desktop */}
      <div className="flex items-center gap-4 flex-1">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={26} className="text-gray-700 hover:text-[#104C80] transition" />
        </button>

        {/* Search Bar (Desktop only) */}
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
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative hover:scale-110 transition-transform hidden sm:block">
          <Bell size={22} className="text-gray-600 hover:text-[#104C80]" />
          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 
                       flex items-center justify-center rounded-full shadow"
          >
            3
          </span>
        </button>

        {/* Profile + Name (Grouped) */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <label htmlFor="teacher-profile-upload" className="block relative">
            {/* Avatar */}
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-gradient-to-r from-[#104C80] to-[#1e64a9] 
                           text-white font-semibold shadow-lg text-base"
              >
                {initial}
              </div>
            )}

            {/* Overlay with Pencil (hover effect) */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center 
                         rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Pencil size={16} className="text-white" />
            </div>
          </label>

          {/* User name */}
          <span className="text-sm font-medium text-gray-700">{userName}</span>

          {/* Hidden file input */}
          <input
            type="file"
            id="teacher-profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl border-r border-gray-200 
                     flex flex-col p-6 gap-6 md:hidden animate-slide-in"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#104C80]">Security Menu</h2>
            <button
              className="text-gray-400 hover:text-[#104C80]"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg
                         focus:ring-2 focus:ring-[#104C80] focus:outline-none shadow-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative flex items-center gap-3 text-gray-700 hover:text-[#104C80] transition">
            <Bell size={22} />
            <span>Notifications</span>
            <span className="absolute -top-1 left-4 bg-red-500 text-white text-xs w-4 h-4 
                           flex items-center justify-center rounded-full shadow">
              3
            </span>
          </button>

          {/* Profile in mobile menu */}
          <label
            htmlFor="teacher-profile-upload"
            className="flex items-center gap-3 cursor-pointer bg-gray-50 
                       hover:bg-gray-100 p-3 rounded-xl transition"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-gradient-to-r from-[#104C80] to-[#1e64a9] 
                           text-white font-semibold shadow-lg text-base"
              >
                {initial}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">{userName}</span>
          </label>
        </div>
      )}
    </nav>
  );
};

export default SecurityNavbar;
