import React from "react";
import { Eye, Trash2 } from "lucide-react";

const DocumentsTable = ({ docs, onView, onDelete, onStatusChange }) => {
  return (
    <div className="w-full">
      {/* Horizontal scroll for table */}
      <div className=" hidden md:flex bg-white shadow-md rounded-2xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">#</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Title</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold hidden sm:table-cell">Uploader</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold hidden md:table-cell">Role</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold hidden md:table-cell">Type</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-xs sm:text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-center text-xs sm:text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {docs.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500 text-sm">
                  No documents found
                </td>
              </tr>
            ) : (
              docs.map((doc, index) => (
                <tr
                  key={doc.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium">{doc.title}</td>
                  <td className="px-4 py-2 text-sm hidden sm:table-cell">{doc.uploaderName}</td>
                  <td className="px-4 py-2 text-sm hidden md:table-cell">{doc.uploadedBy}</td>
                  <td className="px-4 py-2 text-sm hidden md:table-cell">{doc.type || "—"}</td>
                  <td className="px-4 py-2 text-sm">{doc.date}</td>
                  <td className="px-4 py-2 text-sm">
                    <select
                      value={doc.status}
                      onChange={(e) => onStatusChange(doc, e.target.value)}
                      className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold border cursor-pointer
                        ${
                          doc.status === "Approved"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : doc.status === "Rejected"
                            ? "bg-red-100 text-red-700 border-red-300"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
                        }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2 sm:gap-3">
                    <button
                      onClick={() => onView(doc)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(doc)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card-style view for mobile screens (smaller than md) */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {docs.map((doc, index) => (
          <div key={doc.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <span className="font-semibold">{index + 1}. {doc.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onView(doc)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onDelete(doc)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p><span className="font-semibold">Uploader:</span> {doc.uploaderName}</p>
              <p><span className="font-semibold">Role:</span> {doc.uploadedBy}</p>
              {doc.type && <p><span className="font-semibold">Type:</span> {doc.type}</p>}
              <p><span className="font-semibold">Date:</span> {doc.date}</p>
            </div>
            <select
              value={doc.status}
              onChange={(e) => onStatusChange(doc, e.target.value)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold border cursor-pointer
                ${
                  doc.status === "Approved"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : doc.status === "Rejected"
                    ? "bg-red-100 text-red-700 border-red-300"
                    : "bg-yellow-100 text-yellow-700 border-yellow-300"
                }`}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTable;
