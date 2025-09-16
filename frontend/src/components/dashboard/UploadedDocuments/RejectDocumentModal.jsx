import React from "react";
import { X } from "lucide-react";

const RejectDocumentModal = ({ selectedDoc, rejectNote, setRejectNote, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-[#104c80]">Reject Document</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          <p className="text-sm text-gray-600 mb-4">
            You are about to reject <span className="font-medium">"{selectedDoc.title}"</span>. Please provide a reason for rejection.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
            <textarea
              placeholder="Enter the reason for rejection..."
              className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none"
              rows={4}
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 md:p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!rejectNote.trim()}
            className={`px-4 py-2 text-white text-sm font-medium rounded-md transition-colors ${
              !rejectNote.trim()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectDocumentModal;
