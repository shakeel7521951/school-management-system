// components/modals/VisitorFormModal.jsx
import { X } from "lucide-react";
import VisitorForm from "../securityDashboard/VisitorForm"

const VisitorFormModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Visitor Form */}
        <VisitorForm onClose={onClose} />
      </div>
    </div>
  );
};

export default VisitorFormModal;
