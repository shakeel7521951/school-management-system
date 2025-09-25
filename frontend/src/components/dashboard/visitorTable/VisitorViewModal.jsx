import { X, CheckCircle, XCircle } from "lucide-react";

const VisitorViewModal = ({ visitor, onClose, onApprove, onReject }) => {
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

        <div className="space-y-3 text-sm">
          <p>
            <span className="font-bold text-slate-700">Name:</span>{" "}
            {visitor.name}
          </p>
          <p>
            <span className="font-bold text-slate-700">Host Email:</span>{" "}
            {visitor.hostEmail}
          </p>
          <p>
            <span className="font-bold text-slate-700">Government ID:</span>{" "}
            {visitor.governmentId}
          </p>
          <p>
            <span className="font-bold text-slate-700">Reason:</span>{" "}
            {visitor.reason}
          </p>
          <p>
            <span className="font-bold text-slate-700">Created At:</span>{" "}
            {new Date(visitor.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-bold text-slate-700">Updated At:</span>{" "}
            {new Date(visitor.updatedAt).toLocaleString()}
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
              {visitor.status}
            </span>
          </p>
        </div>

        {/* ✅ Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => onApprove(visitor._id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 text-sm font-medium"
          >
            <CheckCircle size={14} /> Approve
          </button>
          <button
            onClick={() => onReject(visitor._id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
          >
            <XCircle size={14} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorViewModal;
