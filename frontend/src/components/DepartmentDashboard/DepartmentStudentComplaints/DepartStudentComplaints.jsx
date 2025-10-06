import React, { useState, useMemo } from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DepartComplaintTable from "./DepartComplaintTable";
import DepartComplaintStats from "./DepartComplaintStats";
import DepartStudentComplaintFilters from "./DepartStudentComplaintFilters";
import DepartDeleteModal from "./DepartDeleteModal";
import DepartComplaintModals from "./DepartComplaintModals";

const DepartStudentComplaints = () => {
  // ✅ Dummy User Role
  const USER_ROLE = "manager";

  // ✅ Complaints Data (inside component)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      name: "Ali Khan",
      type: "Bullying",
      impact: "Psychological",
      status: "Pending",
      detail: "Student reports being bullied by peers in class.",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      type: "Facilities",
      impact: "Social",
      status: "Resolved",
      detail: "Broken chair and poor lighting in classroom.",
    },
    {
      id: 3,
      name: "Bilal Hussain",
      type: "Staff",
      impact: "Academic",
      status: "In Progress",
      detail: "Teacher grading unfairly according to the student.",
    },
    {
      id: 4,
      name: "Hina Malik",
      type: "Learning",
      impact: "Academic",
      status: "Rejected",
      detail: "Complaint about curriculum difficulty.",
    },
  ]);

  // ✅ States
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterImpact, setFilterImpact] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // ✅ Simple Toast Function
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Update Complaint Status
  const saveStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    showToast(`Status updated to "${newStatus}" for complaint ID ${id}`);
    setEditModal(null);
  };

  // ✅ Delete Complaint
  const confirmDelete = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    showToast(`Complaint ID ${id} deleted successfully`, "success");
    setDeleteModal(null);
  };

  // ✅ Filter Logic
  const filteredComplaints = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return complaints
      .filter((c) => {
        const statusValue = c.status?.toLowerCase().replace(/\s+/g, "-");
        const impactValue = c.impact?.toLowerCase();
        const typeValue = c.type?.toLowerCase();

        const statusMatch = filterStatus === "all" || statusValue === filterStatus;
        const impactMatch = filterImpact === "all" || impactValue === filterImpact;
        const typeMatch = filterType === "all" || typeValue === filterType;

        const searchMatch =
          !q ||
          [c.name, c.detail, c.impact, c.type, c.status]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(q));

        return statusMatch && impactMatch && typeMatch && searchMatch;
      })
      .sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aKey = a[sortConfig.key];
        const bKey = b[sortConfig.key];
        if (aKey == null && bKey == null) return 0;
        if (aKey == null) return sortConfig.direction === "ascending" ? -1 : 1;
        if (bKey == null) return sortConfig.direction === "ascending" ? 1 : -1;
        if (sortConfig.key === "id") return sortConfig.direction === "ascending" ? aKey - bKey : bKey - aKey;
        if (aKey < bKey) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aKey > bKey) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
  }, [complaints, filterStatus, filterImpact, filterType, searchTerm, sortConfig]);

  // ✅ Pagination
  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredComplaints.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredComplaints, currentPage, itemsPerPage]);

  // ✅ Sorting Handler
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  // ✅ Reset Filters
  const resetFilters = () => {
    setFilterStatus("all");
    setFilterImpact("all");
    setFilterType("all");
    setSearchTerm("");
    setSortConfig({ key: null, direction: "ascending" });
    setCurrentPage(1);
  };

  // ✅ Role Restriction
  if (!["manager", "protection_committee"].includes(USER_ROLE)) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-medium bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-gray-100">
          <FaExclamationTriangle className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">You do not have permission to view complaints</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:ml-[270px] max-w-8xl bg-gray-50 py-4 px-4 sm:px-6 lg:px-10 flex flex-col gap-8 min-h-screen">
      {/* Header */}
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480]">
          Students Complaints Management
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage and resolve students’ complaints efficiently
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      {/* Stats */}
      <DepartComplaintStats complaints={complaints} />

      {/* Filters */}
      <DepartStudentComplaintFilters
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
        resetFilters={resetFilters}
        setCurrentPage={setCurrentPage}
      />

      {/* Table */}
      <DepartComplaintTable
        paginatedComplaints={paginatedComplaints}
        filteredComplaints={filteredComplaints}
        sortConfig={sortConfig}
        handleSort={handleSort}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
      />

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredComplaints.length)}
            </span>{" "}
            of <span className="font-medium">{filteredComplaints.length}</span> results
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
            >
              <FaArrowLeft className="text-xs" /> Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
            >
              Next <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <DepartComplaintModals
        viewModal={viewModal}
        setViewModal={setViewModal}
        editModal={editModal}
        setEditModal={setEditModal}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        saveStatus={saveStatus}
        confirmDelete={confirmDelete}
        showToast={showToast}
        complaints={complaints}
        setComplaints={setComplaints}
        toast={toast}
      />

      <DepartDeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default DepartStudentComplaints;
