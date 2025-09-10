import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div
      className="group flex items-center gap-4 w-[300px] md:w-[250px]  bg-white shadow-md py-4 px-2
                 border border-gray-200 rounded-2xl transition-all duration-300 cursor-pointer
                 hover:shadow-lg hover:scale-105"
    >
      {/* Icon */}
      <div
        className="p-4 rounded-full flex items-center justify-center shadow-md text-2xl 
                   bg-[#1a4480] text-white transition-all duration-300 group-hover:bg-yellow-200/40 group-hover:text-[#fd8700]"
      >
        {React.cloneElement(icon, {
          className:
            "transition-colors duration-300 group-hover:text-[#fd8700]",
        })}
      </div>

      {/* Content in one line */}
      <div className="flex-1">
        <p className="text-[18px] font-extrabold text-gray-900 ">{value}</p>
        <p className="text-gray-500 ">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
