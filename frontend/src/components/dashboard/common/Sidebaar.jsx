import React, { useState } from "react";
import {
  Users,
  FileText,
  MessageCircle,
  BarChart2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  School,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear session
    localStorage.removeItem("adminToken");
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Users,
      color: "text-indigo-500",
      hover: "hover:bg-indigo-50",
    },
    {
      id: "admincomplain",
      label: "Complaints",
      icon: MessageCircle,
      color: "text-pink-500",
      hover: "hover:bg-pink-50",
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      color: "text-green-500",
      hover: "hover:bg-green-50",
    },
    {
      id: "users",
      label: "Users",
      icon: BarChart2,
      color: "text-amber-500",
      hover: "hover:bg-amber-50",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      color: "text-purple-500",
      hover: "hover:bg-purple-50",
    },
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
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200
                    shadow-2xl transition-all duration-500 z-50 flex flex-col justify-between
                    ${isOpen ? "w-64" : "w-0 md:w-20 lg:w-64"} overflow-hidden`}
      >
        {/* Logo */}
        <div className="px-4 py-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 mb-2">
            <School size={32} className="text-blue-600" />
          </div>
          {(isOpen || window.innerWidth >= 1024) && (
            <>
              <h2 className="text-xl font-bold text-[#1a4480] tracking-tight">
                School DMS
              </h2>
              <p className="text-xs text-gray-500">
                Digital Management System
              </p>
            </>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-grow space-y-2 mt-6 px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link
                key={item.id}
                to={`/${item.id}`}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsOpen(false);
                }}
                className={`group flex items-center gap-4 px-3 py-2 rounded-lg transition-all 
                           ${isActive ? "bg-blue-50 text-blue-700 shadow-inner" : "text-gray-700"} 
                           ${item.hover} hover:translate-x-1 hover:scale-105`}
              >
                <IconComponent
                  size={20}
                  className={`${isActive ? "text-blue-700" : item.color} group-hover:scale-110`}
                />
                {(isOpen || window.innerWidth >= 1024) && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && (isOpen || window.innerWidth >= 1024) && (
                  <ChevronRight
                    size={16}
                    className="text-blue-700 animate-pulse ml-auto"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 mb-6 space-y-3">
          {/* System status */}
          {(isOpen || window.innerWidth >= 1024) && (
            <div className="mb-4 px-2">
              <div className="h-1.5 w-8 rounded-full bg-green-500 mb-2"></div>
              <p className="text-xs text-gray-500">System Status: Operational</p>
            </div>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-4 px-3 py-2 rounded-lg 
                       hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all"
          >
            <LogOut size={20} className="text-red-500 group-hover:animate-pulse" />
            {(isOpen || window.innerWidth >= 1024) && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2.5 bg-blue-600 text-white shadow-lg rounded-full md:hidden
                   transition duration-300 hover:scale-110 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </>
  );
};

export default Sidebar;
