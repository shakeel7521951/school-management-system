import React, { useState } from "react";
import {
  MessageSquare,
  Menu,
  GraduationCap,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StudentSidebar = () => {
  const { t } = useTranslation("studentSidebar"); // use studentSidebar namespace
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    { key: "complaints", icon: <MessageSquare size={20} />, path: "/stcomplaints" },
  ];

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
          <div
            className="w-14 h-14 flex items-center justify-center rounded-2xl 
                       bg-white/20 shadow-lg animate-bounce"
          >
            <GraduationCap size={28} />
          </div>
          <h1
            className={`mt-3 font-bold text-base tracking-wide text-center transition-all duration-500
                        ${isOpen ? "opacity-100" : "hidden lg:block"}`}
          >
            {t("portalTitle")}
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 flex flex-col gap-3 px-3 flex-grow">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`group flex items-center gap-4 px-3 py-2 rounded-lg 
                          hover:bg-white/20 transition-all relative overflow-hidden
                          hover:translate-x-1 hover:scale-105 duration-300 ease-out
                          ${location.pathname === item.path ? "bg-white/30" : ""}`}
            >
              {/* Left hover bar */}
              <span
                className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 
                           group-hover:scale-y-100 transition-transform duration-300"
              ></span>
              {item.icon}
              {(isOpen || window.innerWidth >= 1024) && (
                <span className="text-sm font-medium animate-fadeIn">
                  {t(`menu.${item.key}`)}
                </span>
              )}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 px-3 py-2 rounded-lg 
                       hover:bg-red-500/80 transition-all relative overflow-hidden
                       hover:translate-x-1 hover:scale-105 duration-300 ease-out mt-auto"
          >
            <span
              className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 
                         group-hover:scale-y-100 transition-transform duration-300"
            ></span>
            <LogOut size={20} />
            {(isOpen || window.innerWidth >= 1024) && (
              <span className="text-sm font-medium animate-fadeIn">
                {t("menu.logout")}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Toggle Button (mobile only) */}
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

export default StudentSidebar;
