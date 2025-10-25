import React from "react";

const NotificationHeader = ({ onMarkAllRead }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a4480]">
        Notifications
      </h1>
      <button
        onClick={onMarkAllRead}
        className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-[#1a4480] rounded-lg shadow hover:bg-[#163668] transition"
      >
        Mark all as read
      </button>
    </div>
  );
};

export default NotificationHeader;
