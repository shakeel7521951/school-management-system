import React, { useState, useMemo } from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TeacherComplaintFilters from "./TeacherComplaintFilters";
import TeacherComplaintModal from "./TeacherComplaintModal";
import TeacherComplaintStats from "./TeacherComplaintStats";
import TeacherComplaintTable from "./TeacherComplaintTable";
import TeacherDeleteModal from "./TeacherDeleteModal";

const USER_ROLE = "manager";

const TeacherComplain = () => {
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

  // 🔹 Placeholder API states
  const complaints = []; // no data until API is connected
  const isLoading = false;
  const isError = false;

  // ✅ Filtering + Sorting
  const filteredComplaints = useMemo(() => {
    return complaints;
  }, [complaints]);

  const paginatedComplaints = useMemo(() => {
    return filteredComplaints.slice(0, itemsPerPage);
  }, [filteredComplaints, itemsPerPage]);

  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));

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

      {/* ✅ Stats */}
      <TeacherComplaintStats complaints={complaints} />

      {/* ✅ Filters */}
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
        resetFilters={() => {}}
        setCurrentPage={setCurrentPage}
      />

      {/* ✅ Table */}
      <TeacherComplaintTable
        paginatedComplaints={paginatedComplaints}
        filteredComplaints={filteredComplaints}
        sortConfig={sortConfig}
        handleSort={() => {}}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
      />

     

      {/* ✅ Pagination (hidden if no data) */}
      {complaints.length > 0 && pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            Showing 1 to {Math.min(itemsPerPage, filteredComplaints.length)} of {filteredComplaints.length} results
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              <FaArrowLeft className="text-xs" /> Prev
            </button>
            <button
              disabled
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50"
            >
              Next <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* ✅ Modals (just structure, no API yet) */}
      <TeacherComplaintModal
        viewModal={viewModal}
        setViewModal={setViewModal}
        editModal={editModal}
        setEditModal={setEditModal}
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        saveStatus={() => {}}
        confirmDelete={() => {}}
        showToast={() => {}}
        toast={toast}
      />

      <TeacherDeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        confirmDelete={() => {}}
      />
    </div>
  );
};

export default TeacherComplain;
