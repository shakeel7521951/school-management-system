import React, { useState } from "react";
import { FileText, Search } from "lucide-react";
import DocumentViewModal from "../../components/dashboard/documents/DocumentViewModal";
import DeleteConfirmModal from "../../components/dashboard/documents/DeleteConfirmModal";
import DocumentsTable from "../../components/dashboard/documents/DocumentsTable";

const Documents = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterRole, setFilterRole] = useState("all");

  // Teacher uploaded docs
  const [teacherDocs, setTeacherDocs] = useState([
    {
      id: 1,
      title: "Attendance Report",
      date: "2025-09-10",
      status: "Approved",
      type: "Attendance",
      fileName: "attendance_report.xlsx",
      reviewerNotes: "Approved by Admin.",
      uploadedBy: "Teacher",
      uploaderName: "Mr. Khan",
    },
    {
      id: 2,
      title: "Student Progress Report",
      date: "2025-09-12",
      status: "Pending",
      type: "Report",
      fileName: "progress_report.pdf",
      reviewerNotes: "—",
      uploadedBy: "Teacher",
      uploaderName: "Ms. Fatima",
    },
  ]);

  // Student uploaded docs
  const [studentDocs, setStudentDocs] = useState([
    {
      id: 101,
      title: "Math Assignment",
      date: "2025-09-01",
      status: "Pending",
      uploadedBy: "Student",
      uploaderName: "Ali",
    },
    {
      id: 102,
      title: "Leave Application",
      date: "2025-08-20",
      status: "Pending",
      uploadedBy: "Student",
      uploaderName: "Sara",
    },
  ]);

  const [docToDelete, setDocToDelete] = useState(null);
  const [docToView, setDocToView] = useState(null);

  // ✅ Update status
  const handleStatusChange = (doc, newStatus) => {
    if (doc.status === newStatus) return;

    if (doc.uploadedBy === "Teacher") {
      setTeacherDocs((docs) =>
        docs.map((d) => (d.id === doc.id ? { ...d, status: newStatus } : d))
      );
    } else {
      setStudentDocs((docs) =>
        docs.map((d) => (d.id === doc.id ? { ...d, status: newStatus } : d))
      );
    }
  };

  // ✅ Delete
  const handleDeleteConfirm = () => {
    if (!docToDelete) return;
    if (docToDelete.uploadedBy === "Teacher") {
      setTeacherDocs((docs) => docs.filter((d) => d.id !== docToDelete.id));
    } else {
      setStudentDocs((docs) => docs.filter((d) => d.id !== docToDelete.id));
    }
    setDocToDelete(null);
  };

  // ✅ Sorting + Filtering
  const sortDocs = (docs) =>
    docs
      .filter((d) =>
        d.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((d) =>
        filterRole === "all" ? true : d.uploadedBy === filterRole
      )
      .sort((a, b) => {
        let comp = 0;
        if (sortBy === "title") comp = a.title.localeCompare(b.title);
        if (sortBy === "date") comp = new Date(a.date) - new Date(b.date);
        if (sortBy === "status") comp = a.status.localeCompare(b.status);
        return sortOrder === "desc" ? -comp : comp;
      });

  const allDocs = sortDocs([...teacherDocs, ...studentDocs]);

  return (
    <div className="lg:ml-[270px] max-w-6xl bg-gray-50 py-6 px-6 flex flex-col gap-10 min-h-screen">
      {/* Header */}
      <header className="flex w-[300px] ">
        {/* <FileText className="text-blue-600" size={28} /> */}
        <h1 className="text-[26px] font-bold text-[#1a4480]">
         Document Management
        </h1>
      </header>

      {/* Search + Sort + Filter Controls */}
      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center gap-4 ">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Role */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="all">All</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>

        {/* Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Documents Table */}
      <DocumentsTable
        docs={allDocs}
        onView={setDocToView}
        onDelete={setDocToDelete}
        onStatusChange={handleStatusChange}
      />

      {/* Modals */}
      <DocumentViewModal doc={docToView} onClose={() => setDocToView(null)} />
      <DeleteConfirmModal
        doc={docToDelete}
        onCancel={() => setDocToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Documents;
