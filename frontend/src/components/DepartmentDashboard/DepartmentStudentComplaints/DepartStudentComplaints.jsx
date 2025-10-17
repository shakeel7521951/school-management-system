import React, { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DepartComplaintTable from "./DepartComplaintTable";
import DepartComplaintStats from "./DepartComplaintStats";
import DepartStudentComplaintFilters from "./DepartStudentComplaintFilters";
import DepartDeleteModal from "./DepartDeleteModal";
import DepartComplaintModals from "./DepartComplaintModals";
import { useGetDepartmentComplaintsQuery } from "../../../redux/slices/DepartmentApi";
import { useChangeStComplaintStatusMutation, useDeleteStComplaintMutation } from "../../../redux/slices/StComplaintApi";

const DepartStudentComplaints = () => {
  const { t } = useTranslation("departStudentComplaints");
  const USER_ROLE = "manager";

  // ✅ RTK Query Hooks
  const { data, error, isLoading } = useGetDepartmentComplaintsQuery();
  const [changeStComplaintStatus] = useChangeStComplaintStatusMutation();
  const [deleteStComplaint] = useDeleteStComplaintMutation();
  console.log(data);
  

  // ✅ Local state
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    if (data?.complaints) setComplaints(data.complaints);
  }, [data]);

  // ✅ Filters & UI state
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

  // ✅ Toast Handler
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Update Status
  const saveStatus = async (id, newStatus) => {
    try {
      await changeStComplaintStatus({ id, status: newStatus }).unwrap();
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
      showToast(t("toast.statusUpdated", { status: newStatus }));
      setEditModal(null);
    } catch (err) {
      showToast(t("toast.updateFailed"), "error");
    }
  };

  // ✅ Delete Complaint
  const confirmDelete = async (id) => {
    try {
      await deleteStComplaint(id).unwrap();
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      showToast(t("toast.deleteSuccess"), "success");
      setDeleteModal(null);
    } catch (err) {
      showToast(t("toast.deleteFailed"), "error");
    }
  };

  // ✅ Filtering & Sorting
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
        if (sortConfig.key === "_id") return 0;
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

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  const resetFilters = () => {
    setFilterStatus("all");
    setFilterImpact("all");
    setFilterType("all");
    setSearchTerm("");
    setSortConfig({ key: null, direction: "ascending" });
    setCurrentPage(1);
  };

  // ✅ Role Protection
  if (!["manager", "protection_committee"].includes(USER_ROLE)) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl font-medium bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-gray-100">
          <FaExclamationTriangle className="mx-auto text-4xl text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("accessDenied.title")}
          </h2>
          <p className="text-gray-600">{t("accessDenied.message")}</p>
        </div>
      </div>
    );
  }

  // ✅ Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        {t("loading")}
      </div>
    );
  }

  // ✅ Empty / Error
  if (error || !data?.complaints?.length) {
    return (
      <div className="lg:ml-[270px] flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
        <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-100 text-center max-w-lg w-full">
          <FaExclamationTriangle className="text-5xl text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {t("noComplaints.title")}
          </h2>
          <p className="text-gray-500 mb-4">{t("noComplaints.message")}</p>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="lg:ml-[270px] max-w-8xl bg-gray-50 py-4 px-4 sm:px-6 lg:px-10 flex flex-col gap-8 min-h-screen">
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480]">
          {t("header.title")}
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">{t("header.subtitle")}</p>
        <hr className="mt-4 border-gray-200" />
      </header>

      <DepartComplaintStats complaints={complaints} />

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

      <DepartComplaintTable
        paginatedComplaints={paginatedComplaints}
        filteredComplaints={filteredComplaints}
        sortConfig={sortConfig}
        handleSort={handleSort}
        setViewModal={setViewModal}
        setEditModal={setEditModal}
        setDeleteModal={setDeleteModal}
      />

      {pageCount > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            {t("pagination.showing")}{" "}
            <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{" "}
            {t("pagination.to")}{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredComplaints.length)}
            </span>{" "}
            {t("pagination.of")}{" "}
            <span className="font-medium">{filteredComplaints.length}</span>{" "}
            {t("pagination.results")}
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
            >
              <FaArrowLeft className="text-xs" /> {t("pagination.prev")}
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1 text-sm"
            >
              {t("pagination.next")} <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

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
