import React, { useState } from "react";
import { Search } from "lucide-react";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  useAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteOneUserMutation,
} from "../../../redux/slices/UserApi";
import { useGetDepartmentsQuery } from "../../../redux/slices/DepartmentApi";

const UsersDetail = () => {
  const { t } = useTranslation("users");
  const { data: users, isLoading, error, refetch } = useAllUsersQuery();
  const [updateUser] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteOneUserMutation();
  const { data, isLoading: deptLoading } = useGetDepartmentsQuery();
  const departments = data?.departments;
  const [search, setSearch] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null); // ✅ to store user to delete
  const [showModal, setShowModal] = useState(false); // ✅ modal toggle

  const roles = ["user", "admin", "teacher", "guard", "student", "manager", "reception"];

  // ✅ Update Role or Department
  const handleUserUpdate = async (userId, field, newValue) => {
    try {
      await updateUser({ id: userId, [field]: newValue }).unwrap();
      toast.success(
        field === "role"
          ? t("users.detail.toast.updateSuccess", { role: t(`users.detail.roles.${newValue}`) })
          : "Department updated successfully!"
      );
      refetch();
    } catch (err) {
      toast.error(t("users.detail.toast.updateError"));
      console.error(err);
    }
  };

  // ✅ Handle Delete Click - open modal
  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  // ✅ Confirm Delete
  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success("User deleted successfully!");
      setShowModal(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete user!");
      console.error(err);
    }
  };

  const filteredUsers =
    users?.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

  if (isLoading) return <p className="text-center py-6">{t("users.detail.loading")}</p>;
  if (error) return <p className="text-center text-red-600 py-6">{t("users.detail.error")}</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-[#104c80]">{t("users.detail.pageTitle")}</h2>
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder={t("users.detail.searchPlaceholder")}
            className="pl-9 pr-3 py-2 border rounded-lg w-full text-sm focus:ring-2 focus:ring-[#104c80] focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">{t("users.detail.table.name")}</th>
              <th className="px-4 py-3 text-left">{t("users.detail.table.email")}</th>
              <th className="px-4 py-3 text-left">{t("users.detail.table.role")}</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-center">{t("users.detail.table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleUserUpdate(user._id, "role", e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {t(`users.detail.roles.${role}`)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    defaultValue={user.department?._id || ""}
                    onChange={(e) => handleUserUpdate(user._id, "department", e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-full"
                    disabled={deptLoading}
                  >
                    <option value="">
                      {deptLoading ? "Loading..." : "Select Department"}
                    </option>
                    {departments?.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => openDeleteModal(user._id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete user"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div key={user._id} className="border rounded-lg p-4 shadow-sm bg-white space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[#104c80]">{user.name}</p>
              <button
                onClick={() => openDeleteModal(user._id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
            <p>
              <span className="font-semibold">{t("users.detail.table.email")}:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">{t("users.detail.table.role")}:</span>{" "}
              {t(`users.detail.roles.${user.role}`)}
            </p>
            <div>
              <label className="font-semibold">Role: </label>
              <select
                defaultValue={user.role}
                onChange={(e) => handleUserUpdate(user._id, "role", e.target.value)}
                className="border rounded px-2 py-1 text-sm w-full"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {t(`users.detail.roles.${role}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-semibold">Department: </label>
              <select
                defaultValue={user.department?._id || ""}
                onChange={(e) => handleUserUpdate(user._id, "department", e.target.value)}
                className="border rounded px-2 py-1 text-sm w-full"
                disabled={deptLoading}
              >
                <option value="">
                  {deptLoading ? "Loading..." : "Select Department"}
                </option>
                {departments?.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirm Deletion</h3>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDetail;
