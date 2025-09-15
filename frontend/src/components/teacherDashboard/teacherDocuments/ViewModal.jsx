import React from "react";
import { motion } from "framer-motion";
import { X, FileText, Calendar, Tag, MessageSquare, Download } from "lucide-react";

const ViewModal = ({ doc, onClose, onDownload, getStatusBadge }) => {
  if (!doc) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{doc.title}</h2>

        {/* Details */}
        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Tag className="text-gray-500" size={18} />
            <p className="text-sm">
              <span className="font-medium">Type:</span> {doc.type}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="text-gray-500" size={18} />
            <p className="text-sm">
              <span className="font-medium">Date Uploaded:</span> {doc.date}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="text-gray-500" size={18} />
            <p className="text-sm">
              <span className="font-medium">File:</span> {doc.fileName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                doc.status
              )}`}
            >
              {doc.status}
            </span>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="text-gray-500 mt-1" size={18} />
            <div>
              <p className="font-medium">Reviewer Notes</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {doc.reviewerNotes && doc.reviewerNotes !== "—"
                  ? doc.reviewerNotes
                  : "No feedback yet."}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
          {/* <button
            onClick={() => onDownload(doc)}
            className="px-5 py-2 rounded-lg bg-[#104c80] text-white font-medium hover:bg-[#0d3a61] transition flex items-center gap-2"
          >
            <Download size={16} /> Download
          </button> */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewModal;
