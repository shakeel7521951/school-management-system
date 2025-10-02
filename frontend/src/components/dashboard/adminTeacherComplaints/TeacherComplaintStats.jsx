import React from "react";
import { useTranslation } from "react-i18next";

const TeacherComplaintStats = ({ complaints }) => {
  const { t } = useTranslation("teacherComplaintStats");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-red-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">
          {t("pending.title")}
        </h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter(
            (c) => c.status === "Pending" || c.status === "pending"
          ).length}
        </p>
      </div>

      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">
          {t("in_progress.title")}
        </h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter((c) => c.status === "in progress").length}
        </p>
      </div>

      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">
          {t("resolved.title")}
        </h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter(
            (c) => c.status === "Resolved" || c.status === "resolved"
          ).length}
        </p>
      </div>

      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">
          {t("total.title")}
        </h3>
        <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
      </div>
    </div>
  );
};

export default TeacherComplaintStats;
