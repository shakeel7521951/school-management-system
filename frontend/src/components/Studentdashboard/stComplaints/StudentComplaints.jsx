import { useState } from "react";
import { AlertCircle, Bell, FileText, Plus } from "lucide-react";
import StudentComplaintModal from "./StudentComplaintModal";
import {
  useGetAllStComplaintsQuery,
} from "../../../redux/slices/StComplaintApi";
import { useTranslation } from "react-i18next";

const StudentComplaints = () => {
  const { t } = useTranslation("studentComplaints");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // RTK Query hooks
  const { data: complaints = [], isLoading, isError } = useGetAllStComplaintsQuery();

  const handleAddComplaint = async (newComplaint) => {
    try {
      await createComplaint(newComplaint).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit complaint:", error);
    }
  };

  return (
    <div className="p-8 sm:p-6 bg-[#F0F6FD] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-extrabold text-[#14528B] flex items-center gap-3">
          {t("studentComplaints.title")}
        </h1>
        <p className="text-gray-600 mt-2">{t("studentComplaints.description")}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 mt-5">
        {/* Total Complaints */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">
              {t("studentComplaints.stats.complaints.title")}
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">{complaints.length}</p>
          <p className="text-gray-500 text-sm sm:text-base">
            {t("studentComplaints.stats.complaints.countDescription")}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">
              {t("studentComplaints.stats.pending.title")}
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">
            {complaints?.reduce(
              (sum, item) =>
                item.status?.toLowerCase() === "pending" ? sum + 1 : sum,
              0
            )}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            {t("studentComplaints.stats.pending.countDescription")}
          </p>
        </div>

        {/* Rejected */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">
              {t("studentComplaints.stats.rejected.title")}
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">
            {complaints?.reduce(
              (sum, item) =>
                item.status?.toLowerCase() === "rejected" ? sum + 1 : sum,
              0
            )}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            {t("studentComplaints.stats.rejected.countDescription")}
          </p>
        </div>
      </div>

      {/* Complaint Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-b from-[#F97316] to-[#EA580C] text-white px-5 py-3 rounded-xl shadow-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> {t("studentComplaints.button.submitComplaint")}
        </button>
      </div>

      {/* Complaints Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
        <h2 className="text-lg sm:text-xl lg:text-2xl text-[#14528C] font-bold mb-4 flex items-center gap-2">
          <FileText size={20} /> {t("studentComplaints.table.title")}
        </h2>

        {isLoading ? (
          <p className="text-gray-500">{t("studentComplaints.table.loading")}</p>
        ) : isError ? (
          <p className="text-red-500">{t("studentComplaints.table.error")}</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">{t("studentComplaints.table.empty")}</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                {[
                  t("studentComplaints.table.headers.name"),
                  t("studentComplaints.table.headers.class"),
                  t("studentComplaints.table.headers.age"),
                  t("studentComplaints.table.headers.date"),
                  t("studentComplaints.table.headers.type"),
                  t("studentComplaints.table.headers.severity"),
                  t("studentComplaints.table.headers.impact"),
                  t("studentComplaints.table.headers.details"),
                  t("studentComplaints.table.headers.expectedAction"),
                  t("studentComplaints.table.headers.status"),
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr key={comp._id} className="hover:bg-gray-50 text-center">
                  <td className="border border-gray-300 p-2">{comp.name}</td>
                  <td className="border border-gray-300 p-2">{comp.studentClass}</td>
                  <td className="border border-gray-300 p-2">{comp.age}</td>
                  <td className="border border-gray-300 p-2">
                    {comp.date ? new Date(comp.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{comp.type}</td>
                  <td className="border border-gray-300 p-2">{comp.severity}</td>
                  <td className="border border-gray-300 p-2">{comp.impact}</td>
                  <td className="border border-gray-300 p-2">{comp.details}</td>
                  <td className="border border-gray-300 p-2">{comp.action}</td>
                  <td className="border border-gray-300 p-2">{comp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Complaint Modal */}
      <StudentComplaintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComplaint}
      />
    </div>
  );
};

export default StudentComplaints;
