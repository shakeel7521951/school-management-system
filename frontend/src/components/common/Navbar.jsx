import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile, clearProfile } from "../../redux/slices/UserSlice";
import { useLogoutMutation } from "../../redux/slices/UserApi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  console.log(profile);
  
  const [logout, { isLoading }] = useLogoutMutation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/event" },
    { name: "FeedBack", path: "/complain" },
    { name: "Contact", path: "/contact-us" },
    { name: "Visitors", path: "/visitor" },
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
    <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#104c80] via-[#1e3a5f] to-[#0a1a2f] shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 tracking-wide hover:scale-105 transition-transform duration-300"
        >
          Al Tamakon
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-12 text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name} className="group relative">
              <Link
                to={link.path}
                className="text-indigo-100 transition duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-indigo-400"
              >
                {link.name}
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 transition-all duration-500 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Profile/Login */}
        <div className="hidden lg:flex items-center gap-6">
          {!profile ? (
            <Link to="/login" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-6 py-2 bg-indigo-950 rounded-full text-indigo-200 group-hover:text-white transition duration-200 font-semibold">
                Login
              </div>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2 rounded-full bg-indigo-900 hover:bg-indigo-800 transition"
              >
                {profile?.profilePic ? (
                  <img
                    src={profile.profilePic}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border border-indigo-400"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-indigo-200" />
                )}
                <span className="text-indigo-200 font-medium">
                  {profile?.name.split(" ")[0]}
                </span>
              </button>

              {/* Desktop Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      to="/admincomplain"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {profile?.role === "teacher" && (
                    <Link
                      to="/teacherdocuments"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      Teacher Dashboard
                    </Link>
                  )}
                  {profile?.role === "User" && (
                    <Link
                      to="/stcomplaints"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      Student Dashboard
                    </Link>
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
          className="lg:hidden relative group"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded blur opacity-60 group-hover:opacity-100 transition duration-200" />
          <div className="relative p-2 bg-indigo-950 rounded">
            <FaBars className="text-indigo-200 group-hover:text-white text-2xl" />
          </div>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 border-l border-indigo-500/20 shadow-xl transform transition-transform duration-300 z-50 p-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="flex justify-between items-center mb-10">
          <Link
            to="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300"
            onClick={() => setIsOpen(false)}
          >
            Al Tamakon
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-indigo-950 rounded">
            <FaTimes className="text-indigo-200 text-2xl" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-6 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-center text-indigo-100 hover:text-indigo-400 hover:bg-indigo-950 rounded-xl py-1 transition duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Profile/Login */}
        <div className="mt-10 flex flex-col gap-4 relative">
          {!profile ? (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="relative group block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200" />
              <div className="relative px-4 py-3 bg-indigo-950 rounded-full text-center text-indigo-200 group-hover:text-white transition duration-200 font-semibold">
                Login
              </div>
            </Link>
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
                <span className="font-medium">{profile?.name.split(" ")[0]}</span>
              </button>

              {profileOpen && (
                <div className="mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                    onClick={() => {
                      setProfileOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    My Profile
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      to="/admincomplain"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {profile?.role === "teacher" && (
                    <Link
                      to="/teacherdocuments"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Teacher Dashboard
                    </Link>
                  )}
                  {profile?.role === "User" && (
                    <Link
                      to="/stcomplaints"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                      onClick={() => {
                        setProfileOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Student Dashboard
                    </Link>
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
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
