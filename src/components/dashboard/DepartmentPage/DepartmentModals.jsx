import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ======================= ADD / EDIT MODAL =======================
function AddEditModal({ form, setForm, handleSave, setShowAddModal, selectedDept }) {
  const { t } = useTranslation("departmentModals");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-bold text-[#104C80] mb-4">
          {selectedDept ? t("departmentModals.addEdit.editTitle") : t("departmentModals.addEdit.addTitle")}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("departmentModals.addEdit.fields.name.label")}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("departmentModals.addEdit.fields.name.placeholder")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#104C80]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("departmentModals.addEdit.fields.description.label")}
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t("departmentModals.addEdit.fields.description.placeholder")}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#104C80]"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowAddModal(false);
                setForm({ name: "", description: "" });
              }}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              {t("departmentModals.addEdit.buttons.cancel")}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#104C80] text-white hover:bg-[#0c3b66]"
            >
              {selectedDept ? t("departmentModals.addEdit.buttons.update") : t("departmentModals.addEdit.buttons.add")}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ======================= VIEW MODAL =======================
function ViewModal({ selectedDept, setShowViewModal }) {
  const { t } = useTranslation("departmentModals");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-xl font-bold text-[#104C80] mb-4">
          {t("departmentModals.view.title")}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">{t("departmentModals.view.fields.name")}:</span>{" "}
            {selectedDept?.name}
          </p>
          <p>
            <span className="font-semibold">{t("departmentModals.view.fields.description")}:</span>{" "}
            {selectedDept?.description || t("departmentModals.view.fields.noDescription")}
          </p>
          <p>
            <span className="font-semibold">{t("departmentModals.view.fields.totalComplaints")}:</span>{" "}
            {selectedDept?.totalComplaints ?? 0}
          </p>
          <p>
            <span className="font-semibold">{t("departmentModals.view.fields.pending")}:</span>{" "}
            {selectedDept?.pending ?? 0}
          </p>
          <p>
            <span className="font-semibold">{t("departmentModals.view.fields.resolved")}:</span>{" "}
            {selectedDept?.resolved ?? 0}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setShowViewModal(false)}
            className="px-4 py-2 rounded-lg bg-[#104C80] text-white hover:bg-[#0c3b66]"
          >
            {t("departmentModals.view.buttons.close")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ======================= DELETE MODAL =======================
function DeleteModal({ selectedDept, setShowDeleteModal, handleDelete }) {
  const { t } = useTranslation("departmentModals");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 text-center"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {t("departmentModals.delete.title")}
        </h2>
        <p className="text-gray-600 mb-6">
          {t("departmentModals.delete.message", { department: selectedDept?.name })}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
          >
            {t("departmentModals.delete.buttons.cancel")}
          </button>
          <button
            onClick={() => handleDelete(selectedDept?._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {t("departmentModals.delete.buttons.delete")}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ======================= MAIN COMPONENT =======================
export default function DepartmentModals({
  showAddModal,
  setShowAddModal,
  showViewModal,
  setShowViewModal,
  showDeleteModal,
  setShowDeleteModal,
  form,
  setForm,
  handleSave,
  handleDelete,
  selectedDept,
}) {
  return (
    <>
      {showAddModal && (
        <AddEditModal
          form={form}
          setForm={setForm}
          handleSave={handleSave}
          setShowAddModal={setShowAddModal}
          selectedDept={selectedDept}
        />
      )}

      {showViewModal && (
        <ViewModal
          selectedDept={selectedDept}
          setShowViewModal={setShowViewModal}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          selectedDept={selectedDept}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
}
