import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";

const UsersDetail = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Sir Shakeel", email: "shakeel7521951@gmail.com", role: "Admin", verified: true },
        { id: 2, name: "Sara Khan", email: "sara@example.com", role: "User", verified: false },
        { id: 3, name: "Bilal Ahmed", email: "bilal@example.com", role: "Admin", verified: true },
    ]);

    const [search, setSearch] = useState("");

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleRoleChange = (id, newRole) => {
        setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    };

    const handleVerificationChange = (id, status) => {
        setUsers(users.map((u) => (u.id === id ? { ...u, verified: status } : u)));
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="py-6 px-2 sm:px-10">
            {/* Header with Search */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a4480]">
                    User Management
                </h1>
                <div className="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border-2 border-[#1446b3] shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button className="bg-[#1446b3] font-bold hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-transform transform hover:scale-105">
                        <UserPlus size={18} /> Add User
                    </button>
                </div>
            </div>

            {/* Table for md+ screens */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-lg">
                <table className="w-full border-collapse font-serif">
                    <thead>
                        <tr className="bg-[#1a4480] text-left text-white text-lg">
                            <th className="p-4 border-b">#</th>
                            <th className="p-4 border-b">Name</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Role</th>
                            <th className="p-4 border-b">Status</th>
                            <th className="p-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-[#1446b313] transition-colors duration-200"
                                >
                                    <td className="p-4 border-b">{index + 1}</td>
                                    <td className="p-4 border-b">{user.name}</td>
                                    <td className="p-4 border-b">{user.email}</td>
                                    <td className="p-4 border-b text-[#1446b3] font-bold">
                                        {user.role}
                                    </td>
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
                                            className="border rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                            onChange={(e) => {
                                                const [action, value] = e.target.value.split("-");
                                                if (action === "role") handleRoleChange(user.id, value);
                                                if (action === "verify")
                                                    handleVerificationChange(user.id, value === "true");
                                                if (action === "delete") handleDelete(user.id);
                                                e.target.value = "";
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Manage
                                            </option>
                                            <option value="role-Admin">Make Admin</option>
                                            <option value="role-User">Make User</option>
                                            <option value="verify-true">Verify</option>
                                            <option value="verify-false">Unverify</option>
                                            <option value="delete">Delete</option>
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

            {/* Cards for small screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-[#1446b3]">
                                    {user.name}
                                </h3>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${user.verified
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {user.verified ? "Verified" : "Unverified"}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
                            <p className="text-sm text-gray-700 mb-3">
                                <span className="font-bold">Role:</span> {user.role}
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">#{index + 1}</span>
                                <select
                                    className="border rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                                    onChange={(e) => {
                                        const [action, value] = e.target.value.split("-");
                                        if (action === "role") handleRoleChange(user.id, value);
                                        if (action === "verify")
                                            handleVerificationChange(user.id, value === "true");
                                        if (action === "delete") handleDelete(user.id);
                                        e.target.value = "";
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Manage
                                    </option>
                                    <option value="role-Admin">Make Admin</option>
                                    <option value="role-User">Make User</option>
                                    <option value="verify-true">Verify</option>
                                    <option value="verify-false">Unverify</option>
                                    <option value="delete">Delete</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-2">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default UsersDetail;
