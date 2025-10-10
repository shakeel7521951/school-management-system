import React from "react";
import { FaEye, FaEdit, FaExclamationTriangle } from "react-icons/fa";

const DepartParentComplaintTable = ({
  complaints = [],
  statusClasses,
  setViewModal,
  setEditModal,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
      {/* --- TABLE VIEW (for md & above) --- */}
      <div className="hidden md:block">
        <table className="min-w-[1200px] w-full text-sm border-collapse">
          <thead className="bg-[#104c80]/10 text-[#104c80] uppercase text-xs font-semibold">
            <tr>
              {[
                "Parent Name",
                "Relation",
                "Student Name",
                "Class",
                "Type",
                "Severity",
                "Impact",
                "Expected Action",
                "Date",
                "Status",
                "Actions",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-5 py-3 text-center align-middle whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {complaints.length > 0 ? (
              complaints.map((c, i) => (
                <tr
                  key={c._id || i}
                  className="border-b hover:bg-gray-50 transition text-gray-700"
                >
                  <td className="px-5 py-3 align-middle text-center">
                    {c.parentName}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.relationToStudent}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.studentName}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.class}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.complaintType}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.severity}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.impact}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {c.expectedAction}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    {new Date(c.date).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        statusClasses[c.status] || "text-gray-600 bg-gray-100"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 align-middle text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewModal(c)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs flex items-center gap-1"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => setEditModal(c)}
                        className="px-3 py-1 bg-[#104c80] text-white rounded-lg hover:bg-[#0d3c68] text-xs flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="p-5 text-center text-gray-500 align-middle"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2 text-gray-400" />
                  No complaints found for your department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARD VIEW (for mobile) --- */}
      <div className="block md:hidden p-3 space-y-4">
        {complaints.length > 0 ? (
          complaints.map((c, i) => (
            <div
              key={c._id || i}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 space-y-2"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="font-semibold text-[#104c80] text-sm">
                  {c.parentName} ({c.relationToStudent})
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusClasses[c.status] || "text-gray-600 bg-gray-100"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="text-gray-700 text-xs space-y-1">
                <p>
                  <strong>Student:</strong> {c.studentName}
                </p>
                <p>
                  <strong>Class:</strong> {c.class}
                </p>
                <p>
                  <strong>Type:</strong> {c.complaintType}
                </p>
                <p>
                  <strong>Severity:</strong> {c.severity}
                </p>
                <p>
                  <strong>Impact:</strong> {c.impact}
                </p>
                <p>
                  <strong>Expected Action:</strong> {c.expectedAction}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(c.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  onClick={() => setViewModal(c)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs flex items-center gap-1"
                >
                  <FaEye /> View
                </button>
                <button
                  onClick={() => setEditModal(c)}
                  className="px-3 py-1 bg-[#104c80] text-white rounded-lg hover:bg-[#0d3c68] text-xs flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2 text-gray-400" />
            No complaints found for your department.
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartParentComplaintTable;
