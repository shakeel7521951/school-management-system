import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../redux/slices/UserSlice";

const TeacherNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get user profile from Redux
  const userProfile = useSelector(selectUserProfile);

  // Get name (fallback: Guest)
  const userName = userProfile?.name || "Guest Teacher";

  // First letter for avatar fallback
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm 
                 px-4 py-3 flex items-center justify-between md:ml-20 lg:ml-64 transition-all"
    >
      {/* Left: Hamburger on Mobile + Search on Desktop */}
      <div className="flex items-center gap-4 flex-1">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={26} className="text-gray-700 hover:text-[#104C80] transition" />
        </button>

       
      </div>

      {/* Right: Profile + Name */}
      <div className="flex items-center gap-6">
        <Link
          to="/my-profile"
          className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
        >
          {/* Avatar (image or initial fallback) */}
          {userProfile?.image ? (
            <img
              src={userProfile.image}
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
        </Link>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div
          className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl border-r border-gray-200 
                     flex flex-col p-6 gap-6 md:hidden animate-slide-in"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#104C80]">Menu</h2>
            <button
              className="text-gray-400 hover:text-[#104C80]"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

         

         

          {/* Profile inside mobile menu */}
          <Link
            to="/my-profile"
            className="flex items-center gap-3 cursor-pointer bg-gray-50 
                       hover:bg-gray-100 p-3 rounded-xl transition"
          >
            {userProfile?.image ? (
              <img
                src={userProfile.image}
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
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TeacherNavbar;
