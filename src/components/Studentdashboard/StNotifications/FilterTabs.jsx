import React from "react";

const FilterTabs = ({ filter, setFilter }) => {
  const tabs = ["All", "Unread", "Urgent"];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition flex-1 sm:flex-none text-center ${
            filter === tab
              ? "bg-[#1a4480] text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
