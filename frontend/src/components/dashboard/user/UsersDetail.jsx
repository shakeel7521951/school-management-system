import React, { useState } from "react";
import { Search, CheckCircle, XCircle } from "lucide-react";
import {
  useAllUsersQuery,
  useUpdateUserRoleMutation, // 👈 single mutation
} from "../../../redux/slices/UserApi";
import { toast } from "react-toastify";

const UsersDetail = () => {
  const { data: users, isLoading ,refetch} = useAllUsersQuery();
  const [updateUser] = useUpdateUserRoleMutation();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Handle all actions with single mutation
  const handleAction = async (userId, action, value) => {
    try {
      if (action === "role") {
        await updateUser({ id: userId, role: value }).unwrap();
        toast.success(`Role updated to ${value}`);
        refetch()
      } else if (action === "verify") {
        await updateUser({ id: userId, verified: value === "true" }).unwrap();
        toast.success(`User ${value === "true" ? "verified" : "unverified"}`);
      } else if (action === "delete") {
        await updateUser({ id: userId, deleted: true }).unwrap();
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  // ✅ Filter users
  const filteredUsers = users?.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="text-center py-10">Loading users...</p>;

  return (
    <div className="p-4 md:p-6">
      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#104c80]">Manage Users</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-3 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow border">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Verification</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers?.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  {user.status ? (
                    <span className="flex items-center text-green-600">
                      <CheckCircle size={14} className="mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <XCircle size={14} className="mr-1" /> Unverified
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <select
                    className="border rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) => {
                      const [action, value] = e.target.value.split("-");
                      handleAction(user._id, action, value);
                      e.target.value = "";
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Manage
                    </option>
                    <option value="role-admin">Make Admin</option>
                    <option value="role-user">Make User</option>
                    <option value="role-student">Make Student</option>
                    <option value="role-guard">Make Guard</option>
                    <option value="verify-true">Verify</option>
                    <option value="verify-false">Unverify</option>
                    <option value="delete-any">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow rounded-lg p-4 border space-y-2"
          >
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
            <p>
              <span className="font-semibold">Verification:</span>{" "}
              {user.verified ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle size={14} className="mr-1" /> Verified
                </span>
              ) : (
                <span className="flex items-center text-red-600">
                  <XCircle size={14} className="mr-1" /> Unverified
                </span>
              )}
            </p>
            <div>
              <select
                className="border rounded-lg px-2 py-1 text-gray-700 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const [action, value] = e.target.value.split("-");
                  handleAction(user._id, action, value);
                  e.target.value = "";
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Manage
                </option>
                <option value="role-admin">Make Admin</option>
                <option value="role-user">Make User</option>
                <option value="role-student">Make Student</option>
                <option value="role-guard">Make Guard</option>
                <option value="verify-true">Verify</option>
                <option value="verify-false">Unverify</option>
                <option value="delete-any">Delete</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersDetail;
