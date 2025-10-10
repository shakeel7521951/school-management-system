import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllParentComplaintsQuery,
  useChangeParentComplaintStatusMutation,
} from "../../redux/slices/ParentComplaintApi";
import DepartParentComplaintTable from "../../components/DepartmentDashboard/DepartParentsComplaints/DepartParentComplaintTable";
import DepartParentComplaintModals from "../../components/DepartmentDashboard/DepartParentsComplaints/DepartParentComplaintsModals";

const DepartmentParentComplaints = () => {
  // ✅ Fetch complaints
  const { data: complaintsData, isLoading, isError, refetch } =
    useGetAllParentComplaintsQuery();

  const [changeParentComplaintStatus] = useChangeParentComplaintStatusMutation();
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const complaints = complaintsData || [];
  const statuses = ["Pending", "Resolved", "Rejected"];

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

  const statusClasses = {
    Pending:
      "bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
    Rejected:
      "bg-red-100 text-red-700 border border-red-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
    Resolved:
      "bg-green-100 text-green-700 border border-green-300 px-3 py-1 rounded-full text-xs font-semibold shadow-sm",
  };

  // --- Stats ---
  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter((c) => c.status === "Pending").length;
  const rejectedComplaints = complaints.filter((c) => c.status === "Rejected").length;
  const resolvedComplaints = complaints.filter((c) => c.status === "Resolved").length;

  // --- Update Status ---
  const handleStatusChange = async ({ id, status, feedback }) => {
    try {
      await changeParentComplaintStatus({ id, status, feedback }).unwrap();
      toast.success("Complaint updated successfully!");
      setEditModal(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update complaint!");
    }
  };

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading complaints...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Failed to fetch complaints!</p>;

  return (
    <div className="p-6 lg:ml-[292px] bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#104c80] mb-2">
          Parents Complaint Management
        </h2>
        <p className="text-[#104c80]/80 text-sm md:text-base max-w-2xl leading-relaxed">
        Manage.review and resolve parents complaints.
        
        </p>
      </div>

      {/* --- STATS --- */}
      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {[
          { title: "Total Complaints", count: totalComplaints, color: "#104c80" },
          { title: "Pending", count: pendingComplaints, color: "#eab308" },
          { title: "Rejected", count: rejectedComplaints, color: "#dc2626" },
          { title: "Resolved", count: resolvedComplaints, color: "#16a34a" },
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
        sortConfig={sortConfig}
        handleSort={handleSort}
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
