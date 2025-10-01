import React, { useState, useMemo } from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TeacherComplaintFilters from "./TeacherComplaintFilters";
import TeacherComplaintModal from "./TeacherComplaintModal";
import TeacherComplaintStats from "./TeacherComplaintStats";
import TeacherComplaintTable from "./TeacherComplaintTable";
import TeacherDeleteModal from "./TeacherDeleteModal";
import TeacherComplaintViewModal from "./TeacherComplaintViewModal";
import {
  useGetComplaintsQuery,
  useCreateComplaintMutation,
  useUpdateComplaintMutation,
  useUpdateComplaintStatusMutation,
  useDeleteComplaintMutation,
} from "../../../redux/slices/TeacherComplaints";

const USER_ROLE = "manager";

const TeacherComplain = () => {
  // 🔹 State
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterImpact, setFilterImpact] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // 🔹 API Hooks
  const { data, isLoading, isError } = useGetComplaintsQuery();
  const complaints = data?.data || [];

  const [createComplaint] = useCreateComplaintMutation();
  const [updateComplaint] = useUpdateComplaintMutation();
  const [updateComplaintStatus] = useUpdateComplaintStatusMutation();
  const [deleteComplaint] = useDeleteComplaintMutation();

  // ✅ Filtering + Searching
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesStatus = filterStatus === "all" || c.status === filterStatus;
      const matchesImpact = filterImpact === "all" || c.impact === filterImpact;
      const matchesType = filterType === "all" || c.type === filterType;
      const matchesSearch =
        c.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.details.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesImpact && matchesType && matchesSearch;
    });
  }, [complaints, filterStatus, filterImpact, filterType, searchTerm]);

  // ✅ Pagination
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredComplaints.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));

  // ✅ Sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // ✅ Save Status Change
  const saveStatus = async (id, newStatus) => {
    try {
      await updateComplaintStatus({ id, status: newStatus }).unwrap();
      setToast({ show: true, message: "Status updated successfully", type: "success" });
      setViewModal(null);
    } catch {
      setToast({ show: true, message: "Failed to update status", type: "error" });
    }
  };

  // ✅ Confirm Delete
  const confirmDelete = async (id) => {
    try {
      await deleteComplaint(id).unwrap();
      setToast({ show: true, message: "Complaint deleted", type: "success" });
      setDeleteModal(null);
    } catch {
      setToast({ show: true, message: "Failed to delete complaint", type: "error" });
    }
  };

  // ✅ Access Control
  if (!["manager", "protection_committee"].includes(USER_ROLE)) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-medium bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-gray-100">
          <FaExclamationTriangle className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to view complaints.</p>
        </div>
      </div>
    );
  }

  // ✅ Loading & Error
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading complaints...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Failed to load complaints</p>
      </div>
    );
  }

  return (
    <div className="lg:ml-[270px] max-w-8xl bg-gray-50 py-4 px-4 sm:px-6 lg:px-10 flex flex-col gap-8 min-h-screen">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480]">
          Teacher Complaint Management
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage and resolve teachers complaints efficiently
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      <TeacherComplaintStats complaints={complaints} />

      <TeacherComplaintFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterImpact={filterImpact}
        setFilterImpact={setFilterImpact}
        filterType={filterType}
        setFilterType={setFilterType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        filteredComplaints={filteredComplaints}
        resetFilters={() => {
          setFilterStatus("all");
          setFilterImpact("all");
          setFilterType("all");
          setSearchTerm("");
        }}
        setCurrentPage={setCurrentPage}
      />

      <TeacherComplaintTable
        paginatedComplaints={paginatedComplaints}
        filteredComplaints={filteredComplaints}
        sortConfig={sortConfig}
        handleSort={handleSort}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
      />

      {complaints.length > 0 && pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredComplaints.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of {filteredComplaints.length} results
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              <FaArrowLeft className="text-xs" /> Prev
            </button>
            <button
              disabled={currentPage === pageCount}
              onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              Next <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      <TeacherComplaintViewModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        onEdit={(complaint) => {
          setEditModal(complaint);
          setViewModal(null);
        }}
      />

      {/* Edit Modal */}
      <TeacherComplaintModal
        editModal={editModal}
        setEditModal={setEditModal}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        saveStatus={saveStatus}
        confirmDelete={confirmDelete}
        showToast={(msg, type) => setToast({ show: true, message: msg, type })}
        toast={toast}
      />

      {/* Delete Modal */}
      <TeacherDeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default TeacherComplain;
