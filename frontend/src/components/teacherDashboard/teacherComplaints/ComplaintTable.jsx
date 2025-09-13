import React, { useState } from "react";
import ComplaintDetailModal from "./CompalintDetailModal";

const ComplaintTable = ({ complaints, statusStyles, statusIcons }) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    <div className="bg-white shadow rounded-2xl p-4 sm:p-6">
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-medium text-gray-900">
                  {complaint.title}
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {complaint.date}
                </td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border shadow-sm ${statusStyles[complaint.status]}`}
                  >
                    {statusIcons[complaint.status]} {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {complaint.type || "Student"}
                </td>
                <td className="px-6 py-3 text-sm">
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="px-3 py-1 bg-[#104c80] text-white rounded-lg text-sm hover:bg-[#0d3a63] transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card style for mobile */}
      <div className="space-y-4 md:hidden">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <div className="mb-2">
              <p className="font-semibold text-gray-900">{complaint.title}</p>
              <p className="text-xs text-gray-500">{complaint.type || "Student"}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-gray-500">{complaint.date}</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 border shadow-sm ${statusStyles[complaint.status]}`}
              >
                {statusIcons[complaint.status]} {complaint.status}
              </span>
            </div>
            <button
              onClick={() => setSelectedComplaint(complaint)}
              className="w-full px-3 py-2 bg-[#104c80] text-white rounded-lg text-sm hover:bg-[#0d3a63] transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          statusStyles={statusStyles}
          statusIcons={statusIcons}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};

export default ComplaintTable;
