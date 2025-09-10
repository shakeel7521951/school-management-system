import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";


const UsersDetail = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Sir Shakeel", email: "shakeel7521951@gmail.com", role: "Admin", verified: true },
        { id: 1, name: "Sir Shakeel", email: "shakeel7521951@gmail.com", role: "Admin", verified: true },
        { id: 1, name: "Sir Shakeel", email: "shakeel7521951@gmail.com", role: "Admin", verified: true },
        { id: 2, name: "Sara Khan", email: "sara@example.com", role: "Manager", verified: false },
        { id: 2, name: "Sara Khan", email: "sara@example.com", role: "Manager", verified: false },
        { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", role: "Staff", verified: true },
        { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", role: "Staff", verified: true },

    ]);

    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleRoleChange = (id, newRole) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    };

    const handleVerificationChange = (id, status) => {
        setUsers(users.map(u => u.id === id ? { ...u, verified: status } : u));
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Header with Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl font-extrabold text-[#085D2D]">User Management</h1>
                <div className="flex gap-4 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-green-700 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105">
                        <UserPlus size={18} /> Add User
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700">
                            <th className="p-4 border-b">#</th>
                            <th className="p-4 border-b">Name</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Role</th>
                            <th className="p-4 border-b">Verified</th>
                            <th className="p-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <td className="p-4 border-b">{index + 1}</td>
                                    <td className="p-4 border-b">{user.name}</td>
                                    <td className="p-4 border-b">{user.email}</td>
                                    <td className="p-4 border-b text-green-600 font-semibold">{user.role}</td>
                                    <td className="p-4 border-b">
                                        {user.verified ? (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                                Unverified
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 border-b text-center">
                                        <select
                                            className="border rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                            onChange={(e) => {
                                                const [action, value] = e.target.value.split("-");
                                                if (action === "role") handleRoleChange(user.id, value);
                                                if (action === "verify") handleVerificationChange(user.id, value === "true");
                                                if (action === "delete") handleDelete(user.id);
                                                e.target.value = "";
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Manage</option>
                                            <option value="role-Admin">Make Admin</option>
                                            <option value="role-User">Make User</option>


                                        </select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersDetail;
