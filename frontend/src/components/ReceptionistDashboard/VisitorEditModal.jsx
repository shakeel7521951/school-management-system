import React, { useState } from "react";
import { X } from "lucide-react";
import { useUpdateVisitorStatusMutation } from "../../redux/slices/VisitorApi";

const VisitorEditModal = ({ visitor, onClose }) => {
  const [status, setStatus] = useState(visitor.status || "pending");
  const [updateVisitorStatus, { isLoading }] = useUpdateVisitorStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateVisitorStatus({ id: visitor._id, status }).unwrap();
      onClose();
    } catch (error) {
      console.error("Error updating visitor:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative border border-gray-100">
        {/* --- Close Button --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* --- Title --- */}
        <h2 className="text-xl font-semibold text-[#104c80] text-center mb-5">
          Edit Visitor Status
        </h2>

        {/* --- Visitor Details (Read-only) --- */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-5 border border-gray-100">
          <p>
            <span className="font-semibold text-gray-700">Full Name: </span>
            <span className="text-gray-600">{visitor.name || "—"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Qatar ID / Passport: </span>
            <span className="text-gray-600">{visitor.governmentId || "—"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Person / Department: </span>
            <span className="text-gray-600">{visitor.hostEmail || "—"}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-700">Purpose of Visit: </span>
            <span className="text-gray-600">{visitor.reason || "—"}</span>
          </p>
        </div>

        {/* --- Status Selector --- */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Change Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#104c80]"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-4 py-2 text-sm rounded-md bg-[#104c80] text-white hover:bg-[#0c3b67] transition disabled:opacity-60"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorEditModal;
