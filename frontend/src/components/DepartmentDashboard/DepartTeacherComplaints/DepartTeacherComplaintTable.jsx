import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaEye,
  FaEdit,
  FaExclamationTriangle,
} from "react-icons/fa";

// 🕒 Helper to format "time ago"
const getTimeAgo = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

const DepartTeacherComplaintTable = ({
  paginatedComplaints,
  filteredComplaints,
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
}) => {
  const { t } = useTranslation("departTeacherComplaintTable");
  const headers = t("table.headers", { returnObjects: true });

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

      {/* 💻 Desktop Table */}
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
                  {label}
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
                  } hover:bg-gray-100 transition text-sm whitespace-nowrap`}
                >
                  <td className="px-3 py-3 text-center align-middle">
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FaUser className="text-indigo-600 text-sm" />
                      </div>
                      <span className="font-medium">{c.employeeName}</span>
                    </div>
                  </td>

                  <td className="px-3 py-3 text-center">{c.jobTitle}</td>
                  <td className="px-3 py-3 text-center">{c.department}</td>

                  {/* ✅ CreatedAt: Exact date, time + "time ago" */}
                  <td className="px-3 py-3 text-center">
                    {c.createdAt ? (
                      <>
                        <div>
                          {new Date(c.createdAt).toLocaleString(undefined, {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {getTimeAgo(c.createdAt)}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-3 py-3 text-center">{c.type}</td>
                  <td className="px-3 py-3 text-center">{c.severity}</td>
                  <td className="px-3 py-3 text-center">{c.impact}</td>
                  <td className="px-3 py-3 text-center">{c.expectedAction}</td>

                  <td className="px-3 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-3 py-3 text-center">
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
                <td colSpan="10" className="py-6 text-center text-gray-400 text-sm">
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("table.noData.message")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Cards */}
      <div className="block md:hidden p-4 space-y-4">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-gray-50 rounded-xl p-4 shadow border border-gray-200"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaUser className="text-indigo-600 text-sm" />
                  </div>
                  <h3 className="font-semibold text-gray-800">{c.employeeName}</h3>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusColor(
                    c.status
                  )}`}
                >
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <strong>Job Title:</strong> {c.jobTitle}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Department:</strong> {c.department}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Type:</strong> {c.type}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Severity:</strong> {c.severity}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Impact:</strong> {c.impact}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Expected Action:</strong> {c.expectedAction}
              </p>

              {/* ✅ CreatedAt section */}
              <div className="text-xs text-gray-500 mt-2">
                <div>
                  {new Date(c.createdAt).toLocaleString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </div>
                <div>{getTimeAgo(c.createdAt)}</div>
              </div>

              <div className="flex justify-end gap-3 mt-3">
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
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            {t("table.noData.message")}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartTeacherComplaintTable;
