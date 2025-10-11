// components/modals/VisitorFormModal.jsx
import { X } from "lucide-react";
import VisitorForm from "../securityDashboard/VisitorForm";

const VisitorFormModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div
        className="bg-white w-full max-w-xl h-auto max-h-[90vh] rounded-2xl shadow-2xl relative overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={22} />
        </button>

        {/* Visitor Form */}
        <div className="p-6">
          <VisitorForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default VisitorFormModal;
