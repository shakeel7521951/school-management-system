import React, { useState } from "react";
import { FileText } from "lucide-react";
import AdminDocumentsTable from "../../../components/dashboard/UploadedDocuments/AdminDocumentsTable";
import RejectDocumentModal from "../../../components/dashboard/UploadedDocuments/RejectDocumentModal";
import ViewDocumentModal from "../../../components/dashboard/UploadedDocuments/ViewDocumentModal";
const UploadedDocuments = () => {
  const [uploads, setUploads] = useState([
    // { id: 1, title: "ID Card", uploader: "Ali", role: "Student", type: "PDF", date: "2025-09-15", status: "Pending", note: "" },
    { id: 2, title: "Student Report", uploader: "Sara", role: "Teacher", type: "PDF", date: "2025-09-16", status: "Pending", note: "" },
    // { id: 3, title: "Paid Challan", uploader: "Mohammed", role: "Student", type: "PDF", date: "2025-09-14", status: "Resolved", note: "" },
    { id: 4, title: "Course Material", uploader: "Fatima", role: "Teacher", type: "PDF", date: "2025-09-13", status: "Resolved", note: "" },
    // { id: 5, title: "Domicile", uploader: "Fatima", role: "Student", type: "PDF", date: "2025-09-13", status: "Rejected", note: "Reuplaod clear Scanned copy" },
     { id: 5, title: "Grades Report - Class 8", uploader: "Fatima", role: "Teacher", type: "xlsx", date: "2025-09-13", status: "Rejected", note: "Please recheck marks calculation" },
  ]);

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Approve
  const handleApprove = (id) => {
    setUploads(
      uploads.map((doc) =>
        doc.id === id ? { ...doc, status: "Resolved", note: "" } : doc
      )
    );
  };

  // Reject
  const handleRejectSubmit = () => {
    if (!rejectNote.trim() || !selectedDoc) return;
    setUploads(
      uploads.map((doc) =>
        doc.id === selectedDoc.id
          ? { ...doc, status: "Rejected", note: rejectNote }
          : doc
      )
    );
    setRejectNote("");
    setSelectedDoc(null);
    setShowRejectModal(false);
  };

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="md:ml-20 lg:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#104c80] flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            Uploaded Documents
          </h2>
        </div>

        {/* Table */}
        <AdminDocumentsTable
          uploads={uploads}
          setSelectedDoc={setSelectedDoc}
          setShowViewModal={setShowViewModal}
          setShowRejectModal={setShowRejectModal}
          handleApprove={handleApprove}
          getStatusClass={getStatusClass}
        />

        {uploads.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No documents uploaded yet</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showViewModal && selectedDoc && (
        <ViewDocumentModal
          selectedDoc={selectedDoc}
          onClose={() => setShowViewModal(false)}
          getStatusClass={getStatusClass}
        />
      )}

      {showRejectModal && selectedDoc && (
        <RejectDocumentModal
          selectedDoc={selectedDoc}
          rejectNote={rejectNote}
          setRejectNote={setRejectNote}
          onClose={() => {
            setRejectNote("");
            setSelectedDoc(null);
            setShowRejectModal(false);
          }}
          onConfirm={handleRejectSubmit}
        />
      )}
    </div>
  );
};

export default UploadedDocuments;
