import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import AdminDocumentsTable from "../../../components/dashboard/UploadedDocuments/AdminDocumentsTable";
import RejectDocumentModal from "../../../components/dashboard/UploadedDocuments/RejectDocumentModal";
import ViewDocumentModal from "../../../components/dashboard/UploadedDocuments/ViewDocumentModal";
import {
  useAllSubmittedFormsQuery,
  useUpdateSubmissionStatusMutation,
} from "../../../redux/slices/SubmittedFormsApi";
import { useTranslation } from "react-i18next";

const UploadedDocuments = () => {
  const { t } = useTranslation("uploadedDocuments");

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
        title: item.formId?.title || "Untitled", // <-- use formId.title here
        type: "Form Submission",
        date: item.submittedAt,
        status: item.status || "Pending",
        formData: item.formData || {},
        formId: item.formId || null, // pass formId to modal
      })),
    [submissions]
  );

  const handleApprove = async (id) => {
    try {
      await updateStatus({ id, status: "Resolved" }).unwrap();
      refetch();
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

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

  const getStatusClass = (status) => {
    const classes = t("statusClasses", { returnObjects: true });
    return classes[status] || classes.default;
  };

  const tableColumns = t("tableColumns", { returnObjects: true });

  return (
    <div className="lg:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#104c80] flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            {t("pageTitle")}
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-500">{t("loading")}</div>
        ) : (
          <AdminDocumentsTable
            uploads={uploads}
            setSelectedDoc={setSelectedDoc}
            setShowViewModal={setShowViewModal}
            setShowRejectModal={setShowRejectModal}
            handleApprove={handleApprove}
            getStatusClass={getStatusClass}
            tableColumns={tableColumns}
          />
        )}

        {uploads.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>{t("emptyMessage")}</p>
          </div>
        )}
      </div>

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
          placeholderNote={t("modals.reject.placeholderNote")}
          onClose={() => {
            setRejectNote("");
            setSelectedDoc(null);
            setShowRejectModal(false);
          }}
          onConfirm={handleRejectSubmit}
          title={t("modals.reject.title")}
        />
      )}
    </div>
  );
};

export default UploadedDocuments;
