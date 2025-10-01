import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAllUsersQuery, useUpdateUserRoleMutation } from "../../../redux/slices/UserApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const UsersDetail = () => {
  const { t } = useTranslation("users");
  const { data: users, isLoading, error, refetch } = useAllUsersQuery();
  const [updateUser] = useUpdateUserRoleMutation();
  const [search, setSearch] = useState("");

  const roles = ["user", "admin", "teacher", "guard", "student"];

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser({ id: userId, role: newRole }).unwrap();
      toast.success(t("users.detail.toast.updateSuccess", { role: t(`users.detail.roles.${newRole}`) }));
      refetch();
    } catch (err) {
      toast.error(t("users.detail.toast.updateError"));
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
              <th className="px-4 py-3 text-center">{t("users.detail.table.actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{t(`users.detail.roles.${user.role}`)}</td>
                <td className="px-4 py-3 text-center">
                  <select
                    defaultValue={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {t(`users.detail.roles.${role}`)}
                      </option>
                    ))}
                  </select>
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
            <p><span className="font-semibold">{t("users.detail.table.name")}:</span> {user.name}</p>
            <p><span className="font-semibold">{t("users.detail.table.email")}:</span> {user.email}</p>
            <p><span className="font-semibold">{t("users.detail.table.role")}:</span> {t(`users.detail.roles.${user.role}`)}</p>
            <div>
              <select
                defaultValue={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {t(`users.detail.roles.${role}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersDetail;
