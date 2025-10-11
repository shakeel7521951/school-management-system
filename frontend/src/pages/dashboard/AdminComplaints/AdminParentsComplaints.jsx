import React, { useState, useMemo } from "react";
import ParentComplaintsModals from "../../../components/dashboard/adminParentComplaints/ParentComplaintsModals";
import ParentComplaintsTable from "../../../components/dashboard/adminParentComplaints/ParentComplaintsTable";
import {
  useGetAllParentComplaintsQuery,
  useDeleteParentComplaintMutation,
  useChangeParentComplaintStatusMutation,
} from "../../../redux/slices/ParentComplaintApi";
import { useGetDepartmentsQuery } from "../../../redux/slices/DepartmentApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const AdminParentComplaints = () => {
  const { t } = useTranslation("adminParentComplaints");

  // --- API Hooks ---
  const { data: complaintsData, isLoading, isError, refetch } =
    useGetAllParentComplaintsQuery();
  const [deleteParentComplaint] = useDeleteParentComplaintMutation();
  const [changeParentComplaintStatus] = useChangeParentComplaintStatusMutation();
  const { data: departmentsData, isLoading: deptLoading } = useGetDepartmentsQuery();

  // --- State ---
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [viewModal, setViewModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const complaints = complaintsData || [];
  const departments = departmentsData?.departments || [];
  const statuses = [
    t("adminParentComplaints.status.pending"),
    t("adminParentComplaints.status.resolved"),
    t("adminParentComplaints.status.rejected"),
  ];

  // --- Sort Functionality ---
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

  // --- Status Classes ---
  const statusClasses = {
    [t("status.pending")]:
      "bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
    [t("status.rejected")]:
      "bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
    [t("status.resolved")]:
      "bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
  };

  // --- Stats ---
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(
    (c) => c.status === "Pending"
  ).length;
  const rejectedComplaints = complaints.filter(
    (c) => c.status === "Rejected"
  ).length;
  const resolvedComplaints = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // --- Delete Complaint ---
  const handleDelete = async (complaint) => {
    try {
      await deleteParentComplaint(complaint._id).unwrap();
      toast.success(t("adminParentComplaints.toast.deleteSuccess"));
      setDeleteModal(null);
      refetch();
    } catch (error) {
      toast.error(t("adminParentComplaints.toast.deleteError"));
    }
  };

  // --- Update Complaint Status & Assigned Department ---
  const handleStatusChange = async ({ id, status, assignedTo }) => {
    try {
      await changeParentComplaintStatus({ id, status, assignedTo }).unwrap();
      toast.success(t("adminParentComplaints.toast.updateSuccess"));
      refetch();
    } catch (error) {
      toast.error(t("adminParentComplaints.toast.updateError"));
    }
  };

  if (isLoading || deptLoading)
    return (
      <p className="text-center text-gray-500 mt-10">{t("adminParentComplaints.loading")}</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        {t("adminParentComplaints.toast.fetchError")}
      </p>
    );

  return (
    <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#104c80] mb-1">
          {t("adminParentComplaints.title")}
        </h2>
        <p className="text-gray-500 text-sm">{t("adminParentComplaints.subtitle")}</p>
      </div>

      {/* --- STATS --- */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {[
          {
            title: t("adminParentComplaints.stats.total.title"),
            count: totalComplaints,
            color: "text-[#104c80]",
            note: t("adminParentComplaints.stats.total.note"),
          },
          {
            title: t("adminParentComplaints.stats.pending.title"),
            count: pendingComplaints,
            color: "text-yellow-600",
            note: t("adminParentComplaints.stats.pending.note"),
          },
          {
            title: t("adminParentComplaints.stats.rejected.title"),
            count: rejectedComplaints,
            color: "text-red-600",
            note: t("adminParentComplaints.stats.rejected.note"),
          },
          {
            title: t("adminParentComplaints.stats.resolved.title"),
            count: resolvedComplaints,
            color: "text-green-600",
            note: t("adminParentComplaints.stats.resolved.note"),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-xl transition"
          >
            <h3 className="text-gray-700 font-semibold text-sm uppercase">
              {item.title}
            </h3>
            <p className={`text-3xl font-bold ${item.color}`}>{item.count}</p>
            <span className="text-gray-500 text-xs">{item.note}</span>
          </div>
        ))}
      </div>

      {/* --- TABLE --- */}
      <ParentComplaintsTable
        complaints={sortedComplaints}
        sortConfig={sortConfig}
        handleSort={handleSort}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
        statusClasses={statusClasses}
      />

      {/* --- MODALS --- */}
      <ParentComplaintsModals
        viewModal={viewModal}
        editModal={editModal}
        deleteModal={deleteModal}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
        departments={departments}
        statuses={statuses}
        statusClasses={statusClasses}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminParentComplaints;
