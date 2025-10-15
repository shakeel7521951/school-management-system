import React from "react";
import { X, Trash2 } from "lucide-react";
import { useDeleteVisitorMutation } from "../../redux/slices/VisitorApi";
import { useTranslation } from "react-i18next";

const VisitorDeleteModal = ({ visitor, onClose }) => {
  const { t } = useTranslation("receptionistDeleteModal");
  const [deleteVisitor, { isLoading }] = useDeleteVisitorMutation();

  const handleDelete = async () => {
    try {
      await deleteVisitor(visitor._id).unwrap();
      onClose();
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <Trash2 className="w-10 h-10 text-red-500 mb-3" />
          <h2 className="text-xl font-semibold text-[#104c80] mb-2">
            {t("visitorDeleteModal.title")}
          </h2>
          <p className="text-gray-600 mb-5">
            {t("visitorDeleteModal.description", { name: visitor.name })}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            {t("visitorDeleteModal.buttons.cancel")}
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            {isLoading ? t("visitorDeleteModal.buttons.deleting") : t("visitorDeleteModal.buttons.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorDeleteModal;
