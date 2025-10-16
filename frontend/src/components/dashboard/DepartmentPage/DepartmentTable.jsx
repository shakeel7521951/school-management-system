// src/pages/admin/Department/DepartmentTable.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DepartmentTable = ({
  departments,
  setSelectedDept,
  setShowAddModal,
  setShowViewModal,
  setShowDeleteModal,
  setForm,
}) => {
  const { t } = useTranslation("departmentTable");

  return (
    <>
      {/* ===== TABLE VIEW (Desktop) ===== */}
      <div className="hidden md:block bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-[#104C80] text-white text-center text-xs uppercase tracking-wider">
            <tr>
              <th className="py-3 px-2">{t("departmentTable.headers.name")}</th>
              {/* <th className="py-3 px-2">{t("departmentTable.headers.totalComplaints")}</th> */}
              {/* <th className="py-3 px-2">{t("departmentTable.headers.pending")}</th> */}
              {/* <th className="py-3 px-2">{t("departmentTable.headers.resolved")}</th> */}
              <th className="py-3 px-2">{t("departmentTable.headers.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <motion.tr
                  key={dept._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-[#104C80]/5 text-center"
                >
                  <td className="py-2 font-medium text-gray-800">{dept.name}</td>
                  {/* <td className="text-gray-700">{dept.totalComplaints}</td> */}
                  {/* <td className="text-yellow-600 font-semibold">{dept.pending}</td> */}
                  {/* <td className="text-green-600 font-semibold">{dept.resolved}</td> */}
                  <td>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedDept(dept);
                          setShowViewModal(true);
                        }}
                        className="text-[#104C80] hover:bg-[#104C80]/10 p-2 rounded-full"
                        title={t("departmentTable.buttons.view")}
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDept(dept);
                          setForm({
                            name: dept.name,
                            description: dept.description,
                          });
                          setShowAddModal(true);
                        }}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                        title={t("departmentTable.buttons.edit")}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDept(dept);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                        title={t("departmentTable.buttons.delete")}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
                  {t("departmentTable.noDepartments.title")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== CARD VIEW (Mobile) ===== */}
      <div className="grid md:hidden gap-4">
        {departments.length > 0 ? (
          departments.map((dept, index) => (
            <motion.div
              key={dept._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white shadow-md rounded-2xl p-5 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-[#104C80] mb-2">
                {dept.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {dept.description || t("departmentTable.mobile.noDescription")}
              </p>
              {/* <div className="grid grid-cols-3 text-center mb-4">
                <div>
                  <p className="text-gray-500 text-xs">{t("departmentTable.mobile.total")}</p>
                  <p className="font-semibold text-gray-800">
                    {dept.totalComplaints}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{t("departmentTable.mobile.pending")}</p>
                  <p className="font-semibold text-yellow-600">{dept.pending}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">{t("departmentTable.mobile.resolved")}</p>
                  <p className="font-semibold text-green-600">{dept.resolved}</p>
                </div>
              </div> */}

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedDept(dept);
                    setShowViewModal(true);
                  }}
                  className="text-[#104C80] hover:bg-[#104C80]/10 p-2 rounded-full"
                  title={t("departmentTable.buttons.view")}
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => {
                    setSelectedDept(dept);
                    setForm({
                      name: dept.name,
                      description: dept.description,
                    });
                    setShowAddModal(true);
                  }}
                  className="text-green-600 hover:bg-green-50 p-2 rounded-full"
                  title={t("departmentTable.buttons.edit")}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedDept(dept);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                  title={t("departmentTable.buttons.delete")}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-400">
            <FaExclamationTriangle className="mx-auto text-2xl mb-2" />
            {t("departmentTable.noDepartments.title")}
          </div>
        )}
      </div>
    </>
  );
};

export default DepartmentTable;
