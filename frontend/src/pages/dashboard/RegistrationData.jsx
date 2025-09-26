import { useState } from "react";
import StudentModal from "../../components/dashboard/RegistrationData/StudentModal";
import {
  useGetRegistrationsQuery,
  useGetRegistrationByIdQuery,
  useUpdateRegistrationStatusMutation,
  useDeleteRegistrationMutation,
} from "../../redux/slices/RegistrationApi";
import { toast } from "react-toastify";

const RegistrationData = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // API Hooks
  const { data, isLoading, isError } = useGetRegistrationsQuery();
  const registrations = data?.data || [];

  const { data: selectedStudent } = useGetRegistrationByIdQuery(selectedId, {
    skip: !selectedId,
  });

  const [updateStatus] = useUpdateRegistrationStatusMutation();
  const [deleteRegistration] = useDeleteRegistrationMutation();

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading registrations...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load registrations.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:ml-64">
      <h2 className="text-3xl font-bold text-[#104c80] mb-6">
        Student Registrations
      </h2>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#104c80] text-white">
            <tr>
              <th className="py-3 px-4 text-nowrap">Registration Date</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Age</th>
              <th className="py-3 px-4">Nationality</th>
              <th className="py-3 px-4">Father</th>
              <th className="py-3 px-4">Mother</th>
              <th className="py-3 px-4 text-nowrap">Personal ID</th>
              <th className="py-3 px-4 text-nowrap">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, idx) => (
              <tr
                key={reg._id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="py-3 px-4 text-nowrap">
                  {new Date(reg.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="py-3 px-4 font-semibold text-[#104c80] text-nowrap">
                  {reg.child_name}
                </td>
                <td className="py-3 px-4 text-nowrap">{reg.age}</td>
                <td className="py-3 px-4 text-nowrap">{reg.nationality}</td>
                <td className="py-3 px-4 text-nowrap">{reg.father_name}</td>
                <td className="py-3 px-4 text-nowrap">{reg.mother_name}</td>
                <td className="py-3 px-4 text-nowrap">{reg.id_number}</td>

                {/* Status Dropdown */}
                <td className="py-3 px-4 text-nowrap">
                  <select
                    value={reg.status}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      try {
                        await updateStatus({ id: reg._id, status: newStatus }).unwrap();
                        toast.success("Status updated successfully!");
                      } catch (err) {
                        toast.error("Failed to update status");
                      }
                    }}
                    className={`px-2 py-1 rounded-md text-sm font-medium border focus:outline-none
                      ${reg.status === "approved" ? "bg-green-100 text-green-700" : ""}
                      ${reg.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${reg.status === "rejected" ? "bg-red-100 text-red-700" : ""}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>

                <td className="py-3 px-4 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedId(reg._id);
                      setOpenModal(true);
                    }}
                    className="bg-[#104c80] hover:bg-blue-900 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteRegistration(reg._id)}
                    className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {openModal && (
        <StudentModal
          student={selectedStudent}
          onClose={() => {
            setOpenModal(false);
            setSelectedId(null);
          }}
        />
      )}
    </div>
  );
};

export default RegistrationData;