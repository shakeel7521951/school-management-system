import {
  FaUser,
  FaEye,
  FaEdit,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

// 🔹 Helper function: shows "x days/hours/minutes ago"
const timeAgo = (date) => {
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
      return `${interval} ${interval === 1 ? intervals[i].label : intervals[i].label + "s"} ago`;
    }
  }

  return "Just now";
};

// Colors
const typeColors = {
  Bullying: "bg-indigo-100 text-indigo-700",
  "Physical Safety": "bg-red-100 text-red-700",
  Staff: "bg-orange-100 text-orange-700",
  Learning: "bg-green-100 text-green-700",
  Facilities: "bg-purple-100 text-purple-700",
  Bus: "bg-cyan-100 text-cyan-700",
  Emotions: "bg-pink-100 text-pink-700",
  Rights: "bg-blue-100 text-blue-700",
};

const severityColors = {
  "simple-note": "bg-gray-100 text-gray-700",
  urgent: "bg-red-100 text-red-700",
  "follow-up": "bg-amber-100 text-amber-700",
  serious: "bg-purple-100 text-purple-700",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  "in progress": "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ComplaintTable = ({
  paginatedComplaints,
  filteredComplaints,
  sortConfig,
  handleSort,
  setViewModal,
  setEditModal,
  setDeleteModal,
}) => {
  const { t } = useTranslation("adminStudentComplaints");

  const columns = [
    { key: "name", label: t("table.columns.name"), width: "w-40" },
    { key: "studentClass", label: t("table.columns.class"), width: "w-20" },
    { key: "age", label: t("table.columns.age"), width: "w-20" },
    { key: "date", label: t("table.columns.date"), width: "w-32" },
    { key: "type", label: t("table.columns.type"), width: "w-32" },
    { key: "severity", label: t("table.columns.severity"), width: "w-28" },
    { key: "impact", label: t("table.columns.impact"), width: "w-28" },
    { key: "action", label: t("table.columns.action"), width: "w-32" },
    { key: "status", label: t("table.columns.status"), width: "w-28" },
    { key: "actions", label: t("table.columns.actions"), width: "w-28" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-[#10448c] text-white text-sm text-nowrap">
              {columns.map(({ key, label, width }) => (
                <th
                  key={key}
                  onClick={() =>
                    key !== "actions" && handleSort && handleSort(key)
                  }
                  className={`${width} px-1 py-4 text-center font-semibold uppercase tracking-wide cursor-pointer`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {label}
                    {!(key === "actions") &&
                      sortConfig &&
                      sortConfig.key === key && (
                        <>
                          {sortConfig.direction === "ascending" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )}
                        </>
                      )}
                    {!sortConfig || sortConfig.key !== key ? (
                      <FaSort className="text-gray-300" />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedComplaints.map((c, i) => (
              <tr
                key={c._id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition text-sm`}
              >
                <td className="px-3 py-2 flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FaUser className="text-indigo-600 text-sm" />
                  </div>
                  <span className="font-medium text-nowrap">{c.name}</span>
                </td>
                <td className="px-3 py-2 text-center text-nowrap">
                  {c.studentClass}
                </td>
                <td className="px-3 py-2 text-center text-nowrap">{c.age}</td>
                {/* Date + Time Ago */}
                <td className="px-3 py-2 text-center text-nowrap">
                  {c.date ? (
                    <>
                      <div>{new Date(c.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">
                        {timeAgo(c.date)}
                      </div>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-md rounded-full text-nowrap ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-1 py-1 text-md rounded-full text-nowrap ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </td>
                <td className="px-3 py-2 text-center text-nowrap">
                  {c.impact}
                </td>
                <td className="px-3 py-2 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full text-nowrap ${
                      c.action === "resolve"
                        ? "bg-green-100 text-green-700"
                        : c.action === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.action}
                  </span>
                </td>
                <td className="px-2 py-2 text-center">
                  <span
                    className={`px-1 py-1 text-xs font-semibold rounded-full text-nowrap ${
                      statusColors[c.status?.toLowerCase()]
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setViewModal({ ...c })}
                      className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditModal({ ...c })}
                      className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setDeleteModal(c)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("table.no_data")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="block md:hidden p-4 space-y-4">
        {paginatedComplaints.length > 0 ? (
          paginatedComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-2"
            >
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <FaUser className="text-indigo-600 text-sm" />
                </div>
                <h3 className="font-semibold text-gray-900">{c.name}</h3>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2">
                <p>
                  <b>{t("table.columns.class")}:</b> {c.studentClass}
                </p>
                <p>
                  <b>{t("table.columns.age")}:</b> {c.age}
                </p>
                <p>
                  <b>{t("table.columns.date")}:</b>{" "}
                  {c.date ? (
                    <>
                      {new Date(c.date).toLocaleDateString()}{" "}
                      <span className="text-gray-500 text-xs">
                        ({timeAgo(c.date)})
                      </span>
                    </>
                  ) : (
                    "-"
                  )}
                </p>
                <p>
                  <b>{t("table.columns.impact")}:</b> {c.impact}
                </p>
                <p className="col-span-2">
                  <b>{t("table.columns.type")}:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      typeColors[c.type] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.type}
                  </span>
                </p>
                <p className="col-span-2">
                  <b>{t("table.columns.severity")}:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      severityColors[c.severity?.toLowerCase()] ||
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {c.severity}
                  </span>
                </p>
                <p className="col-span-2">
                  <b>{t("table.columns.action")}:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      c.action === "resolve"
                        ? "bg-green-100 text-green-700"
                        : c.action === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.action}
                  </span>
                </p>
                <p className="col-span-2">
                  <b>{t("table.columns.status")}:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusColors[c.status?.toLowerCase()]
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-3 border-t mt-2">
                <button
                  onClick={() => setViewModal({ ...c })}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => setEditModal({ ...c })}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => setDeleteModal(c)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            {t("table.no_data")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintTable;
