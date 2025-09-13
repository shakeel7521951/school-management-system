import React from "react";

const ComplaintTable = ({ complaints, statusStyles, statusIcons, setSelectedComplaint }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-2xl p-4">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">#</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Title</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Date</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Status</th>
            <th className="px-3 py-2 text-left text-sm font-medium text-gray-600">Type</th>
            <th className="px-3 py-2 text-center text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={complaint.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
              <td className="px-3 py-2 text-sm text-gray-700">{index + 1}</td>
              <td className="px-3 py-2 text-sm text-gray-800">{complaint.title}</td>
              <td className="px-3 py-2 text-sm text-gray-500">{complaint.date}</td>
              <td className="px-3 py-2 text-sm">
                <span
                  className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border shadow-sm ${statusStyles[complaint.status]}`}
                >
                  {statusIcons[complaint.status]} {complaint.status}
                </span>
              </td>
              <td className="px-3 py-2 text-sm text-gray-700">{complaint.type}</td>
              <td className="px-3 py-2 text-center">
                <button
                  onClick={() => setSelectedComplaint(complaint)}
                  className="px-3 py-1 text-white bg-[#104c80] hover:bg-[#0d3a63] rounded-lg text-sm transition"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;
