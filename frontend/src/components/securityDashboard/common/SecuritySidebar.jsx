import React, { useState } from "react";
import { User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SecuritySidebar = () => {
  const { t } = useTranslation("securitySidebar"); // ✅ namespace
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full text-white
                    bg-gradient-to-b from-[#104C80] via-[#1760a5] to-[#1e64a9]
                    shadow-2xl transition-all duration-500 z-50 
                    flex flex-col justify-between
                    ${isOpen ? "w-64" : "w-0 md:w-20 lg:w-64"}
                    overflow-hidden`}
      >
        {/* Header */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-white/10">
          <h1
            className={`mt-9 font-bold text-base tracking-wide text-center transition-all duration-500
            ${isOpen || window.innerWidth >= 1024 ? "opacity-100" : "hidden"}`}
          >
            {t("sidebar.title")}
          </h1>
        </div>

        {/* Menu */}
        <nav className="mt-8 flex flex-col gap-3 px-3 flex-grow">
          <Link
            to="/visitor"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-4 px-3 py-2 rounded-lg 
                       hover:bg-white/20 transition-all relative overflow-hidden
                       hover:translate-x-1 hover:scale-105 duration-300 ease-out"
          >
            <span
              className="absolute left-0 top-0 h-full w-1 bg-white scale-y-0 
                         group-hover:scale-y-100 transition-transform duration-300"
            ></span>
            <User size={20} />
            {(isOpen || window.innerWidth >= 1024) && (
              <span className="text-sm font-medium animate-fadeIn">
                {t("sidebar.menu.visitors")}
              </span>
            )}
          </Link>
        </nav>

        {/* Logout */}
        <div className="px-3 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="group flex items-center gap-4 w-full px-3 py-2 rounded-lg 
                       hover:bg-white/20 transition-all hover:translate-x-1 hover:scale-105"
          >
            <LogOut size={20} />
            {(isOpen || window.innerWidth >= 1024) && (
              <span className="text-sm font-medium animate-fadeIn">
                {t("sidebar.logout")}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SecuritySidebar;
