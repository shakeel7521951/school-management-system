import React, { useState, useEffect, useMemo } from "react";
import { FaExclamationTriangle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ComplaintTable from "./ComplaintTable";
import ComplaintFilters from "./ComplaintFilters";
import ComplaintModals from "./ComplaintModals";
import ComplaintStats from "./ComplaintStats";

const USER_ROLE = "manager";

const AdminComplain = () => {
    const [complaints, setComplaints] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [viewModal, setViewModal] = useState(false);
    const [editModal, setEditModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    // Mock data with status & priority
    useEffect(() => {
        const data = [
            {
                id: 1,
                fullName: "Ali Khan",
                class: "12",
                age: "18",
                date: "2025-09-10",
                complaintType: "Facilities",
                severity: "simple-note",
                impact: "physical",
                detail: "Library chairs broken and uncomfortable for students.",
                expectedAction: "resolve",
                Action: "",
                status: "pending",
                priority: "Medium",
            },
            {
                id: 2,
                fullName: "Sara Ahmed",
                class: "12",
                age: "18",
                date: "2025-09-11",
                complaintType: "Facilities",
                severity: "urgent",
                impact: "physical",
                detail: "Water dispensers not working on the 2nd floor.",
                expectedAction: "pending",
                Action: "",
                status: "in-progress",
                priority: "High",
            },
            {
                id: 3,
                fullName: "Dr. Usman Ali",
                class: "12",
                age: "18",
                date: "2025-09-12",
                complaintType: "Emotions",
                severity: "follow-up",
                impact: "psychological",
                detail: "Students reporting stress due to continuous tests without breaks.",
                expectedAction: "resolve",
                Action: "",
                status: "resolved",
                priority: "Medium",
            },
            {
                id: 4,
                fullName: "Fatima Zahra",
                class: "12",
                age: "18",
                date: "2025-09-16",
                complaintType: "Learning",
                severity: "urgent",
                impact: "academic",
                detail: "Unable to submit assignments due to portal error 502.",
                expectedAction: "pending",
                Action: "",
                status: "pending",
                priority: "High",
            },
            {
                id: 5,
                fullName: "Mr. Asif Mahmood",
                class: "12",
                age: "18",
                date: "2025-09-13",
                complaintType: "Work Environment",
                severity: "follow-up",
                impact: "social",
                detail: "Construction noise outside classrooms affecting focus.",
                expectedAction: "resolve",
                Action: "",
                status: "resolved",
                priority: "Low",
            },
            {
                id: 6,
                fullName: "Ayesha Malik",
                class: "12",
                age: "18",
                date: "2025-09-14",
                complaintType: "Stress",
                severity: "simple-note",
                impact: "psychological",
                detail: "Students under high stress before exams.",
                expectedAction: "resolve",
                Action: "",
                status: "pending",
                priority: "Medium",
            },
            {
                id: 7,
                fullName: "Bilal Ahmed",
                class: "12",
                age: "18",
                date: "2025-09-15",
                complaintType: "Rights",
                severity: "serious",
                impact: "academic",
                detail: "Unfair grading reported in midterm exams.",
                expectedAction: "rejected",
                Action: "",
                status: "rejected",
                priority: "High",
            },
            {
                id: 8,
                fullName: "Zainab Hassan",
                class: "12",
                age: "18",
                date: "2025-09-15",
                complaintType: "Safety at Work",
                severity: "serious",
                impact: "physical",
                detail: "Broken glass in playground area causing safety hazard.",
                expectedAction: "resolve",
                Action: "",
                status: "pending",
                priority: "High",
            },
        ];

        setComplaints(data);
    }, []);

    // Filtering + Sorting
    const filteredComplaints = useMemo(
        () =>
            complaints
                .filter((c) => {
                    const statusMatch = filterStatus === "all" || c.status === filterStatus;
                    const priorityMatch = filterPriority === "all" || c.priority === filterPriority;
                    const typeMatch = filterType === "all" || c.complaintType === filterType;
                    const q = searchTerm.trim().toLowerCase();
                    const searchMatch =
                        !q ||
                        c.fullName.toLowerCase().includes(q) ||
                        c.detail.toLowerCase().includes(q) ||
                        c.complaintType.toLowerCase().includes(q);
                    return statusMatch && priorityMatch && typeMatch && searchMatch;
                })
                .sort((a, b) => {
                    if (!sortConfig.key) return 0;
                    const aKey = a[sortConfig.key];
                    const bKey = b[sortConfig.key];
                    if (aKey == null && bKey == null) return 0;
                    if (aKey == null) return sortConfig.direction === "ascending" ? -1 : 1;
                    if (bKey == null) return sortConfig.direction === "ascending" ? 1 : -1;
                    if (sortConfig.key === "id") {
                        return sortConfig.direction === "ascending" ? aKey - bKey : bKey - aKey;
                    }
                    if (aKey < bKey) return sortConfig.direction === "ascending" ? -1 : 1;
                    if (aKey > bKey) return sortConfig.direction === "ascending" ? 1 : -1;
                    return 0;
                }),
        [complaints, filterStatus, filterPriority, filterType, searchTerm, sortConfig]
    );

    const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));
    const paginatedComplaints = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredComplaints.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredComplaints, currentPage, itemsPerPage]);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    const saveStatus = (id, newStatus) => {
        setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
        setEditModal(null);
        showToast("Status updated successfully", "success");
    };

    const confirmDelete = (id) => {
        setComplaints((prev) => prev.filter((c) => c.id !== id));
        setDeleteModal(null);
        showToast("Complaint deleted successfully", "success");
    };

    const exportData = () => {
        const dataStr = JSON.stringify(complaints, null, 2);
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
        const link = document.createElement("a");
        link.setAttribute("href", dataUri);
        link.setAttribute(
            "download",
            `complaints_${new Date().toISOString().split("T")[0]}.json`
        );
        link.click();
        showToast("Data exported successfully", "success");
    };

    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
        setSortConfig({ key, direction });
    };

    const resetFilters = () => {
        setFilterStatus("all");
        setFilterPriority("all");
        setFilterType("all");
        setSearchTerm("");
        setSortConfig({ key: null, direction: "ascending" });
        setCurrentPage(1);
    };

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

    return (
        <div className="lg:ml-[270px] max-w-8xl bg-gray-50 py-4 px-4 sm:px-6 lg:px-10 flex flex-col gap-8 min-h-screen">
            <header>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a4480]">
                    Complaint Management
                </h1>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                    Manage and resolve all system complaints efficiently
                </p>
                <hr className="mt-4 border-gray-200" />
            </header>

            <ComplaintStats complaints={complaints} />

            <ComplaintFilters
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterType={filterType}
                setFilterType={setFilterType}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                filteredComplaints={filteredComplaints}
                resetFilters={resetFilters}
                exportData={exportData}
                setCurrentPage={setCurrentPage}
            />

            <div className="hidden md:block">
                <ComplaintTable
                    paginatedComplaints={paginatedComplaints}
                    filteredComplaints={filteredComplaints}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    setViewModal={setViewModal}
                    setEditModal={setEditModal}
                    setDeleteModal={setDeleteModal}
                />
            </div>

            <div className="grid gap-4 md:hidden">
                {paginatedComplaints.map((c) => (
                    <div key={c.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-gray-800">{c.fullName}</h3>
                                <p className="text-sm text-gray-500">
                                    {c.complaintType} • {c.date}
                                </p>
                            </div>
                            <button
                                onClick={() => setViewModal(c)}
                                className="text-[#1a4480] text-sm font-medium hover:underline"
                            >
                                View
                            </button>
                        </div>
                        <p className="mt-2 text-gray-700 text-sm">{c.detail}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{c.severity}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">{c.expectedAction}</span>
                        </div>
                    </div>
                ))}
            </div>

            {pageCount > 1 && (
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                    <div className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{" "}
                        to{" "}
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

            <ComplaintModals
                viewModal={viewModal}
                setViewModal={setViewModal}
                editModal={editModal}
                setEditModal={setEditModal}
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                saveStatus={saveStatus}
                confirmDelete={confirmDelete}
                setComplaints={setComplaints}
                showToast={showToast}
                toast={toast}
            />
        </div>
    );
};

export default AdminComplain;
