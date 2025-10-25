import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import VisitorForm from "../securityDashboard/VisitorForm";

const VisitorFormModal = ({ open, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center 
                 bg-black/50 backdrop-blur-sm overflow-y-auto" // ✅ allow scrolling on overlay
    >
      <div
        className="relative bg-white w-full 
                   max-w-lg md:max-w-xl 
                   my-6 sm:my-10 rounded-2xl shadow-2xl border border-gray-200
                   transition-all duration-300 mx-4
                   sm:rounded-2xl 
                   md:rounded-2xl 
                   sm:overflow-hidden"
      >
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
                     active:scale-95 transition duration-200 z-50"
        >
          <X size={22} />
        </button>

        {/* --- Modal Content --- */}
        <div
          className="p-6 sm:p-8 font-sans text-gray-800 
                     max-h-[90vh] overflow-y-auto" // ✅ scroll inside modal content if needed
        >
          <VisitorForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VisitorFormModal;
