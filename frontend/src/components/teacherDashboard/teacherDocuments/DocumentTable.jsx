import React from "react";
import { Eye, Trash2, Download } from "lucide-react";

const DocumentTable = ({ docs, onView, onDelete, onDownload, getStatusBadge }) => {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden border border-gray-100">
      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f0f6fc] text-[#104c80] font-semibold">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {docs.map((doc, i) => (
              <tr
                key={doc.id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {doc.title}
                </td>
                <td className="py-3 px-4 text-gray-600">{doc.type}</td>
                <td className="py-3 px-4 text-gray-500">{doc.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button
                    onClick={() => onView(doc)}
                    className="flex items-center gap-1 text-[#104c80] hover:underline"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => onDownload(doc)}
                    className="flex items-center gap-1 text-gray-600 hover:underline"
                  >
                    <Download size={16} /> Download
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="flex items-center gap-1 text-red-500 hover:underline"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {docs.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden p-4 space-y-4">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="mb-2">
                <p className="font-semibold text-gray-800">{doc.title}</p>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-500">{doc.date}</p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                    doc.status
                  )}`}
                >
                  {doc.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                <button
                  onClick={() => onView(doc)}
                  className="flex items-center gap-1 text-[#104c80] hover:underline text-sm"
                >
                  <Eye size={14} /> View
                </button>
                <button
                  onClick={() => onDownload(doc)}
                  className="flex items-center gap-1 text-gray-600 hover:underline text-sm"
                >
                  <Download size={14} /> Download
                </button>
                <button
                  onClick={() => onDelete(doc.id)}
                  className="flex items-center gap-1 text-red-500 hover:underline text-sm"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentTable;
