import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Trash2,
  X,
  Search,
  ChevronDown,
  Edit3,
  FolderOpen,
  Filter,
  ArrowUpDown,
  AlertCircle,
  Eye,
  Menu,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
const Students = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([
  { id: 1, name: "Sadiq Hussain", status: "Approved", date: "2025-09-07" },
  { id: 2, name: "Fatima Zahra", status: "Approved", date: "2025-08-25" },
  { id: 3, name: "Mohammed Ali", status: "Pending", date: "2025-08-12" },
  { id: 4, name: "Aisha Siddiqui", status: "Approved", date: "2025-07-30" },
  { id: 5, name: "Omar Farooq", status: "Pending", date: "2025-07-18" },
  { id: 6, name: "Maryam Noor", status: "Approved", date: "2025-07-05" },
  { id: 7, name: "Bilal Hussain", status: "Pending", date: "2025-06-22" },
  { id: 8, name: "Khadija Yusuf", status: "Approved", date: "2025-06-10" },
  { id: 9, name: "Yusuf Rahman", status: "Pending", date: "2025-05-28" },
  { id: 10, name: "Hafsa Khan", status: "Approved", date: "2025-05-15" },
  { id: 11, name: "Ibrahim Malik", status: "Pending", date: "2025-04-30" },
  { id: 12, name: "Zainab Ahmed", status: "Approved", date: "2025-04-12" },
]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", status: "Pending" });
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  // Filter + sort
  const filteredStudents = students
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") comparison = a.name.localeCompare(b.name);
      if (sortBy === "date") comparison = new Date(a.date) - new Date(b.date);
      if (sortBy === "status") comparison = a.status.localeCompare(b.status);
      return sortOrder === "desc" ? -comparison : comparison;
    });

  // Add student
  const handleAddStudent = () => {
    if (!newStudent.name.trim()) {
      toast.error("Student name is required");
      return;
    }
    const student = {
      id: Date.now(),
      name: newStudent.name,
      status: newStudent.status,
      date: new Date().toISOString().split("T")[0],
    };
    setStudents([student, ...students]);
    setNewStudent({ name: "", status: "Pending" });
    setIsModalOpen(false);
    toast.success(`Student "${student.name}" added`);
  };

  // Edit student
  const handleEdit = (student) => {
    setEditStudent({ ...student });
    setIsEditModalOpen(true);
  };
  const handleSaveEdit = () => {
    if (!editStudent) return;
    setStudents(students.map((s) => (s.id === editStudent.id ? editStudent : s)));
    setIsEditModalOpen(false);
    toast.success(`"${editStudent.name}" updated`);
  };
  // Delete student
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (!studentToDelete) return;
    setStudents(students.filter((s) => s.id !== studentToDelete.id));
    setIsDeleteModalOpen(false);
    toast.success(`"${studentToDelete.name}" deleted`);
  };
  return (
    <div className="py-4 bg-gray-50 min-h-screen  md:max-w-5xl md:ms-[24%]">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="text-blue-600" size={28} />
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">Student Management</h1>
          </div>
          <button
            className="md:hidden p-2 rounded-lg bg-gray-100"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Menu size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">Manage and track student approvals</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-md mt-4 md:mt-0 w-full md:w-auto"
        >
          <Upload size={18} className="mr-2" />
          Add Student
        </button>
      </div>

      {/* Desktop Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 hidden md:flex md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex items-center">
            <ArrowUpDown size={16} className="absolute left-3 text-gray-400 z-10" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 flex items-center"
          >
            {sortOrder === "desc" ? "↓" : "↑"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredStudents.length ? (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student Name</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <User className="text-blue-600" size={20} />
                        </div>
                        <span className="font-medium text-gray-800">{s.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                            s.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{s.date}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to="/documentdetail">
                            <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                              <Eye size={16} />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleEdit(s)}
                            className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(s)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden">
              {filteredStudents.map((s) => (
                <div key={s.id} className="p-4 border-b border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg mt-1">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 truncate">{s.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            s.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {s.status}
                        </span>
                        <span className="text-xs text-gray-500">{s.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <Link to="/studentdetail">
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEdit(s)}
                      className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(s)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <User className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-600">No students found</h3>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search or add a new student
            </p>
          </div>
        )}
      </div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Add Student</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newStudent.status}
                    onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-5 border-t">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Edit Student Modal */}
      <AnimatePresence>
        {isEditModalOpen && editStudent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Edit Student</h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                  <input
                    type="text"
                    value={editStudent.name}
                    onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editStudent.status}
                    onChange={(e) => setEditStudent({ ...editStudent, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-5 border-t">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && studentToDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex items-center justify-between p-5 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Delete Student</h3>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-5 text-gray-700">
                <p>Are you sure you want to delete:</p>
                <p className="mt-2 font-semibold">{studentToDelete.name}</p>
                <p className="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
              </div>
              <div className="flex justify-end gap-3 p-5 border-t">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Students;
