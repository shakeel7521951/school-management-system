import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/event" },
    { name: "FeedBack", path: "/complain" },
    { name: "Contact", path: "/contact-us" },
    { name: "Visitors", path: "/visitor" },
  ];

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

        {/* Desktop Menu (only lg and up) */}
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

        {/* Desktop Right Section (only lg and up) */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Login Button */}
          <Link to="/login" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200" />
            <div className="relative px-6 py-2 bg-indigo-950 rounded-full text-indigo-200 group-hover:text-white transition duration-200 font-semibold">
              Login
            </div>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-indigo-900 hover:bg-indigo-800 transition"
            >
              <FaUserCircle className="text-3xl text-indigo-200" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                <Link
                  to="/admincomplain"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/teacherdocuments"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  Teacher Dashboard
                </Link>
                <Link
                  to="/stcomplaints"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  onClick={() => setProfileOpen(false)}
                >
                  Student Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button (sm + md, hide on lg) */}
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

      {/* Mobile Sidebar (sm + md) */}
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
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-center text-indigo-100 hover:text-indigo-400 hover:bg-indigo-950 rounded-xl py-3 transition duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Login + Profile */}
        <div className="mt-10 flex flex-col gap-4">
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

          {/* Profile Dropdown (Mobile) */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-indigo-900 rounded-full text-indigo-200 hover:bg-indigo-800 hover:text-white transition"
            >
              <FaUserCircle className="text-2xl" />
              <span className="font-medium">Profile</span>
            </button>

            {profileOpen && (
              <div className="mt-3 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-fadeIn">
                <Link
                  to="/admincomplaints"
                  className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  onClick={() => {
                    setProfileOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Admin Dashboard
                </Link>
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
              </div>
            )}
          </div>
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
