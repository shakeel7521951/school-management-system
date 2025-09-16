import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

const DocumentViewModal = ({ doc, onClose }) => {
  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">View Document</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-5 space-y-2 text-gray-700">
              <p><span className="font-medium">Title:</span> {doc.title}</p>
              <p><span className="font-medium">Uploaded By:</span> {doc.uploaderName} ({doc.uploadedBy})</p>
              <p><span className="font-medium">Date:</span> {doc.date}</p>
              <p><span className="font-medium">Status:</span> {doc.status}</p>
              {doc.fileName && <p><span className="font-medium">File:</span> {doc.fileName}</p>}
              {doc.reviewerNotes && <p><span className="font-medium">Notes:</span> {doc.reviewerNotes}</p>}
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {doc.fileName && (
                <a
                  href={`/${doc.fileName}`}
                  download
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download size={16} /> Download
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DocumentViewModal;
