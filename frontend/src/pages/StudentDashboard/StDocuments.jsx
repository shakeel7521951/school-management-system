import React, { useState } from "react";
import StudentDocuments from "../../components/Studentdashboard/STdocuments/StudentDocuments";
import StudentDocumentModal from "../../components/Studentdashboard/STdocuments/StudentDocumentModal";

const StDocuments = () => {
  // ✅ Admin requested / student uploaded docs
  const [documents] = useState([
     {
      id: 1,
      title: "ID Card",
      uploader: "You",
      role: "Student",
      type: "PDF",
      date: "2025-09-15",
      status: "Pending", // Pending / Approved / Rejected
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

  // ✅ Modal state
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="md:ml-20 lg:ml-64">
      {/* Student Documents list */}
      <StudentDocuments documents={documents} onSelect={setSelectedDoc} />

      {/* Modal for viewing one doc */}
      {selectedDoc && (
        <StudentDocumentModal
          selectedDoc={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}
    </div>
  );
};

export default StDocuments;
