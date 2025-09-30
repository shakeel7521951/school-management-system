import React from "react";
import { FileText, XCircle, Clock } from "lucide-react"; // Icons

const ComplaintKPICards = ({ total = 12, rejected = 3, pending = 5 }) => {
  const primary = "#104c80";

  const cards = [
    {
      title: "Total Complaints",
      value: total,
      color: `text-[${primary}]`,
      iconBg: "from-blue-100 to-blue-200",
      icon: <FileText className="w-7 h-7" style={{ color: primary }} />,
    },
    {
      title: "Rejected Complaints",
      value: rejected,
      color: "text-red-600",
      iconBg: "from-red-100 to-red-200",
      icon: <XCircle className="w-7 h-7 text-red-600" />,
    },
    {
      title: "Pending Complaints",
      value: pending,
      color: "text-yellow-600",
      iconBg: "from-yellow-100 to-yellow-200",
      icon: <Clock className="w-7 h-7 text-yellow-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Icon Circle */}
          <div
            className={`p-3 rounded-full bg-gradient-to-br ${card.iconBg} flex items-center justify-center`}
          >
            {card.icon}
          </div>

          {/* Text Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 tracking-wide">
              {card.title}
            </h3>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplaintKPICards;
