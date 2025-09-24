import { X } from "lucide-react";

const VisitorViewModal = ({ visitor, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        {/* Visitor Details */}
        <h2 className="text-xl font-bold text-[#104c80] mb-4">
          Visitor Details
        </h2>
        <div className="space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-medium">Name:</span> {visitor.name}
          </p>
          <p>
            <span className="font-medium">Badge:</span> {visitor.badge}
          </p>
          <p>
            <span className="font-medium">Reason:</span> {visitor.reason}
          </p>
          <p>
            <span className="font-medium">Host:</span> {visitor.host}
          </p>
          <p>
            <span className="font-medium">Check-in Time:</span> {visitor.time}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                visitor.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : visitor.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {visitor.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
