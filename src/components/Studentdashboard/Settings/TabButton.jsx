import React from "react";

const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab, darkMode }) => {
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all duration-300 transform
        ${
          activeTab === id
            ? "bg-[#104C80] text-white shadow-md scale-105"
            : darkMode
            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
};

export default TabButton;
