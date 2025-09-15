import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const DeleteConfirmModal = ({ doc, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Delete Document</h3>
              <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-5 text-gray-700">
              <p>Are you sure you want to delete:</p>
              <p className="mt-2 font-semibold">{doc.title}</p>
              <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
