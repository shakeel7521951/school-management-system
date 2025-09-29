import React, { useState, useEffect } from "react";
import {
  Users,
  FileText,
  MessageCircle,
  BarChart2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  School,
} from "lucide-react";
import { FaChartLine } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("admincomplain");
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
    if (!isDesktop) setIsOpen(false);
  };

  const menuItems = [
    // { id: "/overview", label: "Overview", icon: Users, color: "text-indigo-500", hover: "hover:bg-indigo-50" },

     { id: "analytics", label: "Analytics", icon: FaChartLine, color: "text-[#3B82F6]", hover: "hover:bg-amber-50" },
    { 
      id: "/admincomplain", 
      label: "Complaints", 
      icon: MessageCircle, 
      color: "text-[#3B82F6]", 
      hover: "hover:bg-pink-50" 
    },
    {
      id: "documents",
      label: "Documents",
      icon: FileText,
      color: "text-[#3B82F6]", 
      hover: "hover:bg-green-50",
      dropdown: [
        { id: "/documents/requests", label: "Requested Documents" },
        { id: "/documents/uploaded", label: "Uploaded Documents" },
      ],
    },
   { id: "visitortable", label: "Visitors", icon: BarChart2, color: "text-[#3B82F6]", hover: "hover:bg-amber-50" },
    { id: "users", label: "Users", icon: Users, color: "text-[#3B82F6]", hover: "hover:bg-amber-50" },
    { id: "registration-data", label: "Registration Data", icon: Users, color: "text-[#3B82F6]", hover: "hover:bg-amber-50" },
   


    // { id: "reports", label: "Reports", icon: FileText, color: "text-purple-500", hover: "hover:bg-purple-50" },
  ];

  return (
    <>
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200
                    shadow-2xl transition-all duration-500 z-50 flex flex-col justify-between
                    ${isOpen ? "w-64" : "w-0 lg:w-64"} overflow-hidden`}
      >
        <div className="px-4 py-6 flex flex-col items-center border-b border-gray-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-100 mb-2">
            <School size={32} className="text-blue-600" />
          </div>
          {isOpen && (
            <>
              <h2 className="text-xl font-bold text-[#1a4480] tracking-tight">
                Al Tamakon
              </h2>
              <p className="text-xs text-gray-500">Empowering Education Digitally</p>
            </>
          )}
        </div>

        <nav className="flex-grow space-y-2 mt-6 px-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            const isDropdownOpen = openDropdown === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.dropdown) {
                      setOpenDropdown(isDropdownOpen ? null : item.id);
                    } else {
                      setActiveItem(item.id);
                      navigate(item.id); // fixed navigation
                      if (!isDesktop) setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-all
                             ${isActive ? "bg-blue-50 text-blue-700 shadow-inner" : "text-gray-700"}
                             ${item.hover} hover:translate-x-1 hover:scale-105`}
                >
                  <IconComponent
                    size={20}
                    className={`${isActive ? "text-blue-700" : item.color}`}
                  />
                  {isOpen && (
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.dropdown &&
                        (isDropdownOpen ? (
                          <ChevronDown size={16} className="ml-auto text-gray-500" />
                        ) : (
                          <ChevronRight size={16} className="ml-auto text-gray-500" />
                        ))}
                    </>
                  )}
                </button>

                {item.dropdown && isDropdownOpen && isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.id}
                        to={sub.id}
                        onClick={() => {
                          setActiveItem(sub.id);
                          if (!isDesktop) setIsOpen(false);
                        }}
                        className={`block px-3 py-1.5 text-sm rounded-md
                                    ${activeItem === sub.id
                                      ? "bg-green-50 text-green-700"
                                      : "text-gray-600 hover:bg-gray-100"
                                    }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-3 mb-6 space-y-3">
          {isOpen && (
            <div className="mb-4 px-2">
              <div className="h-1.5 w-8 rounded-full bg-green-500 mb-2"></div>
              <p className="text-xs text-gray-500">System Status: Operational</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full group flex items-center gap-4 px-3 py-2 rounded-lg
                        hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all"
          >
            <LogOut size={20} className="text-red-500 group-hover:animate-pulse" />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 p-2.5 bg-blue-600 text-white shadow-lg rounded-full
                   transition duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
    </>
  );
};

export default Sidebar;
