import React, { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ReceptionistSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/visitors");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const visitors = {
    id: "/visitors",
    label: "Visitors",
    icon: "Users",
  };

  const Icon = Icons[visitors.icon];

  return (
    <>
      {/* Backdrop for mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full 
        bg-gradient-to-b from-white/90 to-blue-50/90 
        backdrop-blur-lg border-r border-gray-200
        shadow-xl transition-all duration-500 z-50 flex flex-col
        ${isOpen ? "w-72" : "w-0 lg:w-72"} overflow-hidden`}
      >
        {/* Logo Section */}
        <div className="px-6 py-8 flex flex-col items-center border-b border-gray-200">
          {isOpen && (
            <>
              <h2 className="mt-3 text-3xl font-bold text-[#1a4480] tracking-wide">
                Al-Tamakon
              </h2>
              <p className="text-[15px] text-gray-500">Receptionist Panel</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-6 space-y-2 px-3">
          <div>
            <button
              onClick={() => {
                setActiveItem(visitors.id);
                navigate(visitors.id);
                // ✅ Close sidebar on mobile after navigation
                if (!isDesktop) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all
                ${
                  activeItem === visitors.id
                    ? "bg-blue-100 text-blue-700 shadow-inner"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Icon
                size={20}
                className={`${
                  activeItem === visitors.id
                    ? "text-blue-700"
                    : "text-blue-600"
                }`}
              />
              {isOpen && (
                <span className="text-[15px] font-medium">
                  {visitors.label}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 
          text-white shadow-lg rounded-full
          transition duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Icons.X size={20} /> : <Icons.Menu size={20} />}
        </button>
      )}
    </>
  );
};

export default ReceptionistSidebar;
