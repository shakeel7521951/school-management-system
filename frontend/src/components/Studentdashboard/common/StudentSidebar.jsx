import React, { useState } from "react";
import {
  FileText,
  MessageSquare,
  Settings,
  Bell,
  Menu,
  X,
} from "lucide-react";

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 
                    transition-all duration-300 z-50 
                    ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full 
                       bg-gradient-to-r from-[#104C80] to-[#1e64a9] text-white font-bold text-lg shadow"
          >
            S
          </div>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition md:block hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex flex-col gap-2 px-2">
          {/* Complaints */}
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 
                       hover:bg-gradient-to-r hover:from-[#104C80]/90 hover:to-[#1e64a9]/90 
                       hover:text-white transition shadow-sm"
          >
            <MessageSquare size={20} />
            {isOpen && <span className="text-sm font-medium">Complaints</span>}
          </a>

          {/* Documents */}
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 
                       hover:bg-gradient-to-r hover:from-[#104C80]/90 hover:to-[#1e64a9]/90 
                       hover:text-white transition shadow-sm"
          >
            <FileText size={20} />
            {isOpen && <span className="text-sm font-medium">Documents</span>}
          </a>

          {/* Notifications */}
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 
                       hover:bg-gradient-to-r hover:from-[#104C80]/90 hover:to-[#1e64a9]/90 
                       hover:text-white transition shadow-sm"
          >
            <Bell size={20} />
            {isOpen && <span className="text-sm font-medium">Notifications</span>}
          </a>

          {/* Settings */}
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 
                       hover:bg-gradient-to-r hover:from-[#104C80]/90 hover:to-[#1e64a9]/90 
                       hover:text-white transition shadow-sm"
          >
            <Settings size={20} />
            {isOpen && <span className="text-sm font-medium">Settings</span>}
          </a>
        </nav>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-white shadow-lg border rounded-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </>
  );
};

export default StudentSidebar;
