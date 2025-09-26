import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import AdminDocumentsTable from "../../../components/dashboard/UploadedDocuments/AdminDocumentsTable";
import RejectDocumentModal from "../../../components/dashboard/UploadedDocuments/RejectDocumentModal";
import ViewDocumentModal from "../../../components/dashboard/UploadedDocuments/ViewDocumentModal";
import {
  useAllSubmittedFormsQuery,
  useUpdateSubmissionStatusMutation,
} from "../../../redux/slices/SubmittedFormsApi";

const UploadedDocuments = () => {
  const { data: submissions = [], isLoading, refetch } = useAllSubmittedFormsQuery();
  const [updateStatus] = useUpdateSubmissionStatusMutation();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Transform backend data into table format
  const uploads = useMemo(
    () =>
      submissions.map((item) => ({
        id: item._id,
        title: item.formData?.subject || "Untitled",
        uploader: item.formData?.full_name || "Unknown",
        role: item.formData?.class ? `Class ${item.formData.class}` : "N/A",
        type: "Form Submission",
        date: item.submittedAt,
        status: item.status || "Pending",
        note: item.note || "",
        formData: item.formData || {},
        fileUrl: item.fileUrl || null,
        ipAddress: item.ipAddress || null,
        userAgent: item.userAgent || null,
      })),
    [submissions]
  );

  // Approve
  const handleApprove = async (id) => {
    try {
      await updateStatus({ id, status: "Resolved" }).unwrap();
      refetch();
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  // Reject
  const handleRejectSubmit = async () => {
    if (!rejectNote.trim() || !selectedDoc) return;
    try {
      await updateStatus({
        id: selectedDoc.id,
        status: "Rejected",
        note: rejectNote,
      }).unwrap();

      refetch();
      setRejectNote("");
      setSelectedDoc(null);
      setShowRejectModal(false);
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="lg:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#104c80] flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            Uploaded Documents
          </h2>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : (
          <AdminDocumentsTable
            uploads={uploads}
            setSelectedDoc={setSelectedDoc}
            setShowViewModal={setShowViewModal}
            setShowRejectModal={setShowRejectModal}
            handleApprove={handleApprove}
            getStatusClass={getStatusClass}
          />
        )}

        {uploads.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>No documents uploaded yet</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showViewModal && selectedDoc && (
        <ViewDocumentModal
          selectedDoc={selectedDoc} // ← pass the doc directly
          onClose={() => setShowViewModal(false)}
          getStatusClass={getStatusClass}
        />
      )}

      {showRejectModal && selectedDoc && (
        <RejectDocumentModal
          selectedDoc={selectedDoc} // ← pass the doc directly
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
