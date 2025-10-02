import React from "react";

const ComplaintTable = ({ complaints }) => {
  // ✅ Status styles
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-300",
    Resolved: "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <div>
      {/* ✅ Table for md and above */}
      <div className="hidden md:block bg-white shadow-lg rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border border-gray-300 text-sm table-fixed">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
              <tr>
                {[
                  "Employee Name",
                  "Job Title",
                  "Department",
                  "Date",
                  "Type",
                  "Severity",
                  "Impact",
                  "Details",
                  "Expected Action",
                  "Status",
                ].map((head, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider border border-gray-300"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-3 font-medium text-gray-900 border border-gray-300">
                    {complaint.employeeName}
                  </td>
                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.jobTitle}
                  </td>
                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.department}
                  </td>
                  <td className="px-3 py-3 text-gray-500 border border-gray-300">
                    {complaint.date
                      ? new Date(complaint.date).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-3 border border-gray-300">
                    {complaint.type}
                  </td>
                  <td className="px-2 py-2 border border-gray-300">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold 
                        ${complaint.severity === "Urgent"
                          ? "bg-red-100 text-red-700"
                          : complaint.severity === "Serious"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {complaint.severity}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-300">
                    {complaint.impact}
                  </td>
                  <td className="px-2 py-3 text-gray-700 border border-gray-300">
                    {complaint.details.split(' ').slice(0, 2).join(' ')}...
                  </td>

                  <td className="px-3 py-3 text-gray-700 border border-gray-300">
                    {complaint.expectedAction}
                  </td>
                  <td className="px-3 py-3 border border-gray-300">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[complaint.status]}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="md:hidden space-y-4">
        {complaints.map((complaint, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl border border-gray-200 p-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">
                  {complaint.employeeName}
                </h4>
                <p className="text-xs text-gray-500">
                  {complaint.jobTitle} • {complaint.department}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[complaint.status]}`}
              >
                {complaint.status}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {complaint.date
                  ? new Date(complaint.date).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <span className="font-semibold">Type:</span>{" "}
                {complaint.type}
              </p>
              <p>
                <span className="font-semibold">Severity:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold 
                    ${complaint.severity === "Urgent"
                      ? "bg-red-100 text-red-700"
                      : complaint.severity === "Serious"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {complaint.severity}
                </span>
              </p>
              <p>
                <span className="font-semibold">Impact:</span>{" "}
                {complaint.impact}
              </p>
              <p>
                <span className="font-semibold">Details:</span>{" "}
                {complaint.details}
              </p>
              <p>
                <span className="font-semibold">Expected Action:</span>{" "}
                {complaint.expectedAction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintTable;
