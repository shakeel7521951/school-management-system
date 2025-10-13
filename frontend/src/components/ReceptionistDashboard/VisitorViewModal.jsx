import { X } from "lucide-react";

const VisitorViewModal = ({ visitor, onClose }) => {
  if (!visitor) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* --- Modal Title --- */}
        <h2 className="text-lg font-bold text-[#104c80] mb-5 text-center">
          Visitor Details
        </h2>

        {/* --- Visitor Information --- */}
        <div className="space-y-3 text-sm">
          <p>
            <span className="font-bold text-slate-700">Full Name:</span>{" "}
            {visitor.name || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">
              Qatar ID / Passport:
            </span>{" "}
            {visitor.governmentId || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Phone Number:</span>{" "}
            {visitor.phone || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Purpose of Visit:</span>{" "}
            {visitor.reason || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Person or Department To Visit:</span>{" "}
            {visitor.hostEmail || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Signature:</span>{" "}
            {visitor.signature || "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Submitted On:</span>{" "}
            {visitor.createdAt
              ? new Date(visitor.createdAt).toLocaleString()
              : "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Updated On:</span>{" "}
            {visitor.updatedAt
              ? new Date(visitor.updatedAt).toLocaleString()
              : "—"}
          </p>
          <p>
            <span className="font-bold text-slate-700">Status:</span>{" "}
            <span
              className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                visitor.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : visitor.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {visitor.status
                ? visitor.status.charAt(0).toUpperCase() +
                  visitor.status.slice(1)
                : "—"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
