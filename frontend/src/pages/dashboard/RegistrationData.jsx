import { useState } from "react";
import StudentModal from "../../components/dashboard/RegistrationData/StudentModal";
import {
  useGetRegistrationsQuery,
  useGetRegistrationByIdQuery,
  useUpdateRegistrationStatusMutation,
  useDeleteRegistrationMutation,
} from "../../redux/slices/RegistrationApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const RegistrationData = () => {
  const { t } = useTranslation("adminRegistrationData");

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
    return <p className="text-center text-gray-600">{t("registrationData.messages.loading")}</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">{t("registrationData.messages.error")}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:ml-64">
      <h2 className="text-3xl font-bold text-[#104c80] mb-6">
        {t("registrationData.pageTitle")}
      </h2>

      {/* Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#104c80] text-white">
            <tr>
              <th className="py-3 px-4 text-nowrap">{t("registrationData.table.headers.registrationDate")}</th>
              <th className="py-3 px-4">{t("registrationData.table.headers.name")}</th>
              <th className="py-3 px-4">{t("registrationData.table.headers.age")}</th>
              <th className="py-3 px-4">{t("registrationData.table.headers.nationality")}</th>
              <th className="py-3 px-4">{t("registrationData.table.headers.father")}</th>
              <th className="py-3 px-4">{t("registrationData.table.headers.mother")}</th>
              <th className="py-3 px-4 text-nowrap">{t("registrationData.table.headers.personalId")}</th>
              <th className="py-3 px-4 text-nowrap">{t("registrationData.table.headers.status")}</th>
              <th className="py-3 px-4 text-center">{t("registrationData.table.headers.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, idx) => (
              <tr
                key={reg._id}
                className={`border-b ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}
              >
                <td className="py-3 px-4 text-nowrap">
                  {new Date(reg.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="py-3 px-4 font-semibold text-[#104c80] text-nowrap">{reg.child_name}</td>
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
                        toast.success(t("registrationData.messages.statusUpdateSuccess"));
                      } catch (err) {
                        toast.error(t("registrationData.messages.statusUpdateError"));
                      }
                    }}
                    className={`px-2 py-1 rounded-md text-sm font-medium border focus:outline-none
                      ${reg.status === "approved" ? "bg-green-100 text-green-700" : ""}
                      ${reg.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${reg.status === "rejected" ? "bg-red-100 text-red-700" : ""}`}
                  >
                    <option value="pending">{t("registrationData.table.statusOptions.pending")}</option>
                    <option value="approved">{t("registrationData.table.statusOptions.approved")}</option>
                    <option value="rejected">{t("registrationData.table.statusOptions.rejected")}</option>
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
                    {t("registrationData.table.buttons.view")}
                  </button>
                  <button
                    onClick={() => deleteRegistration(reg._id)}
                    className="bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    {t("registrationData.table.buttons.delete")}
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
