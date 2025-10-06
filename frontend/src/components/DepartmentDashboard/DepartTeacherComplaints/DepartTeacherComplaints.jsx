import React, { useState, useMemo, useEffect } from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DepartTeacherComplaintStats from "./DepartTeacherComplaintStats";
import DepartTeacherComplaintFilters from "./DepartTeacherComplaintFilters";
import DepartTeacherComplaintTable from "./DepartTeacherComplaintTable";
import DepartTeacherComplaintViewModal from "./DepartTeacherComplaintViewModal";
import DepartTeacherComplaintModal from "./DepartTeacherComplaintModal";
import DepartTeacherDeleteModal from "./DepartTeacherDeleteModal";

const USER_ROLE = "manager";

const DepartTeacherComplaints = () => {
  // ✅ Dummy data (replace with API later)
  const complaints = [
    {
      _id: 1,
      employeeName: "John Doe",
      jobTitle: "Math Teacher",
      department: "Mathematics",
      type: "work Environment",
      impact: "-",
      action: "Pending",
      status: "Pending",
      details: "-",
      date: "2025-09-25",
      severity:"-",
      
    },
    {
      _id: 2,
      employeeName: "Jane Smith",
      jobTitle: "Science Teacher",
      department: "Science",
      type: "-",
      impact: "-",
      severity: "-",
      action: "In Progress",
      status: "In Progress",
      details: "-.",
      date: "2025-09-20",
    },
   
  ];

  // ✅ Filters & UI states
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

  // ✅ Reset page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus, filterImpact, filterType, searchTerm]);

  // ✅ Filtered complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesStatus =
        filterStatus === "all" || c.status?.toLowerCase() === filterStatus.toLowerCase();
      const matchesImpact =
        filterImpact === "all" || c.impact?.toLowerCase() === filterImpact.toLowerCase();
      const matchesType =
        filterType === "all" || c.type?.toLowerCase() === filterType.toLowerCase();
      const matchesSearch =
        c.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.details.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesImpact && matchesType && matchesSearch;
    });
  }, [complaints, filterStatus, filterImpact, filterType, searchTerm]);

  // ✅ Sorting
  const sortedComplaints = useMemo(() => {
    if (!sortConfig.key) return filteredComplaints;
    return [...filteredComplaints].sort((a, b) => {
      const aValue = a[sortConfig.key] || "";
      const bValue = b[sortConfig.key] || "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (aValue.toLowerCase() < bValue.toLowerCase())
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue.toLowerCase() > bValue.toLowerCase())
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      } else {
        return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue;
      }
    });
  }, [filteredComplaints, sortConfig]);

  // ✅ Pagination
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedComplaints.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedComplaints, currentPage, itemsPerPage]);

  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));

  // ✅ Sorting handler
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // ✅ Dummy status update
  const saveStatus = (id, newStatus) => {
    console.log("Status updated for complaint", id, "to", newStatus);
    setToast({ show: true, message: "Status updated successfully.", type: "success" });
    setViewModal(null);
  };

  // ✅ Dummy delete handler
  const confirmDelete = (id) => {
    console.log("Complaint deleted:", id);
    setToast({ show: true, message: "Complaint deleted successfully.", type: "success" });
    setDeleteModal(null);
  };

  // ✅ Role access control
  if (!["manager", "protection_committee"].includes(USER_ROLE)) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-medium bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-gray-100">
          <FaExclamationTriangle className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-[270px] max-w-8xl bg-gray-50 py-4 px-4 sm:px-6 lg:px-10 flex flex-col gap-8 min-h-screen">
      {/* Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480]">
          Teacher Complaints
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage, review and resolve teacher complaints.
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      <DepartTeacherComplaintStats complaints={complaints} />

      <DepartTeacherComplaintFilters
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

      <DepartTeacherComplaintTable
        paginatedComplaints={paginatedComplaints}
        filteredComplaints={filteredComplaints}
        sortConfig={sortConfig}
        handleSort={handleSort}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
      />

      {/* Pagination */}
      {filteredComplaints.length > 0 && pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            Showing{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, filteredComplaints.length)} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of{" "}
            {filteredComplaints.length} complaints
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              <FaArrowLeft className="text-xs" /> Previous
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
      <DepartTeacherComplaintViewModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        onEdit={(complaint) => {
          setEditModal(complaint);
          setViewModal(null);
        }}
      />

      {/* Edit Modal */}
      <DepartTeacherComplaintModal
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
      <DepartTeacherDeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default DepartTeacherComplaints;
