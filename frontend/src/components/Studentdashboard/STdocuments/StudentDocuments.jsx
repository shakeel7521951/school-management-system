import React from "react";
import { Plus } from "lucide-react";

const StudentDocuments = ({ documents, onSelect, onUploadClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-extrabold text-[#1A4C80] tracking-tight">
            Documents
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Upload and manage your school-related documents effortlessly.
          </p>
        </div>
        <button
          onClick={onUploadClick}
          className="mt-6 sm:mt-0 font-semibold inline-flex items-center gap-2
            bg-gradient-to-r from-[#1A4C80] to-[#2563eb]
            text-white px-6 py-3 rounded-xl shadow-lg
            transform transition-transform duration-300 ease-out
            hover:scale-105 active:scale-95
            hover:shadow-2xl"
        >
          <Plus size={18} /> Upload Document
        </button>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b   bg-[#1a4c80]">
          <h2 className="text-xl font-semibold  text-white">
            Uploaded Documents
          </h2>
          
        </div>

        {documents.length === 0 ? (
          <p className="text-center text-gray-500 py-12 italic text-lg">
            No documents uploaded yet.
          </p>
        ) : (
          <>
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    {["ID", "Title", "Type", "Status", "Note", "Date"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-b"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr
                      key={doc.id}
                      className="hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => onSelect(doc)}
                    >
                      <td className="px-6 py-3 border-b">{doc.id}</td>
                      <td className="px-6 py-3 border-b">{doc.title}</td>
                      <td className="px-6 py-3 border-b">{doc.type}</td>
                      <td className="px-6 py-3 border-b">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            doc.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : doc.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 border-b">{doc.note || "-"}</td>
                      <td className="px-6 py-3 border-b">{doc.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for mobile */}
            <div className="block md:hidden p-5 space-y-5">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border rounded-2xl shadow-sm p-5 bg-gradient-to-br from-white to-gray-50 
                             hover:shadow-lg transition cursor-pointer"
                  onClick={() => onSelect(doc)}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-lg text-[#1A4C80]">
                      {doc.title}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        doc.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : doc.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Type:</span> {doc.type}
                    </p>
                    <p>
                      <span className="font-medium">Note:</span>{" "}
                      {doc.note || "-"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    📅 {doc.date}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDocuments;
