import React, { useState } from "react";
import {
  User,
  Menu,
  Users,
  X,
  LogOut, // ✅ Added logout icon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SecuritySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear teacher session (update if you use tokens/localStorage)
    localStorage.removeItem("teacherToken");

    // ✅ Redirect to login page
    navigate("/login");

    // ✅ Close sidebar on logout
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full text-white
                    bg-gradient-to-b from-[#104C80] via-[#1760a5] to-[#1e64a9]
                    shadow-2xl transition-all duration-500 z-50 
                    flex flex-col justify-between
                    ${isOpen ? "w-64" : "w-0 md:w-20 lg:w-64"}
                    overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-white/10">
          <h1
            className={`mt-9 font-bold text-base tracking-wide text-center transition-all duration-500
            ${isOpen || window.innerWidth >= 1024 ? "opacity-100" : "hidden"}`}
          >
            Al Tamkon Security Panel
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 flex flex-col gap-3 px-3 flex-grow">
          {[
            { label: "Visitors", icon: <User size={20} />, path: "/visitor" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)} // ✅ Close sidebar after navigation
              className="group flex items-center gap-4 px-3 py-2 rounded-lg 
                         hover:bg-white/20 transition-all relative overflow-hidden
                         hover:translate-x-1 hover:scale-105 duration-300 ease-out"
            >
              {/* Left hover bar */}
              <span
                className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 
                           group-hover:scale-y-100 transition-transform duration-300"
              ></span>
              {item.icon}
              {(isOpen || window.innerWidth >= 1024) && (
                <span className="text-sm font-medium animate-fadeIn">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* ✅ Logout Button at Bottom */}
        <div className="px-3 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 w-full px-3 py-2 rounded-lg 
                       hover:bg-white/20 transition-all hover:translate-x-1 hover:scale-105"
          >
            <LogOut size={20} />
            {(isOpen || window.innerWidth >= 1024) && (
              <span className="text-sm font-medium animate-fadeIn">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2.5 bg-white shadow-lg rounded-full md:hidden 
                   transition duration-300 hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X
            size={20}
            className="text-[#104C80] transition-transform duration-300 rotate-180"
          />
        ) : (
          <Menu
            size={20}
            className="text-[#104C80] transition-transform duration-300"
          />
        )}
      </button>
    </>
  );
};

export default SecuritySidebar;
