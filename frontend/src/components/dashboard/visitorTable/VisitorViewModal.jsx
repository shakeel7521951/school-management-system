import { X } from "lucide-react";

const VisitorViewModal = ({ visitor, onClose }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-[#104c80] mb-5 text-center">
          Visitor Details
        </h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-bold text-slate-700">Name:</span>{" "}
            {visitor.name}
          </p>
          <p>
            <span className="font-bold text-slate-700">Badge:</span>{" "}
            {visitor.badge}
          </p>
          <p>
            <span className="font-bold text-slate-700">Reason:</span>{" "}
            {visitor.reason}
          </p>
          <p>
            <span className="font-bold text-slate-700">Host:</span>{" "}
            {visitor.host}
          </p>
          <p>
            <span className="font-bold text-slate-700">Check-in:</span>{" "}
            {visitor.time}
          </p>
          <p>
            <span className="font-bold text-slate-700">Status:</span>{" "}
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${
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
