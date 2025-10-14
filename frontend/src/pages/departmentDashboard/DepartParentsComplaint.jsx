import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllParentComplaintsQuery,
  useChangeParentComplaintStatusMutation,
} from "../../redux/slices/ParentComplaintApi";
import DepartParentComplaintTable from "../../components/DepartmentDashboard/DepartParentsComplaints/DepartParentComplaintTable";
import DepartParentComplaintModals from "../../components/DepartmentDashboard/DepartParentsComplaints/DepartParentComplaintsModals";
import { FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DepartmentParentComplaints = () => {
  const { t } = useTranslation("departParentsComplaint");

  // ✅ Fetch complaints
  const { data: complaintsData, isLoading, isError, refetch } =
    useGetAllParentComplaintsQuery();

  console.log("complaintsData from API:", complaintsData);

  const [changeParentComplaintStatus] = useChangeParentComplaintStatusMutation();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  // ✅ Use data directly (API returns array)
  const complaints = complaintsData || [];
  const statuses = t("modals.statuses", { returnObjects: true }); // ✅ from JSON array

  // --- Sort handler ---
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending")
      direction = "descending";
    setSortConfig({ key, direction });
  };

  const sortedComplaints = useMemo(() => {
    let sortable = [...complaints];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [complaints, sortConfig]);

  const statusClasses = t("statusColors", { returnObjects: true });

  // --- Stats ---
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter((c) => c.status === "Pending").length;
  const rejectedComplaints = complaints.filter((c) => c.status === "Rejected").length;
  const resolvedComplaints = complaints.filter((c) => c.status === "Resolved").length;

  // --- Update Status ---
  const handleStatusChange = async ({ id, status, feedback }) => {
    try {
      await changeParentComplaintStatus({ id, status, feedback }).unwrap();
      toast.success(t("notifications.updateSuccess"));
      setEditModal(null);
      refetch();
    } catch (error) {
      toast.error(t("notifications.updateError"));
    }
  };

  // --- Loading State ---
  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10">
        {t("loading.message")}
      </p>
    );

  // ✅ FIXED: check array length directly
  if (isError || complaints.length === 0) {
    return (
      <div className="lg:ml-[270px] flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-100 text-center max-w-lg w-full">
          <FaExclamationTriangle className="text-5xl text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {t("noData.title")}
          </h2>
          <p className="text-gray-500 mb-4">{t("noData.message")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:ml-[292px] bg-gray-50 min-h-screen" >
      {/* --- HEADER --- */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#104c80] mb-2">
          {t("header.title")}
        </h2>
        <p className="text-[#104c80]/80 text-sm md:text-base max-w-2xl leading-relaxed">
          {t("header.subtitle")}
        </p>
      </div>

      {/* --- STATS --- */}
      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {[
          {
            title: t("stats.total.label"),
            count: totalComplaints,
            color: "#104c80",
          },
          {
            title: t("stats.pending.label"),
            count: pendingComplaints,
            color: "#eab308",
          },
          {
            title: t("stats.rejected.label"),
            count: rejectedComplaints,
            color: "#dc2626",
          },
          {
            title: t("stats.resolved.label"),
            count: resolvedComplaints,
            color: "#16a34a",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-2xl p-5 text-center border-t-4"
            style={{ borderColor: item.color }}
          >
            <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
              {item.title}
            </h3>
            <p
              className="text-3xl font-extrabold mt-2"
              style={{ color: item.color }}
            >
              {item.count}
            </p>
          </div>
        ))}
      </div>

      {/* --- TABLE --- */}
      <DepartParentComplaintTable
        complaints={sortedComplaints}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        statusClasses={statusClasses}
      />

      {/* --- MODALS --- */}
      <DepartParentComplaintModals
        viewModal={viewModal}
        editModal={editModal}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        statuses={statuses}
        statusClasses={statusClasses}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default DepartmentParentComplaints;
