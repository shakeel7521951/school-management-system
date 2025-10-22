import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import {
    useAllSubmittedFormsQuery,
    useUpdateSubmissionStatusMutation,
} from "../../redux/slices/SubmittedFormsApi";
import PlanningDocumentsTable from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningDocumentsTable";
import PlanningDocumentModal from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningDocumentModal";
import PlanningViewDocumentModal from "../../components/PlanningDepartDashboard/UploadedDocuments/PlanningViewDocumentModal";

const PlanningUploadedDocument = () => {
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
                title: item.formId?.title || "Untitled",
                type: "Form Submission",
                date: item.submittedAt,
                status: item.status || "Pending",
                formData: item.formData || {},
                formId: item.formId || null,
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
        const classes = {
            Pending: "text-yellow-600 bg-yellow-50",
            Resolved: "text-green-600 bg-green-50",
            Rejected: "text-red-600 bg-red-50",
            default: "text-gray-600 bg-gray-50",
        };
        return classes[status] || classes.default;
    };

    const tableColumns = [
        { key: "title", label: "Document Title" },
        { key: "type", label: "Type" },
        { key: "date", label: "Submission Date" },
        { key: "status", label: "Status" },
        { key: "actions", label: "Actions" },
    ];

    return (
        <div className="lg:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <h2 className="text-xl md:text-2xl font-bold text-[#104c80] flex items-center gap-2">
                        <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        Uploaded Documents
                    </h2>
                </div>

                {isLoading ? (
                    <div className="text-center py-12 text-gray-500">Loading documents...</div>
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

                {uploads.length === 0 && !isLoading && (
                    <div className="text-center py-12 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                        <p>No documents uploaded yet.</p>
                    </div>
                )}
            </div>

            {showViewModal && selectedDoc && (
                <PlanningViewDocumentModal
                    selectedDoc={selectedDoc}
                    onClose={() => setShowViewModal(false)}
                    getStatusClass={getStatusClass}
                />
            )}

            {showRejectModal && selectedDoc && (
                <PlanningDocumentModal
                    selectedDoc={selectedDoc}
                    rejectNote={rejectNote}
                    setRejectNote={setRejectNote}
                    placeholderNote="Enter reason for rejection..."
                    onClose={() => {
                        setRejectNote("");
                        setSelectedDoc(null);
                        setShowRejectModal(false);
                    }}
                    onConfirm={handleRejectSubmit}
                    title="Reject Document"
                />
            )}
        </div>
    );
};

export default PlanningUploadedDocument;
