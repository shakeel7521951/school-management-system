import React from "react";
import { motion } from "framer-motion";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ filtered }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border-t-4 border-[#1a4480] space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {filtered.length > 0 ? (
        filtered.map((n) => <NotificationItem key={n.id} n={n} />)
      ) : (
        <p className="text-gray-600 text-center py-6">
          No notifications found.
        </p>
      )}
    </motion.div>
  );
};

export default NotificationList;
