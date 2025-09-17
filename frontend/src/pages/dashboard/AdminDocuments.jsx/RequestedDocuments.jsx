import React, { useState } from "react";
import { Bell, PlusCircle, FileText } from "lucide-react";

const RequestedDocuments = () => {
  const [requestedDocs, setRequestedDocs] = useState([
    // { id: 1, title: "ID Card", type: "PDF", note: "", role: "Student" },
    // { id: 2, title: "Domicile", type: "PDF", note: "Re-upload clear scanned copy", role: "Student" },
    // { id: 3, title: "Paid Challan", type: "PDF", note: "", role: "Student" },
    { id: 4, title: "Attendance Report", type: "XLSX", note: "", role: "Teacher", requestedBy: "Admin" },
    { id: 5, title: "Course Outline", type: "PDF", note: "", role: "Teacher" },
    { id: 6, title: "Students Progress Report", type: "PDF", note: "", role: "Teacher" },
    { id: 7, title: "Grades Report - Class 8", type: "XLSX", note: "", role: "Teacher" },
  ]);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: "", role: "Student" });

  const handleRequestSubmit = () => {
    if (!newDoc.title.trim()) return;

    const newRequest = {
      id: requestedDocs.length + 1,
      title: newDoc.title,
      type: "PDF",
      note: "",
      role: newDoc.role,
    };

    setRequestedDocs([...requestedDocs, newRequest]);
    setShowRequestModal(false);
    setNewDoc({ title: "", role: "Student" });

    alert(`Admin has requested ${newRequest.title} from ${newRequest.role}`);
  };

  return (
    <div className="p-6 md:ml-20 lg:ml-64 md:p-10 bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 min-h-screen font-sans">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-3xl font-bold text-[#104c80] flex items-center gap-2">
            <Bell className="w-7 h-7 text-[#104c80]" />
            Requested Documents
          </h2>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#104c80] text-white rounded-lg shadow-md hover:bg-[#0d3a63] transition"
          >
            <PlusCircle className="w-5 h-5" /> Request New
          </button>
        </div>

        {/* Table for md+ screens */}
        <div className="hidden md:block overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#104c80] text-white text-sm uppercase">
                <th className="px-5 py-3 text-left rounded-tl-lg">#</th>
                <th className="px-5 py-3 text-left">Title</th>
                <th className="px-5 py-3 text-left">Role</th>
                <th className="px-5 py-3 text-left">Type</th>
                <th className="px-5 py-3 text-left rounded-tr-lg">Requested By</th>
              </tr>
            </thead>
            <tbody>
              {requestedDocs.map((doc, i) => (
                <tr
                  key={doc.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b hover:bg-blue-50 transition`}
                >
                  <td className="px-5 py-3">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{doc.title}</td>
                  <td className="px-5 py-3 text-gray-700">{doc.role}</td>
                  <td className="px-5 py-3 text-gray-700">{doc.type}</td>
                  <td className="px-5 py-3 text-gray-700">Admin</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile */}
        <div className="block md:hidden space-y-4">
          {requestedDocs.map((doc, i) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#104c80]" /> {doc.title}
                </h3>
                <span className="text-xs text-gray-500">#{i + 1}</span>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> {doc.role}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span> {doc.type}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Requested By:</span> Admin
              </p>
              {doc.note && (
                <p className="text-sm text-red-500 mt-2">
                  <span className="font-medium">Note:</span> {doc.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed px-3  inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-fadeIn">
            <h3 className="text-xl font-bold text-[#104c80] mb-4">
              Request New Document
            </h3>
            <input
              type="text"
              placeholder="Document Title"
              className="w-full border p-3 rounded-lg mb-3 focus:ring-2 focus:ring-[#104c80] outline-none"
              value={newDoc.title}
              onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            />
            <select
              className="w-full border p-3 rounded-lg mb-4 focus:ring-2 focus:ring-[#104c80] outline-none"
              value={newDoc.role}
              onChange={(e) => setNewDoc({ ...newDoc, role: e.target.value })}
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestSubmit}
                className="px-4 py-2 bg-[#104c80] text-white rounded-lg hover:bg-[#0d3a63] transition"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestedDocuments;
