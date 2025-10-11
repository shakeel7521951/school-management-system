import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaEye,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaExclamationTriangle,
} from "react-icons/fa";

// ✅ Helper function to display "time ago" using i18n translations
const timeAgo = (date, t) => {
  if (!date) return "-";
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval >= 1) {
      const key =
        interval === 1
          ? `parentComplaintsTable.timeAgo.${intervals[i].label}`
          : `parentComplaintsTable.timeAgo.${intervals[i].label}_plural`;

      return t(key, { count: interval });
    }
  }
  return t("parentComplaintsTable.timeAgo.justNow");
};

const ParentComplaintsTable = ({
  complaints = [],
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
  statusClasses,
}) => {
  const { t } = useTranslation("parentComplaintsTable");

  const headers = [
    { key: "parentName", sortable: true },
    { key: "relation", sortable: true },
    { key: "studentName", sortable: true },
    { key: "class", sortable: true },
    { key: "date", sortable: true },
    { key: "type", sortable: true },
    { key: "severity", sortable: true },
    { key: "impact", sortable: true },
    { key: "expectedAction", sortable: false },
    { key: "assignedTo", sortable: false },
    { key: "status", sortable: false },
    { key: "action", sortable: false },
  ];

  return (
    <>
      {/* ✅ DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#104c80] text-white text-center">
              {headers.map(({ key, sortable }) => (
                <th
                  key={key}
                  onClick={() => sortable && handleSort(key)}
                  className={`py-3 px-4 ${
                    sortable ? "cursor-pointer select-none" : ""
                  } align-middle whitespace-nowrap`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {t(`parentComplaintsTable.headers.${key}`)}
                    {sortable &&
                      (sortConfig?.key === key ? (
                        sortConfig.direction === "ascending" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort className="text-gray-300" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.isArray(complaints) && complaints.length > 0 ? (
              complaints.map((c, i) => (
                <tr
                  key={c._id || i}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-indigo-50 transition-all duration-200 text-center align-middle`}
                >
                  <td className="px-4 py-3">{c.parentName}</td>
                  <td className="px-4 py-3">{c.relationToStudent}</td>
                  <td className="px-4 py-3">{c.studentName}</td>
                  <td className="px-4 py-3">{c.class}</td>

                  {/* ✅ Date + Time Ago */}
                  <td className="px-4 py-3">
                    {c.date ? (
                      <>
                        <div>{new Date(c.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">
                          {timeAgo(c.date, t)}
                        </div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="px-4 py-3">{c.complaintType}</td>
                  <td className="px-4 py-3">{c.severity}</td>
                  <td className="px-4 py-3">{c.impact}</td>
                  <td className="px-4 py-3">{c.expectedAction}</td>
                  <td className="px-4 py-3">
                    {c.assignedTo?.name || t("parentComplaintsTable.messages.unassigned")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${statusClasses[c.status] || "text-gray-500"} font-medium`}>
                      {c.status}
                    </span>
                  </td>

                  {/* ✅ Action Buttons */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => setViewModal(c)}
                        className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                        title={t("parentComplaintsTable.actions.view")}
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setEditModal(c)}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                        title={t("parentComplaintsTable.actions.edit")}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteModal(c)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                        title={t("parentComplaintsTable.actions.delete")}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="px-4 py-6 text-center text-gray-400 text-sm">
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("parentComplaintsTable.messages.noComplaints")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ MOBILE VIEW */}
      <div className="md:hidden space-y-4 mt-4">
        {Array.isArray(complaints) && complaints.length > 0 ? (
          complaints.map((c, i) => (
            <div
              key={c._id || i}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-[#104c80]">{c.parentName}</h4>
                <span className={statusClasses[c.status] || "text-gray-500"}>{c.status}</span>
              </div>

              <p className="text-sm text-gray-600">
                <b>{t("parentComplaintsTable.messages.student")}:</b> {c.studentName} ({c.class})
              </p>
              <p className="text-sm text-gray-600">
                <b>{t("parentComplaintsTable.messages.type")}:</b> {c.complaintType} |{" "}
                <b>{t("parentComplaintsTable.messages.severity")}:</b> {c.severity}
              </p>
              <p className="text-sm text-gray-600">
                <b>{t("parentComplaintsTable.messages.date")}:</b>{" "}
                {c.date ? (
                  <>
                    {new Date(c.date).toLocaleDateString()}{" "}
                    <span className="text-gray-500 text-xs">({timeAgo(c.date, t)})</span>
                  </>
                ) : (
                  "-"
                )}
              </p>

              <div className="flex justify-end mt-3 gap-2">
                <button
                  onClick={() => setViewModal(c)}
                  className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                  title={t("parentComplaintsTable.actions.view")}
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => setEditModal(c)}
                  className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                  title={t("parentComplaintsTable.actions.edit")}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteModal(c)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                  title={t("parentComplaintsTable.actions.delete")}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400 text-sm">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            {t("parentComplaintsTable.messages.noComplaints")}
          </div>
        )}
      </div>
    </>
  );
};

export default ParentComplaintsTable;
