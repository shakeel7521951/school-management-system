// components/modals/VisitorFormModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import VisitorForm from "../securityDashboard/VisitorForm";

const VisitorFormModal = ({ open, onClose }) => {
  if (!open) return null;

  // ✅ Render the modal at the root level to avoid layout interference
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4
                 bg-black/70 backdrop-blur-sm"
    >
      <div
        className="relative bg-white w-full max-w-lg md:max-w-xl max-h-[90vh]
                   rounded-2xl shadow-2xl overflow-y-auto
                   border border-gray-200"
      >
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 
                     transition duration-200"
        >
          <X size={22} />
        </button>

        {/* --- Modal Content --- */}
        <div className="p-6 font-sans text-gray-800">
          <VisitorForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body // ⬅ ensures consistent layout anywhere in app
  );
};

export default VisitorFormModal;
