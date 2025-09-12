import React, { useState } from "react";
import { Bell, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import NotificationHeader from "../../components/Studentdashboard/StNotifications/NotificationHeader";
import NotificationList from "../../components/Studentdashboard/StNotifications/NotificationList";
import FilterTabs from "../../components/Studentdashboard/StNotifications/FilterTabs";
const StNotifications = () => {
  const [filter, setFilter] = useState("All");

  const notifications = [
    {
      id: 1,
      text: "Exam schedule uploaded for Fall 2025",
      type: "Academic",
      time: "2h ago",
      unread: true,
      icon: <FileText className="text-blue-600" size={22} />,
    },
    {
      id: 2,
      text: "Assignment deadline extended for Physics",
      type: "Urgent",
      time: "Yesterday",
      unread: true,
      icon: <AlertTriangle className="text-red-500" size={22} />,
    },
    {
      id: 3,
      text: "Holiday announced on 15th September",
      type: "General",
      time: "2 days ago",
      unread: false,
      icon: <Bell className="text-gray-600" size={22} />,
    },
    {
      id: 4,
      text: "Your complaint has been resolved",
      type: "Admin",
      time: "3 days ago",
      unread: false,
      icon: <CheckCircle className="text-green-600" size={22} />,
    },
  ];

  const markAllRead = () => {
    notifications.forEach((n) => (n.unread = false));
    setFilter(filter); // re-render
  };

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return n.unread;
    if (filter === "Urgent") return n.type === "Urgent";
    return true;
  });

  return (
    <div className="md:ml-20 lg:ml-64 p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 font-sans">
      {/* ✅ Header */}
      <NotificationHeader onMarkAllRead={markAllRead} />

      {/* ✅ Filter Tabs */}
      <FilterTabs filter={filter} setFilter={setFilter} />

      {/* ✅ Notifications List */}
      <NotificationList filtered={filtered} />
    </div>
  );
};

export default StNotifications;
