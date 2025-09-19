import { useState } from "react";
import { AlertCircle, Bell, FileText, Plus } from "lucide-react";
import StudentComplaintModal from "./StudentComplaintModal";
import {
  useGetAllStComplaintsQuery,
} from "../../../redux/slices/StComplaintApi";

const StudentComplaints = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // RTK Query hooks
  const { data: complaints = [], isLoading, isError } = useGetAllStComplaintsQuery();

  const handleAddComplaint = async (newComplaint) => {
    try {
      await createComplaint(newComplaint).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to submit complaint:", error);
    }
  };

  return (
    <div className="p-8 sm:p-6 bg-[#F0F6FD] min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-extrabold text-[#14528B] flex items-center gap-3">
          Complaints
        </h1>
        <p className="text-gray-600 mt-2">
          Submit and track your complaints or concerns with the administration easily.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 mt-5">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Complaints</h2>
          </div>
          <p className="text-2xl font-bold mt-2">{complaints.length}</p>
          <p className="text-gray-500 text-sm sm:text-base">Submitted by you</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Pending</h2>
          </div>
          <p className="text-2xl font-bold mt-2">
            {complaints?.reduce((sum, item) =>
              item.status?.toLowerCase() === "pending" ? sum + 1 : sum, 0
            )}
          </p>
          <p className="text-gray-500 text-sm sm:text-base">Waiting for approval</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Rejected</h2>
          </div>
          <p className="text-2xl font-bold mt-2">{complaints?.reduce((sum, item) => item.status?.toLowerCase() === 'rejected' ? sum + 1 : sum, 0)}</p>
          <p className="text-gray-500 text-sm sm:text-base">Rejected by administration</p>
        </div>
      </div>

      {/* Complaint Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-b from-[#F97316] to-[#EA580C] text-white px-5 py-3 rounded-xl shadow-lg font-bold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Plus size={18} /> Submit Complaint
        </button>
      </div>

      {/* Complaints Table */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg overflow-x-auto">
        <h2 className="text-lg sm:text-xl lg:text-2xl text-[#14528C] font-bold mb-4 flex items-center gap-2">
          <FileText size={20} /> Your Complaints
        </h2>

        {isLoading ? (
          <p className="text-gray-500">Loading complaints...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to fetch complaints.</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">No complaints submitted yet.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                {[
                  "Name",
                  "Class",
                  "Age",
                  "Date",
                  "Type",
                  "Severity",
                  "Impact",
                  "Details",
                  "Expected Action",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border border-gray-300 p-2 whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr key={comp._id} className="hover:bg-gray-50 text-center">
                  <td className="border border-gray-300 p-2">{comp.name}</td>
                  <td className="border border-gray-300 p-2">{comp.studentClass}</td>
                  <td className="border border-gray-300 p-2">{comp.age}</td>
                  <td className="border border-gray-300 p-2">
                    {comp.date ? new Date(comp.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="border border-gray-300 p-2">{comp.type}</td>
                  <td className="border border-gray-300 p-2">{comp.severity}</td>
                  <td className="border border-gray-300 p-2">{comp.impact}</td>
                  <td className="border border-gray-300 p-2">{comp.details}</td>
                  <td className="border border-gray-300 p-2">{comp.action}</td>
                  <td className="border border-gray-300 p-2">{comp.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Complaint Modal */}
      <StudentComplaintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComplaint}
      />
    </div>
  );
};

export default StudentComplaints;
