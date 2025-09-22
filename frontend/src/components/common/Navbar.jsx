import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile, clearProfile } from "../../redux/slices/UserSlice";
import { useLogoutMutation } from "../../redux/slices/UserApi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profile = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  const [logout, { isLoading }] = useLogoutMutation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tamakon", path: "/tamakon" },
    { name: "Services", path: "/services" },
    { name: "Media", path: "/media" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearProfile());
      setProfileOpen(false);
      setIsOpen(false);
    } catch (err) {
      console.error("❌ Logout failed:", err);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#1A4480] shadow-lg backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="w-[160px] h-[75px]">
          <img
            src="./images/Tamakon-logo.png"
            alt="Tamakon Logo"
            className="w-full h-full object-contain"
          />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-10 text-[17px] font-medium">
          {navLinks.map((link) =>
            link.name === "Tamakon" ? (
              <li key={link.name} className="relative group">
                <button 
                  className="relative pb-1 text-gray-200 hover:text-blue-300 transition duration-300 flex items-center gap-1"
                >
                  Tamakon
                  <svg
                    className="w-4 h-4 transform group-hover:rotate-180 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
                  <NavLink
                    to="/about-tamakon"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    About Tamakon
                  </NavLink>
                  <NavLink
                    to="/team"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    Team
                  </NavLink>
                  <NavLink
                    to="/director-message"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    Director Manager Message
                  </NavLink>
                  <NavLink
                    to="/acting-director-message"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    Acting Director General Message
                  </NavLink>
                  <NavLink
                    to="/school-fees"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    School Fees
                  </NavLink>
                  <NavLink
                    to="/recruitment"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    Recruitment
                  </NavLink>
                  <NavLink
                    to="/faqs"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    FAQs
                  </NavLink>
                </div>
              </li>
            ) : (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative pb-1 transition duration-300 ${isActive
                      ? "text-blue-500 font-semibold"
                      : "text-gray-200 hover:text-blue-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            )
          )}
        </ul>

        {/* Search + Login */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block w-[280px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-indigo-100 placeholder-indigo-300 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300" />
          </div>

          {/* Profile/Login */}
          <div className="hidden lg:flex items-center">
            {!profile ? (
              <NavLink
                to="/login"
                className="px-6 py-2 bg-transparent border-2 border-white/60
             rounded-full text-white font-semibold shadow-lg 
             hover:from-[#084497] hover:via-[#6D28D9] hover:to-[#084497] 
             hover:shadow-[0_0_18px_rgba(109,40,217,0.7)] 
             hover:bg-gradient-to-r from-[#0A1E40] via-[#1A4480] to-[#282bd9]
             hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Login
              </NavLink>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition"
                >
                  {profile?.profilePic ? (
                    <img
                      src={profile.profilePic}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover border-2 border-purple-400 shadow-sm"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-indigo-200" />
                  )}
                  <span className="font-medium">
                    {profile?.name.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                    <NavLink
                      to="/my-profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    {profile?.role === "admin" && (
                      <NavLink
                        to="/admincomplain"
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Admin Dashboard
                      </NavLink>
                    )}
                    {profile?.role === "teacher" && (
                      <NavLink
                        to="/teacherdocuments"
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Teacher Dashboard
                      </NavLink>
                    )}
                    {profile?.role === "User" && (
                      <NavLink
                        to="/stcomplaints"
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Student Dashboard
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded bg-indigo-900/70 hover:bg-indigo-800 transition"
            onClick={() => setIsOpen(true)}
          >
            <FaBars className="text-indigo-200 text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 border-l border-indigo-500/20 shadow-2xl transform transition-transform duration-300 z-50 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Top */}
        <div className="flex justify-between items-center mb-10">
          <NavLink
            to="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300"
            onClick={() => setIsOpen(false)}
          >
            Al Tamakon
          </NavLink>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-indigo-950 rounded"
          >
            <FaTimes className="text-indigo-200 text-2xl" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-center py-2 rounded-lg transition duration-300 ${isActive
                    ? "bg-indigo-800 text-blue-400 font-semibold"
                    : "text-indigo-100 hover:text-indigo-300 hover:bg-indigo-800/30"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Login/Profile */}
        <div className="mt-10 flex flex-col gap-4 relative">
          {!profile ? (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 bg-gradient-to-r from-[#273C66] via-[#1A4480] to-[#273C66] rounded-full text-center text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              Login
            </NavLink>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition"
              >
                {profile?.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-indigo-400"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
                <span className="font-medium">
                  {profile?.name.split(" ")[0]}
                </span>
              </button>

              {profileOpen && (
                <div className="mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <NavLink
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    onClick={() => {
                      setProfileOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    My Profile
                  </NavLink>
                  {profile?.role === "admin" && (
                    <NavLink
                      to="/admincomplain"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Admin Dashboard
                    </NavLink>
                  )}
                  {profile?.role === "teacher" && (
                    <NavLink
                      to="/teacherdocuments"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Teacher Dashboard
                    </NavLink>
                  )}
                  {profile?.role === "User" && (
                    <NavLink
                      to="/stcomplaints"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Student Dashboard
                    </NavLink>
                  )}
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    {isLoading ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
