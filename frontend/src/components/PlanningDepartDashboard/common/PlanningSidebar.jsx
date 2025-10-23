import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  ChevronRight,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const PlanningSidebar = () => {
  // Load translations from the "planningSidebar" namespace
  const { t } = useTranslation("planningSidebar");

  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const handleLogout = () => {
    localStorage.removeItem("planningToken");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-xl 
        transition-all duration-500 z-50 flex flex-col justify-between
        ${isOpen ? "w-64" : "w-0 lg:w-64"} overflow-hidden`}
      >
        {/* Logo / Header */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-14 h-14 flex items-center justify-center bg-[#0B055A] rounded-xl mb-2">
            <FileText size={28} className="text-white" />
          </div>
          {isOpen && (
            <>
              <h2 className="text-lg font-bold text-[#0B055A]">
                {t("sidebar.title")}
              </h2>
              <p className="text-md text-gray-700">{t("sidebar.subtitle")}</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-2 mt-6 px-3">
          {/* Documents Dropdown */}
          <div>
            <button
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "documents" ? null : "documents"
                )
              }
              className="w-full flex items-center justify-between px-3 py-2.5 text-gray-700 
              hover:bg-indigo-50 rounded-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#0B055A]" />
                {isOpen && (
                  <span className="font-medium text-sm">
                    {t("sidebar.documents.title")}
                  </span>
                )}
              </div>
              {isOpen &&
                (openDropdown === "documents" ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                ))}
            </button>

            {isOpen && openDropdown === "documents" && (
              <div className="ml-9 mt-1 space-y-1">
                <Link
                  to="/planning-requested"
                  className="block px-3 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                >
                  {t("sidebar.documents.requested")}
                </Link>
                <Link
                  to="/planning-uploaded"
                  className="block px-3 py-1.5 text-sm text-gray-700 rounded-md hover:bg-gray-100"
                >
                  {t("sidebar.documents.uploaded")}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg
              text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            {isOpen && (
              <span className="text-sm font-medium">
                {t("sidebar.logout")}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile toggle button */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 p-2.5 bg-[#0B055A] text-white shadow-lg rounded-full
          transition duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
    </>
  );
};

export default PlanningSidebar;
