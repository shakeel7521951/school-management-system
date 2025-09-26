import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

const SecurityNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Get user profile from Redux
  const userProfile = useSelector(selectUserProfile);

  // Get name from Redux (fallback if missing)
  const userName = userProfile?.name || "Guest";

  // First letter of name
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  return (
    <nav
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm 
                 px-4 py-3 flex items-center justify-between md:ml-64 transition-all"
    >
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={26} className="text-gray-700 hover:text-[#104C80] transition" />
        </button>

        {/* Search (Desktop only) */}
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

      {/* Right: Profile (Clickable to My Profile) */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate("/my-profile")}
      >
        {/* Avatar */}
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

        {/* User name */}
        <span className="text-sm font-medium text-gray-700">{userName}</span>
      </div>
    </nav>
  );
};

export default SecurityNavbar;
