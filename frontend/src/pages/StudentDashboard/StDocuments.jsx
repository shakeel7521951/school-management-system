import React, { useState } from "react";
import StudentDocuments from "../../components/Studentdashboard/STdocuments/StudentDocuments";
import StudentDocumentModal from "../../components/Studentdashboard/STdocuments/StudentDocumentModal";

const StDocuments = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "ID Card",
      uploader: "You",
      role: "Student",
      type: "PDF",
      date: "2025-09-15",
      status: "Pending",
      note: "",
    },
    {
      id: 3,
      title: "Paid Challan",
      uploader: "You",
      role: "Student",
      type: "PDF",
      date: "2025-09-12",
      status: "Pending",
      note: "",
    },
    {
      id: 4,
      title: "Domicile",
      uploader: "You",
      role: "Student",
      type: "PDF",
      date: "2025-09-11",
      status: "Rejected",
      note: "Re-upload clear scanned copy",
    },
  ]);

  // Modal states
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // ✅ handle upload
  const handleUpload = (formData) => {
    const file = formData.get("file");

    const newDoc = {
      id: documents.length + 1,
      title: formData.get("title"),
      type: formData.get("docType"),
      note: formData.get("note"),
      uploader: "You",
      role: "Student",
      status: "Pending",
      date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
      file,
      fileUrl: URL.createObjectURL(file),
    };

    setDocuments((prev) => [...prev, newDoc]); // update state
    setIsUploadOpen(false); // close modal
  };

  return (
    <div className="md:ml-20 lg:ml-64">
      {/* Document list */}
      <StudentDocuments
        documents={documents}
        onSelect={setSelectedDoc}
        onUploadClick={() => setIsUploadOpen(true)} // open upload modal
      />

      {/* Upload Modal */}
      {isUploadOpen && (
        <StudentDocumentModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onUpload={handleUpload}
        />
      )}

      {/* View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg">
            <h2 className="text-xl font-bold mb-4">{selectedDoc.title}</h2>
            <p>
              <strong>Type:</strong> {selectedDoc.type}
            </p>
            <p>
              <strong>Status:</strong> {selectedDoc.status}
            </p>
            <p>
              <strong>Note:</strong> {selectedDoc.note || "-"}
            </p>
            <p>
              <strong>Date:</strong> {selectedDoc.date}
            </p>

            {/* ✅ file preview/download */}
            {selectedDoc.fileUrl && (
              <a
                href={selectedDoc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-blue-600 underline"
              >
                View File
              </a>
            )}

            <button
              onClick={() => setSelectedDoc(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StDocuments;
