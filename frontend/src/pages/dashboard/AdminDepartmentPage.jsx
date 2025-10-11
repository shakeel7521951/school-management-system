import React, { useState } from "react";
import { FaBuilding, FaPlus } from "react-icons/fa";
import DepartmentTable from "../../components/dashboard/DepartmentPage/DepartmentTable";
import DepartmentModals from "../../components/dashboard/DepartmentPage/DepartmentModals";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "../../redux/slices/DepartmentApi";
import { useTranslation } from "react-i18next";

const AdminDepartmentPage = () => {
  const { t } = useTranslation("adminDepartmentPage");

  // Fetch departments
  const { data, isLoading, refetch } = useGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const departments = data?.departments || [];

  // States
  const [selectedDept, setSelectedDept] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  // ===== HANDLERS =====
  const handleSave = async () => {
    try {
      if (selectedDept) {
        await updateDepartment({ id: selectedDept._id, ...form }).unwrap();
      } else {
        await createDepartment(form).unwrap();
      }
      refetch();
      setForm({ name: "", description: "" });
      setSelectedDept(null);
      setShowAddModal(false);
    } catch (error) {
      console.error(t("departmentPage.modals.alerts.saveError"), error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id).unwrap();
      refetch();
      setShowDeleteModal(false);
      setSelectedDept(null);
    } catch (error) {
      console.error(t("departmentPage.modals.alerts.deleteError"), error);
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-[#104C80] font-semibold">
        {t("departmentPage.loading")}
      </div>
    );

  return (
    <div className="lg:ml-64 p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-5 rounded-2xl shadow-md border border-gray-200 gap-3">
        <h1 className="text-2xl font-bold text-[#104C80] flex items-center gap-2">
          <FaBuilding className="text-[#104C80]" /> {t("departmentPage.title")}
        </h1>
        <button
          onClick={() => {
            setShowAddModal(true);
            setSelectedDept(null);
          }}
          className="bg-[#104C80] text-white px-4 py-2 rounded-lg hover:bg-[#0d3c68] transition flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <FaPlus /> {t("departmentPage.addButton")}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#104C80]/10 border-l-4 border-[#104C80] p-5 rounded-2xl shadow-sm">
          <h2 className="text-gray-700 text-sm">
            {t("departmentPage.stats.totalDepartments.label")}
          </h2>
          <p className="text-3xl font-bold text-[#104C80] mt-1">
            {departments.length}
          </p>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-2xl shadow-sm">
          <h2 className="text-gray-700 text-sm">
            {t("departmentPage.stats.pendingComplaints.label")}
          </h2>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            {departments.reduce((sum, d) => sum + (d.pending || 0), 0)}
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-2xl shadow-sm">
          <h2 className="text-gray-700 text-sm">
            {t("departmentPage.stats.resolvedComplaints.label")}
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {departments.reduce((sum, d) => sum + (d.resolved || 0), 0)}
          </p>
        </div>
      </div>

      {/* Department Table */}
      <DepartmentTable
        departments={departments}
        setSelectedDept={setSelectedDept}
        setShowAddModal={setShowAddModal}
        setShowViewModal={setShowViewModal}
        setShowDeleteModal={setShowDeleteModal}
        setForm={setForm}
      />

      {/* Modals */}
      <DepartmentModals
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        showViewModal={showViewModal}
        setShowViewModal={setShowViewModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        form={form}
        setForm={setForm}
        handleSave={handleSave}
        handleDelete={handleDelete}
        selectedDept={selectedDept}
      />
    </div>
  );
};

export default AdminDepartmentPage;
