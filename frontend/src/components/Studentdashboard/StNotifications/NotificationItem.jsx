import React from "react";
import { motion } from "framer-motion";

const NotificationItem = ({ n }) => {
  return (
    <motion.div
      className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl sm:rounded-2xl border shadow-sm transition cursor-pointer
        ${
          n.unread
            ? "bg-blue-50 border-blue-200"
            : "bg-gray-50 border-gray-200"
        }
        hover:shadow-md hover:border-[#1a4480]`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Icon */}
      <div className="bg-white p-3 rounded-full shadow w-fit mx-auto sm:mx-0">
        {n.icon}
      </div>

      {/* Text */}
      <div className="flex-1 text-center sm:text-left">
        <p
          className={`font-medium ${
            n.unread ? "text-gray-900" : "text-gray-600"
          }`}
        >
          {n.text}
        </p>
        <p className="text-sm text-gray-500">
          {n.type} • {n.time}
        </p>
      </div>

      {/* Unread Dot */}
      {n.unread && (
        <div className="w-3 h-3 bg-blue-600 rounded-full mx-auto sm:mx-0"></div>
      )}
    </motion.div>
  );
};

export default NotificationItem;
