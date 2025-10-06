import React, { useState, useEffect } from "react";
import { User, Menu, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile, clearProfile } from "../../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/slices/UserApi";

const DepartNavbar = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux user profile
  const userProfile = useSelector(selectUserProfile);

  // Default fallback values
  const userName = userProfile?.name || "User";
  const userRole = userProfile?.role || "Administrator";
  const initial = userName ? userName.charAt(0).toUpperCase() : "?";

  // RTK Query logout mutation
  const [logout, { isLoading }] = useLogoutMutation();

  // Close dropdown on Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsProfileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout().unwrap(); // call API
      dispatch(clearProfile()); // clear redux store
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="md:ml-20 lg:ml-64 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm px-4 md:px-6 py-3 sticky top-0 h-16 z-50">
      {/* Left Section */}
      <div className="flex items-center flex-1">
        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded-lg mr-3 bg-gray-100 hover:bg-gray-200 transition-all"
          onClick={onMenuClick}
          aria-label="Toggle Menu"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="relative">
          <button
            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-all"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-expanded={isProfileOpen}
          >
            {/* User Info */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800 truncate max-w-[100px] lg:max-w-none">
                {userName}
              </p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>

            {/* Avatar */}
            {userProfile?.image ? (
              <img
                src={userProfile.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover shadow-md border"
              />
            ) : (
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-gradient-to-r from-[#104C80] to-[#1e64a9] 
                           text-white font-semibold shadow-md"
              >
                {initial}
              </div>
            )}
          </button>

          {/* Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg py-1 border border-gray-100 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>

              <button
                onClick={() => navigate("/my-profile")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 mr-2">
                  <User size={16} />
                </div>
                My Profile
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 text-red-600 mr-2">
                  <LogOut size={16} />
                </div>
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default DepartNavbar;
