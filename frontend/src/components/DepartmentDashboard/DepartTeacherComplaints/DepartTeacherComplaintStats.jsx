import React from "react";

const DepartTeacherComplaintStats = ({ complaints = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Pending Complaints */}
      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-red-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">Pending Complaints</h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter(
            (c) => c.status === "Pending" || c.status === "pending"
          ).length}
        </p>
      </div>

      {/* In Progress Complaints */}
      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-yellow-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">In Progress</h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter(
            (c) => c.status === "In Progress" || c.status === "in progress"
          ).length}
        </p>
      </div>

      {/* Resolved Complaints */}
      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-green-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">Resolved</h3>
        <p className="text-2xl font-bold text-gray-800">
          {complaints.filter(
            (c) => c.status === "Resolved" || c.status === "resolved"
          ).length}
        </p>
      </div>

      {/* Total Complaints */}
      <div className="group bg-white p-5 rounded-2xl shadow-md border-l-4 border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <h3 className="text-gray-500 text-sm font-medium">Total Complaints</h3>
        <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
      </div>
    </div>
  );
};

export default DepartTeacherComplaintStats;
