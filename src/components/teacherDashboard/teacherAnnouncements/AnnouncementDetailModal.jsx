import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AnnouncementDetailModal = ({ announcement, onClose }) => {
  if (!announcement) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-[#104c80] mb-3">{announcement.title}</h2>
        <p className="text-gray-500 text-sm mb-4">{announcement.date}</p>
        <p className="text-gray-700 whitespace-pre-line">{announcement.description || "No description provided."}</p>
      </motion.div>
    </motion.div>
  );
};

export default AnnouncementDetailModal;
