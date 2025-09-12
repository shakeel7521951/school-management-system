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
  School
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("visitors");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: Users, color: "text-indigo-500", hover: "hover:bg-indigo-50" },
    { id: "admincomplain", label: "Complaints", icon: MessageCircle, color: "text-pink-500", hover: "hover:bg-pink-50" },
    { id: "documents", label: "Documents", icon: FileText, color: "text-green-500", hover: "hover:bg-green-50" },
    { id: "users", label: "Users", icon: BarChart2, color: "text-amber-500", hover: "hover:bg-amber-50" },
    { id: "reports", label: "Reports", icon: FileText, color: "text-purple-500", hover: "hover:bg-purple-50" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-blue-600 text-white shadow-md"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        } md:translate-x-0 transform transition-all duration-300 ease-in-out
          h-full w-[280px] bg-white p-6 flex flex-col 
          border-r border-gray-200 fixed top-0 left-0 z-40 overflow-y-auto`}
      >
        {/* Logo / Title */}
        <div className="mb-10 mt-2 flex flex-col items-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 mb-3">
            <School size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a4480] tracking-tight">
            School DMS
          </h2>
          <p className="text-sm text-gray-500 mt-1">Digital Management System</p>
        </div>

        {/* Sidebar nav */}
        <nav className="flex-grow space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link
                key={item.id}
                to={`/${item.id}`}   // ✅ fixed for react-router
                onClick={() => handleItemClick(item.id)}
                className={`flex items-center p-4 font-medium rounded-xl transition-all duration-200
                  ${isActive ? "bg-blue-50 text-blue-700 shadow-inner" : "text-gray-700"} 
                  ${item.hover} hover:translate-x-1 group`}
              >
                <IconComponent
                  size={20}
                  className={`${isActive ? "text-blue-700" : item.color} group-hover:scale-110`}
                />
                <span className="ml-4 flex-grow">{item.label}</span>
                {isActive && <ChevronRight size={16} className="text-blue-700 animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="mb-4 px-2">
            <div className="h-1.5 w-8 rounded-full bg-green-500 mb-2"></div>
            <p className="text-xs text-gray-500">System Status: Operational</p>
          </div>

          <Link
            to="/logout"   // ✅ use Link instead of <a>
            className="flex items-center p-4 text-gray-600 font-medium rounded-xl hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <LogOut size={20} className="text-red-500 group-hover:animate-pulse" />
            <span className="ml-4">Logout</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
