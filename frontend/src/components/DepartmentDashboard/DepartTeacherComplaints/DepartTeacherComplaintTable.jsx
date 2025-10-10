import React from "react";
import {
  FaUser,
  FaEye,
  FaEdit,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaExclamationTriangle,
} from "react-icons/fa";

const DepartTeacherComplaintTable = ({
  paginatedComplaints,
  filteredComplaints,
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
}) => {
  const headers = {
    employeeName: "Employee Name",
    jobTitle: "Job Title",
    department: "Department",
    date: "Date",
    type: "Type",
    severity: "Severity",
    impact: "Impact",
    expectedAction: "Expected Action",
    status: "Status",
    action: "Actions",
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "in progress":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "resolved":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* --- TABLE VIEW (Desktop) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#10448c] text-white text-sm whitespace-nowrap">
              {Object.entries(headers).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() =>
                    !["expectedAction", "action"].includes(key) && handleSort(key)
                  }
                  className="py-4 px-3 text-center text-[13px] font-semibold uppercase tracking-wide cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-1">
                    {label}
                    {!["expectedAction", "action"].includes(key) && (
                      <>
                        {sortConfig.key === key ? (
                          sortConfig.direction === "ascending" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort className="text-gray-300" />
                        )}
                      </>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedComplaints.length > 0 ? (
              paginatedComplaints.map((c, i) => (
                <tr
                  key={c._id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition text-sm`}
                >
                  <td className="px-3 py-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FaUser className="text-indigo-600 text-sm" />
                      </div>
                      <span className="font-medium">{c.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center align-middle">{c.jobTitle}</td>
                  <td className="px-3 py-3 text-center align-middle">{c.department}</td>
                  <td className="px-3 py-3 text-center align-middle">
                    {c.date ? new Date(c.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-3 py-3 text-center align-middle">{c.type}</td>
                  <td className="px-3 py-3 text-center align-middle">{c.severity}</td>
                  <td className="px-3 py-3 text-center align-middle">{c.impact}</td>
                  <td className="px-3 py-3 text-center align-middle">{c.expectedAction}</td>
                  <td className="px-3 py-3 text-center align-middle whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center align-middle">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setViewModal(c)}
                        className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setEditModal(c)}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                      >
                        <FaEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- CARD VIEW (Mobile) --- */}
      <div className="block md:hidden p-3">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white border border-gray-200 rounded-xl p-4 mb-3 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaUser className="text-indigo-600" />
                <div>
                  <p className="font-semibold text-gray-800">{c.employeeName}</p>
                  <p className="text-xs text-gray-500">{c.jobTitle}</p>
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <p><strong>Department:</strong> {c.department}</p>
                <p><strong>Date:</strong> {c.date ? new Date(c.date).toLocaleDateString() : "-"}</p>
                <p><strong>Type:</strong> {c.type}</p>
                <p><strong>Severity:</strong> {c.severity}</p>
                <p><strong>Impact:</strong> {c.impact}</p>
                <p><strong>Expected Action:</strong> {c.expectedAction}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <button onClick={() => setViewModal(c)} className="text-indigo-600"><FaEye /></button>
                <button onClick={() => setEditModal(c)} className="text-green-600"><FaEdit /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-5">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            No complaints found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartTeacherComplaintTable;
