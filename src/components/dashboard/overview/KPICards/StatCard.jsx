import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="
      bg-white 
      rounded-lg 
      shadow-md 
      p-4 
      sm:p-5 
      flex 
      items-center 
      justify-between 
      border 
      border-gray-100 
      hover:shadow-lg 
      transition-shadow 
      duration-200
      h-full
    ">
      <div>
        <p className="
          text-xs 
          xs:text-sm 
          sm:text-base 
          text-gray-500 
          font-medium 
          mb-1 
          sm:mb-2
        ">
          {title}
        </p>
        <p className="
          text-xl 
          xs:text-2xl 
          sm:text-3xl 
          font-bold 
          text-gray-800
        ">
          {value}
        </p>
      </div>
      <div className="
        p-2 
        xs:p-3 
        rounded-full 
        bg-blue-100 
        text-blue-600 
        text-lg 
        xs:text-xl 
        sm:text-2xl
      ">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;