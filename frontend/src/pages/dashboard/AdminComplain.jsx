import React, { useState, useEffect, useMemo } from "react";
import { FaEdit, FaTrash, FaEye, FaFileExport, FaCheck, FaTimes, FaExclamationTriangle, FaSearch, FaSort, FaSortUp, FaSortDown, FaFilter, FaUser, FaCalendar, FaArrowLeft, FaArrowRight,
} from "react-icons/fa";

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

  // Modals
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  // Toast
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Assigned To options
  const assignedOptions = [
    "Maintenance Dept",
    "Counseling Office",
    "Academic Office",
    "IT Department",
    "Transport Office",
    "HR Department",
    "Administration",
  ];

  // Mock complaints with more realistic data
  useEffect(() => {
    const data = [
      {
        id: 1,
        fullName: "Ali Khan",
        role: "Student",
        complaintType: "Facility",
        description:
          "Fan not working in classroom C-12. It's been 3 days and the temperature is getting uncomfortable for students.",
        status: "Pending",
        priority: "High",
        date: "2025-09-15",
        assignedTo: "Maintenance Dept",
        comments: "Awaiting technician assignment",
      },
      {
        id: 2,
        fullName: "Sara Ahmed",
        role: "Parent",
        complaintType: "Behavior",
        description:
          "Bullying issue reported in grade 5 section B. My daughter is being targeted by a group of classmates.",
        status: "In Progress",
        priority: "High",
        date: "2025-09-14",
        assignedTo: "Counseling Office",
        comments: "Meeting scheduled with students and parents",
      },
      {
        id: 3,
        fullName: "Dr. Usman Ali",
        role: "Teacher",
        complaintType: "Academic",
        description:
          "Shortage of textbooks for Physics class. 5 students still don't have books after 2 weeks.",
        status: "Resolved",
        priority: "Medium",
        date: "2025-09-10",
        assignedTo: "Academic Office",
        comments: "Books delivered to classroom on Sept 12",
      },
      {
        id: 4,
        fullName: "Fatima Zahra",
        role: "Student",
        complaintType: "Digital Forms",
        description: "Unable to submit assignment through portal. Getting error code 502 repeatedly.",
        status: "Pending",
        priority: "Medium",
        date: "2025-09-16",
        assignedTo: "IT Department",
        comments: "Under investigation",
      },
      {
        id: 5,
        fullName: "Mr. Asif Mahmood",
        role: "Parent",
        complaintType: "Transport",
        description:
          "Bus route #7 consistently arriving 20-25 minutes late, causing students to miss first period.",
        status: "Rejected",
        priority: "High",
        date: "2025-09-05",
        assignedTo: "Transport Office",
        comments: "Route timing adjusted, driver reassigned",
      },
      {
        id: 6,
        fullName: "Ayesha Malik",
        role: "Student",
        complaintType: "Academic",
        description: "Grade not updated in the system for Mathematics assignment #3.",
        status: "Resolved",
        priority: "Low",
        date: "2025-09-12",
        assignedTo: "Academic Office",
        comments: "Grade updated on Sept 13",
      },
      {
        id: 7,
        fullName: "Bilal Ahmed",
        role: "Teacher",
        complaintType: "HR",
        description: "Payroll discrepancy for the month of August. Overtime hours not accounted for.",
        status: "In Progress",
        priority: "High",
        date: "2025-09-08",
        assignedTo: "HR Department",
        comments: "Under review by finance team",
      },
      {
        id: 8,
        fullName: "Zainab Hassan",
        role: "Parent",
        complaintType: "Facility",
        description: "Restroom cleanliness issue in the east wing building. Soap dispensers not refilled regularly.",
        status: "Pending",
        priority: "Medium",
        date: "2025-09-17",
        assignedTo: "Maintenance Dept",
        comments: "Assigned to cleaning staff",
      },
    ];
    setComplaints(data);
  }, []);

  // Colors
  const statusColors = {
    Pending: "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Rejected: "bg-gray-100 text-gray-700",
  };

  const priorityColors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-gray-100 text-gray-700",
  };

  const typeColors = {
    "Digital Forms": "bg-indigo-100 text-indigo-700",
    Behavior: "bg-red-100 text-red-700",
    HR: "bg-yellow-100 text-yellow-700",
    Academic: "bg-green-100 text-green-700",
    Facility: "bg-purple-100 text-purple-700",
    Transport: "bg-cyan-100 text-cyan-700",
  };

  // Filter & search
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
            c.description.toLowerCase().includes(q) ||
            c.complaintType.toLowerCase().includes(q) ||
            c.assignedTo.toLowerCase().includes(q);
          return statusMatch && priorityMatch && typeMatch && searchMatch;
        })
        .sort((a, b) => {
          if (!sortConfig.key) return 0;
          const aKey = a[sortConfig.key];
          const bKey = b[sortConfig.key];
          // handle undefined/null
          if (aKey == null && bKey == null) return 0;
          if (aKey == null) return sortConfig.direction === "ascending" ? -1 : 1;
          if (bKey == null) return sortConfig.direction === "ascending" ? 1 : -1;
          // numeric compare for id
          if (sortConfig.key === "id") {
            return sortConfig.direction === "ascending" ? aKey - bKey : bKey - aKey;
          }
          // strings (date ISO format sorts lexicographically)
          if (aKey < bKey) return sortConfig.direction === "ascending" ? -1 : 1;
          if (aKey > bKey) return sortConfig.direction === "ascending" ? 1 : -1;
          return 0;
        }),
    [complaints, filterStatus, filterPriority, filterType, searchTerm, sortConfig]
  );

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / itemsPerPage));
  const paginatedComplaints = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredComplaints.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredComplaints, currentPage, itemsPerPage]);

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

  // Toast
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // Update status (immediate)
  const saveStatus = (id, newStatus) => {
    setComplaints((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    setEditModal(null);
    showToast("Status updated successfully", "success");
  };

  // Delete complaint
  const confirmDelete = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
    setDeleteModal(null);
    showToast("Complaint deleted successfully", "success");
  };

  // Export
  const exportData = () => {
    const dataStr = JSON.stringify(complaints, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `complaints_${new Date().toISOString().split("T")[0]}.json`);
    link.click();
    showToast("Data exported successfully", "success");
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") direction = "descending";
    setSortConfig({ key, direction });
  };

  // Reset filters
  const resetFilters = () => {
    setFilterStatus("all");
    setFilterPriority("all");
    setFilterType("all");
    setSearchTerm("");
    setSortConfig({ key: null, direction: "ascending" });
    setCurrentPage(1);
  };

  return (
    <div className="lg:ml-[270px] md:ml-20 max-w-6xl bg-gray-50 py-4 px-15 flex flex-col gap-8 min-h-screen">
      {/* Page Title */}
      <header>
        <h1 className="text-3xl font-extrabold text-[#1a4480] md:text-5xl">Complaint Management</h1>
        <p className="text-gray-500 mt-1">Manage and resolve all system complaints efficiently</p>
        <hr className="mt-4 border-gray-200" />
      </header>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-red-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-gray-500 text-sm font-medium">Pending Complaints</h3>
          <p className="text-2xl font-bold text-gray-800">{complaints.filter((c) => c.status === "Pending").length}</p>
        </div>

        <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
          <p className="text-2xl font-bold text-gray-800">{complaints.filter((c) => c.status === "In Progress").length}</p>
        </div>

        <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-gray-500 text-sm font-medium">Resolved</h3>
          <p className="text-2xl font-bold text-gray-800">{complaints.filter((c) => c.status === "Resolved").length}</p>
        </div>

        <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <h3 className="text-gray-500 text-sm font-medium">Total Complaints</h3>
          <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaFilter className="text-gray-500" /> Filters
          </h2>
          <button onClick={resetFilters} className="text-sm text-[#1a4480] font-medium hover:underline flex items-center gap-1">
            Reset Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm w-full"
              />
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              value={filterPriority}
              onChange={(e) => {
                setFilterPriority(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Types</option>
              <option value="Digital Forms">Digital Forms</option>
              <option value="Behavior">Behavior</option>
              <option value="HR">HR</option>
              <option value="Academic">Academic</option>
              <option value="Facility">Facility</option>
              <option value="Transport">Transport</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">Showing {filteredComplaints.length} complaints</div>
          <div className="flex gap-3">
            <select
              className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>

            <button className="flex items-center gap-2 bg-[#1a4480] text-white px-4 py-2.5 rounded-lg hover:bg-[#0d3260] transition shadow-sm" onClick={exportData}>
              <FaFileExport /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#10448c] text-white">
                {["id", "fullName", "complaintType", "date", "status", "priority", "assignedTo", "actions"].map((key) => (
                  <th
                    key={key}
                    onClick={() => key !== "actions" && handleSort(key)}
                    className="p-3 text-left font-semibold text-sm cursor-pointer select-none"
                  >
                    <div className="flex items-center border gap-1">
                      {key === "id"
                        ? "ID"
                        : key === "fullName"
                        ? "Name"
                        : key === "class"
                        ? "Class"
                        : key === "age"
                        ? "Age"
                        : key === "date"
                        ? "Date   "
                        : key === "type"
                        ? "Type"
                        : key === "severity"
                        ? "Severity"
                        : "Actions"}
                      {sortConfig.key === key && (sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />)}
                      {sortConfig.key !== key && key !== "actions" && <FaSort className="text-gray-300" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedComplaints.map((c, i) => (
                <tr key={c.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}>
                  <td className="p-3 text-gray-700 text-center">#{c.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <FaUser className="text-indigo-600 text-sm" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{c.fullName}</div>
                        <div className="text-xs text-gray-500">{c.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-gray-700">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeColors[c.complaintType] || "bg-gray-100 text-gray-700"}`}>
                      {c.complaintType}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <FaCalendar className="mr-2 text-gray-400 text-xs" />
                      {c.date}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[c.status] || "bg-gray-100 text-gray-700"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColors[c.priority] || "bg-gray-100 text-gray-700"}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600 text-sm">{c.assignedTo}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewModal({ ...c })}
                        className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                        title="View details"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => setEditModal({ ...c })}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full transition"
                        title="Edit complaint"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteModal({ ...c })}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                        title="Delete complaint"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-400">
                    <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                    No complaints found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-md border border-gray-100">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredComplaints.length)}</span> of{" "}
            <span className="font-medium">{filteredComplaints.length}</span> results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
            >
              <FaArrowLeft className="text-xs" /> Previous
            </button>
            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
              let pageNum;
              if (pageCount <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= pageCount - 2) {
                pageNum = pageCount - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              // skip invalid page numbers
              if (pageNum < 1 || pageNum > pageCount) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1.5 rounded-lg border ${currentPage === pageNum ? "bg-[#1a4480] text-white border-[#1a4480]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center gap-1"
            >
              Next <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
                <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Complainant</h3>
                  <p className="text-lg font-medium text-gray-900">{viewModal.fullName}</p>
                  <p className="text-sm text-gray-600">{viewModal.role}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Date Submitted</h3>
                  <p className="text-lg text-gray-900">{viewModal.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${typeColors[viewModal.complaintType] || "bg-gray-100 text-gray-700"}`}>
                    {viewModal.complaintType}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${priorityColors[viewModal.priority] || "bg-gray-100 text-gray-700"}`}>
                    {viewModal.priority}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[viewModal.status] || "bg-gray-100 text-gray-700"}`}>
                    {viewModal.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                  <p className="text-lg text-gray-900">{viewModal.assignedTo}</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{viewModal.description}</p>
              </div>
              {viewModal.comments && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Comments</h3>
                  <p className="text-gray-900 bg-amber-50 p-4 rounded-lg">{viewModal.comments}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setViewModal(null)} className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Update Complaint Status</h2>
                <button onClick={() => setEditModal(null)} className="text-gray-400 hover:text-gray-600">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[editModal.status] || "bg-gray-100 text-gray-700"}`}>
                  {editModal.status}
                </span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  defaultValue={editModal.status}
                  onChange={(e) => saveStatus(editModal.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                <select
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={editModal.assignedTo || ""}
                  onChange={(e) => {
                    const newVal = e.target.value;
                    setComplaints((prev) => prev.map((c) => (c.id === editModal.id ? { ...c, assignedTo: newVal } : c)));
                    setEditModal((prev) => (prev ? { ...prev, assignedTo: newVal } : prev));
                  }}
                >
                  {assignedOptions.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                  {/* Optional 'Other' could be added here and handled with additional UI if needed */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                  value={editModal.comments || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setComplaints((prev) => prev.map((c) => (c.id === editModal.id ? { ...c, comments: val } : c)));
                    setEditModal((prev) => (prev ? { ...prev, comments: val } : prev));
                  }}
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setEditModal(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={() => {
                  setEditModal(null);
                  showToast("Changes saved successfully", "success");
                }}
                className="px-4 py-2 bg-[#1a4480] text-white rounded-lg hover:bg-[#0d3260] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Confirm Deletion</h2>
                <button onClick={() => setDeleteModal(null)} className="text-gray-400 hover:text-gray-600">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Are you sure you want to delete this complaint?</h3>
                  <p className="text-sm text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-gray-900">
                  {deleteModal.fullName} - {deleteModal.complaintType}
                </p>
                <p className="text-sm text-gray-600 mt-1">{deleteModal.description.substring(0, 100)}...</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setDeleteModal(null)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={() => confirmDelete(deleteModal.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                Delete Complaint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 transition-opacity duration-300 ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.type === "success" ? <FaCheck /> : <FaExclamationTriangle />}
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminComplain;
