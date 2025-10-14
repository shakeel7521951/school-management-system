import { useState } from "react";
import { Plus, X } from "lucide-react";
import VisitorForm from "../../components/securityDashboard/VisitorForm";
import { useGetVisitorsQuery } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";
import VisitorFormModal from "../../components/common/VisitorFormModal";

const VisitorPage = () => {
  const [filter, setFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { t } = useTranslation("visitorManagement");
  const { data: visitors = [], isLoading, isError } = useGetVisitorsQuery();

  const filteredVisitors =
    filter === "All" ? visitors : visitors.filter((v) => v.status === filter);

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-[#f5f9ff] to-[#e8f0fa] p-4 sm:p-6 lg:p-8">
      {/* ✅ Page Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#104c80] text-center sm:text-left">
          {t("title")}
        </h1>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#104c80] text-white font-medium shadow-md hover:shadow-lg transition w-full sm:w-auto"
        >
          <Plus size={18} /> {t("buttons.add")}
        </button>
      </div>

      {/* ✅ Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {["all", "approved", "rejected", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === "all" ? "All" : status)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
              filter.toLowerCase() === status
                ? "bg-[#104c80] text-white border-[#104c80]"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
          >
            {t(`filters.${status}`)}
          </button>
        ))}
      </div>

      {/* ✅ Table / Card Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-center text-slate-500">
            {t("messages.loading")}
          </p>
        ) : isError ? (
          <p className="p-6 text-center text-red-500">{t("messages.error")}</p>
        ) : filteredVisitors.length === 0 ? (
          <p className="p-6 text-center text-slate-500">
            {t("messages.empty")}
          </p>
        ) : (
          <>
            {/* ✅ Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left table-auto">
                <thead className="bg-slate-100 text-[#104c80] uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-2 py-2">{t("table.index")}</th>
                    <th className="px-3 py-2">{t("table.name")}</th>
                    <th className="px-2 py-2">{t("table.type")}</th>
                    <th className="px-2 py-2">{t("table.id")}</th>
                    <th className="px-3 py-2">{t("table.phone")}</th>
                    <th className="px-2 py-2">{t("table.reason")}</th>
                    <th className="px-3 py-2">{t("table.host")}</th>
                    <th className="px-3 py-2">{t("table.signature")}</th>
                    <th className="px-3 py-2">{t("table.submitted")}</th>
                    <th className="px-3 py-2 text-center">{t("table.status")}</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredVisitors.map((v, index) => (
                    <tr
                      key={v._id}
                      className="border-t hover:bg-slate-50 transition"
                    >
                      <td className="px-2 py-2 text-center">{index + 1}</td>
                      <td className="px-2 py-2 font-medium">{v.name || "-"}</td>
                      <td className="px-2 py-2">{v.visitorType || "—"}</td>
                      <td className="px-2 py-2">
                        {v.governmentId || v.passport || "-"}
                      </td>
                      <td className="px-2 py-2">{v.phone || "-"}</td>
                      <td className="px-2 py-2">
                        {v.reason || v.purpose || "-"}
                      </td>
                      <td className="px-2 py-2">
                        {v.hostDepartment ||
                          v.hostEmail ||
                          v.personToVisit ||
                          "-"}
                      </td>
                      <td className="px-2 py-2">{v.signature || "—"}</td>
                      <td className="px-2 py-2">
                        {v.createdAt
                          ? new Date(v.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            v.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : v.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {v.status
                            ? v.status.charAt(0).toUpperCase() +
                              v.status.slice(1)
                            : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Card Layout */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
              {filteredVisitors.map((v) => (
                <div
                  key={v._id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-[#104c80]">
                      {v.name || "Unknown"}
                    </h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        v.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : v.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {v.status
                        ? v.status.charAt(0).toUpperCase() + v.status.slice(1)
                        : "Pending"}
                    </span>
                  </div>

                  <div className="text-sm text-slate-600 space-y-1">
                    <p>
                      <span className="font-medium">{t("table.type")}:</span>{" "}
                      {v.visitorType || "—"}
                    </p>
                    <p>
                      <span className="font-medium">{t("table.id")}:</span>{" "}
                      {v.governmentId || v.passport || "-"}
                    </p>
                    <p>
                      <span className="font-medium">{t("table.phone")}:</span>{" "}
                      {v.phone || "-"}
                    </p>
                    <p>
                      <span className="font-medium">{t("table.reason")}:</span>{" "}
                      {v.reason || v.purpose || "-"}
                    </p>
                    <p>
                      <span className="font-medium">{t("table.host")}:</span>{" "}
                      {v.hostEmail || v.personToVisit || "-"}
                    </p>
                    <p>
                      <span className="font-medium">
                        {t("table.signature")}:
                      </span>{" "}
                      {v.signature || "—"}
                    </p>
                    <p>
                      <span className="font-medium">
                        {t("table.submitted")}:
                      </span>{" "}
                      {v.createdAt
                        ? new Date(v.createdAt).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ Form Modal */}
      {isFormOpen && (
       
            <VisitorFormModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />
          
      )}
    </div>
  );
};

export default VisitorPage;
