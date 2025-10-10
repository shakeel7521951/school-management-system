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

const AdminParentComplaints = () => {
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
  const statuses = ["Pending", "Resolved", "Rejected"];

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
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [complaints, sortConfig]);

  // --- Status Classes ---
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

  // --- Delete Complaint ---
  const handleDelete = async (complaint) => {
    try {
      await deleteParentComplaint(complaint._id).unwrap();
      toast.success("Complaint deleted successfully!");
      setDeleteModal(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete complaint!");
    }
  };

  // --- Update Complaint Status & Assigned Department ---
  const handleStatusChange = async ({ id, status, assignedTo }) => {
    try {
      console.log(assignedTo)
      await changeParentComplaintStatus({ id, status, assignedTo }).unwrap();
      toast.success("Complaint updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to update complaint!");
    }
  };

  if (isLoading || deptLoading)
    return <p className="text-center text-gray-500 mt-10">Loading data...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Failed to fetch complaints!</p>;

  return (
    <div className="p-6 lg:ml-64 bg-gray-50 min-h-screen">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#104c80] mb-1">
          Parent Complaints Management
        </h2>
        <p className="text-gray-500 text-sm">
          Manage and track all complaints submitted by parents regarding students.
        </p>
      </div>

      {/* --- STATS --- */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {[
          { title: "Total Complaints", count: totalComplaints, color: "text-[#104c80]", note: "All complaints submitted" },
          { title: "Pending", count: pendingComplaints, color: "text-yellow-600", note: "Awaiting action" },
          { title: "Rejected", count: rejectedComplaints, color: "text-red-600", note: "Declined complaints" },
          { title: "Resolved", count: resolvedComplaints, color: "text-green-600", note: "Successfully handled" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-xl p-5 text-center hover:shadow-xl transition"
          >
            <h3 className="text-gray-700 font-semibold text-sm uppercase">{item.title}</h3>
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
