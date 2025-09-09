import React, { useState } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  X,
  Search,
  File,
  FileTextIcon,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  ChevronDown,
  Edit3,
} from "lucide-react";

const Documents = () => {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState([
    { id: 1, name: "Student Records.pdf", type: "PDF", size: "2.1 MB", date: "2025-09-07" },
    { id: 2, name: "Annual Report.docx", type: "Word", size: "1.3 MB", date: "2025-08-25" },
    { id: 3, name: "Fee Structure.xlsx", type: "Excel", size: "850 KB", date: "2025-08-12" },
    { id: 4, name: "School Policy.pdf", type: "PDF", size: "3.2 MB", date: "2025-07-30" },
    { id: 5, name: "Faculty Handbook.docx", type: "Word", size: "4.5 MB", date: "2025-07-15" },
    { id: 6, name: "Budget Analysis.xlsx", type: "Excel", size: "1.8 MB", date: "2025-06-28" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editDoc, setEditDoc] = useState(null);

  const filteredDocs = docs
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => filterType === "All" || d.type === filterType)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "size") {
        const sizeA = parseFloat(a.size);
        const sizeB = parseFloat(b.size);
        return sizeB - sizeA;
      }
      return 0;
    });

  const handleUpload = () => {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    let type = "Other";
    if (ext === "pdf") type = "PDF";
    if (ext === "doc" || ext === "docx") type = "Word";
    if (ext === "xls" || ext === "xlsx") type = "Excel";
    if (["jpg", "jpeg", "png"].includes(ext)) type = "Image";
    if (["zip", "rar"].includes(ext)) type = "Archive";

    const newDoc = {
      id: Date.now(),
      name: file.name,
      type,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      date: new Date().toISOString().split("T")[0],
    };
    setDocs([newDoc, ...docs]);
    setFile(null);
    setIsModalOpen(false);
  };

  const handleDownload = (doc) => {
    alert(`Downloading ${doc.name}...`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this document?")) {
      setDocs(docs.filter((doc) => doc.id !== id));
    }
  };

  const handleEdit = (doc) => {
    setEditDoc(doc);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editDoc) return;
    setDocs(docs.map((d) => (d.id === editDoc.id ? editDoc : d)));
    setIsEditModalOpen(false);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF":
        return <FileTextIcon className="text-red-500" size={20} />;
      case "Word":
        return <FileText className="text-blue-500" size={20} />;
      case "Excel":
        return <FileSpreadsheet className="text-green-500" size={20} />;
      case "Image":
        return <FileImage className="text-purple-500" size={20} />;
      case "Archive":
        return <FileArchive className="text-yellow-500" size={20} />;
      default:
        return <File className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full md:max-w-5xl md:ms-[24%]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, filter, and upload your documents
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
        >
          <Upload size={18} className="mr-2" />
          Upload
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="PDF">PDF</option>
              <option value="Word">Word</option>
              <option value="Excel">Excel</option>
              <option value="Image">Image</option>
              <option value="Archive">Archive</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocs.length ? (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 border">
                  {getFileIcon(doc.type)}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 truncate">{doc.name}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {doc.type} • {doc.size}
                </p>
              </div>
              <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">{doc.date}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="p-2 rounded-lg bg-gray-100 text-blue-600 hover:bg-blue-50"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleEdit(doc)}
                    className="p-2 rounded-lg bg-gray-100 text-green-600 hover:bg-green-50"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 rounded-lg bg-gray-100 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
            <FileText className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-lg font-medium text-gray-600">No documents</h3>
            <p className="text-gray-400 text-sm mt-1">
              Try changing filters or upload a new file
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Upload Document</h2>
            <p className="text-sm text-gray-500 mb-6">
              Drag & drop or choose a file to upload
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center relative mb-6 hover:border-blue-400 transition">
              {file ? (
                <>
                  <FileText className="mx-auto text-blue-600 mb-3" size={40} />
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                  <p className="text-gray-500">Drop files here or click to browse</p>
                </>
              )}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!file}
                className={`px-4 py-2.5 rounded-lg font-medium text-white ${
                  file
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editDoc && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative mx-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Document</h2>
            <p className="text-sm text-gray-500 mb-6">
              Update document details below
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={editDoc.name}
                onChange={(e) => setEditDoc({ ...editDoc, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={editDoc.type}
                onChange={(e) => setEditDoc({ ...editDoc, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="PDF">PDF</option>
                <option value="Word">Word</option>
                <option value="Excel">Excel</option>
                <option value="Image">Image</option>
                <option value="Archive">Archive</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2.5 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;