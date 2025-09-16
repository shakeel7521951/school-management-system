import React from "react";
import StatCard from "./StatCard";
import { FaUsers, FaClipboardList, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const Stats = () => {
  const kpiCards = [
    { id: 1, title: "Visitors Today", value: 120, icon: <FaUsers /> },
    { id: 2, title: "Complaints Submitted", value: 35, icon: <FaClipboardList /> },
    { id: 3, title: "Documents Pending", value: 45, icon: <FaFileAlt /> },
    { id: 4, title: "Documents Approved", value: 30, icon: <FaCheckCircle /> },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full px-2 sm:px-4">
      {kpiCards.map((stat) => (
        <div
          key={stat.id}
          className="w-full"
        >
          <StatCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        </div>
      ))}
    </div>
  );
};

export default Stats;