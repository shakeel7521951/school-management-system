import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import {
  useAllSubmittedFormsQuery,
  useUpdateSubmissionStatusMutation,
} from "../../redux/slices/SubmittedFormsApi";
import PlanningDocumentsTable from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningDocumentsTable";
import PlanningDocumentModal from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningDocumentModal";
import PlanningViewDocumentModal from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningViewDocumentModal";
import { useTranslation } from "react-i18next";

const PlanningUploadedDocument = () => {
  const { t } = useTranslation("planningUploadedDocuments");
  const { data: submissions = [], isLoading, refetch } =
    useAllSubmittedFormsQuery();
  const [updateStatus] = useUpdateSubmissionStatusMutation();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [rejectNote, setRejectNote] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // ✅ Transform backend data into table format
  const uploads = useMemo(
    () =>
      submissions.map((item) => ({
        id: item._id,
        title: item.formId?.title || "Untitled",
        type: t("planningUploadedDocument.columns.type"),
        date: item.submittedAt,
        status: item.status || t("planningUploadedDocument.statuses.pending"),
        formData: item.formData || {},
        formId: item.formId || null,
      })),
    [submissions, t]
  );

  // ✅ Approve document
  const handleApprove = async (id) => {
    try {
      await updateStatus({ id, status: t("planningUploadedDocument.statuses.resolved") }).unwrap();
      refetch();
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  // ✅ Reject document
  const handleRejectSubmit = async () => {
    if (!rejectNote.trim() || !selectedDoc) return;
    try {
      await updateStatus({
        id: selectedDoc.id,
        status: t("planningUploadedDocument.statuses.rejected"),
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

  // ✅ Status color classes
  const getStatusClass = (status) => {
    const classes = t("planningUploadedDocument.statusColors", { returnObjects: true });
    return (
      classes[status.toLowerCase()] ||
      classes.default ||
      "text-gray-600 bg-gray-50"
    );
  };

  // ✅ Table column headers
  const tableColumns = [
    { key: "title", label: t("planningUploadedDocument.columns.title") },
    { key: "type", label: t("planningUploadedDocument.columns.type") },
    { key: "date", label: t("planningUploadedDocument.columns.date") },
    { key: "status", label: t("planningUploadedDocument.columns.status") },
    { key: "actions", label: t("planningUploadedDocument.columns.actions") },
  ];

  return (
    <div className="lg:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-[#104c80] flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            {t("planningUploadedDocument.pageTitle")}
          </h2>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            {t("planningUploadedDocument.loading")}
          </div>
        ) : (
          <PlanningDocumentsTable
            uploads={uploads}
            setSelectedDoc={setSelectedDoc}
            setShowViewModal={setShowViewModal}
            setShowRejectModal={setShowRejectModal}
            handleApprove={handleApprove}
            getStatusClass={getStatusClass}
            tableColumns={tableColumns}
          />
        )}

        {/* Empty State */}
        {uploads.length === 0 && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p>{t("planningUploadedDocument.noDocuments")}</p>
          </div>
        )}
      </div>

      {/* ✅ View Document Modal */}
      {showViewModal && selectedDoc && (
        <PlanningViewDocumentModal
          selectedDoc={selectedDoc}
          onClose={() => setShowViewModal(false)}
          getStatusClass={getStatusClass}
        />
      )}

      {/* ✅ Reject Document Modal */}
      {showRejectModal && selectedDoc && (
        <PlanningDocumentModal
          selectedDoc={selectedDoc}
          rejectNote={rejectNote}
          setRejectNote={setRejectNote}
          placeholderNote={t("planningUploadedDocument.rejectPlaceholder")}
          onClose={() => {
            setRejectNote("");
            setSelectedDoc(null);
            setShowRejectModal(false);
          }}
          onConfirm={handleRejectSubmit}
          title={t("planningUploadedDocument.rejectTitle")}
        />
      )}
    </div>
  );
};

export default PlanningUploadedDocument;
