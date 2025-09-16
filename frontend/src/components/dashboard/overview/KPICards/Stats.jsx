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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {kpiCards.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default Stats;
