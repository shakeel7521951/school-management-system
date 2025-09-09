import React from "react";
import { motion } from "framer-motion";

const ComplaintStatus = ({ complaintId, status, updated }) => {
  if (!complaintId) return null; // Render nothing if no ID provided

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 bg-gray-50 border rounded-lg shadow-sm max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        Complaint ID: {complaintId}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`${
            status === "Resolved"
              ? "text-green-600"
              : status === "Under Review"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {status || "Pending"}
        </span>
      </p>
      {updated && (
        <p className="mt-1 text-sm text-gray-500">Last Updated: {updated}</p>
      )}
    </motion.div>
  );
};

export default ComplaintStatus;
