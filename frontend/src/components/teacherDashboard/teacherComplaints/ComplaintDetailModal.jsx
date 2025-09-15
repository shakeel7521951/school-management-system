import React from "react";
import { motion } from "framer-motion";
import { X, Calendar, FileText, Building, AlertTriangle, Hash, CheckCircle2 } from "lucide-react";

const ComplaintDetailModal = ({ complaint, statusStyles, statusIcons, onClose }) => {
  if (!complaint) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complaint Details</h2>

        {/* Status */}
        <div className="flex items-center gap-2 mb-6">
          <span
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${statusStyles[complaint.status]}`}
          >
            {statusIcons[complaint.status]}
            {complaint.status}
          </span>
        </div>

        {/* Info Section */}
        <div className="space-y-4 text-gray-700">
          {/* Complaint ID */}
          <div className="flex items-start gap-3">
            <Hash className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium">Complaint ID</p>
              <p className="text-sm">{complaint.id}</p>
            </div>
          </div>

          {/* Two Inputs in One Row */}
          <div className="flex gap-4">
            {/* Department */}
            <div className="flex-1 flex items-start gap-3">
              <Building className="text-gray-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Department</p>
                <p className="text-sm">{complaint.department || "Not Assigned"}</p>
              </div>
            </div>

            {/* Date Submitted */}
            <div className="flex-1 flex items-start gap-3">
              <Calendar className="text-gray-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Date Submitted</p>
                <p className="text-sm">{complaint.date}</p>
              </div>
            </div>
          </div>

          {/* Complaint Type */}
          {complaint.type && (
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-gray-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Complaint Type</p>
                <p className="text-sm">{complaint.type}</p>
              </div>
            </div>
          )}

          {/* Severity */}
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium">Severity</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  complaint.severity === "High"
                    ? "bg-red-100 text-red-700"
                    : complaint.severity === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {complaint.severity}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <FileText className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium">Complaint Details</p>
              <p className="text-sm leading-relaxed">{complaint.complaintDetails}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComplaintDetailModal;