import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div
      className="group flex items-center gap-5 w-[300px] md:w-[250px] bg-white py-5 px-2
                 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300
                 hover:shadow-lg hover:border-[#1a4480]/50 hover:-translate-y-1"
    >
      {/* Icon Section */}
      <div
        className="p-3 rounded-xl flex items-center justify-center text-2xl 
                   bg-gradient-to-r from-[#1a4480] to-[#2c5da7] text-white shadow-md
                   transition-all duration-300 group-hover:from-[#fd8700] group-hover:to-[#f6a100]"
      >
        {React.cloneElement(icon, {
          className: "transition-colors duration-300",
        })}
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-sm font-medium text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
