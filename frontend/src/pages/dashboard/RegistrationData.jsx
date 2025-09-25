import React, { useState } from "react";
import StudentModal from "../../components/dashboard/RegistrationData/StudentModal";

// Sample mock data (replace with backend API data later)
const registrations = [
  {
    id: 1,
    registration_date: "2025-09-25",
    child_name_en: "Ali Khan",
    age: 7,
    nationality: "Pakistani",
    dob: "2018-01-15",
    home_phone: "042-1234567",
    mother_mobile: "0300-1111111",
    father_mobile: "0300-2222222",
    id_number: "12345-6789012-3",
    father_name: "Ahmed Khan",
    mother_name: "Sara Ahmed",
    father_job: "Engineer",
    mother_job: "Teacher",
    previous_school: "ABC Primary School",
    medical_condition: "No",
    medical_details: "",
    declarer_name: "Ahmed Khan",
    signature: "Ahmed Khan",
  },
];

const RegistrationData = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-6 lg:ml-64">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-[#104c80] mb-6">
        Student Registrations
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#104c80] text-white">
            <tr>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Registration Date</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Name</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Age</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Nationality</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Father Name</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Mother Name</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-left">Personal ID</th>
              <th className="py-3 px-4 md:px-1 lg:px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, idx) => (
              <tr
                key={reg.id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="py-3 px-4">{reg.registration_date}</td>
                <td className="py-3 px-4 font-semibold text-[#104c80]">
                  {reg.child_name_en}
                </td>
                <td className="py-3 px-4">{reg.age}</td>
                <td className="py-3 px-4">{reg.nationality}</td>
                <td className="py-3 px-4">{reg.father_name}</td>
                <td className="py-3 px-4">{reg.mother_name}</td>
                <td className="py-3 px-4">{reg.id_number}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => setSelected(reg)}
                    className="bg-[#104c80] hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-[#104c80] mb-2">
              {reg.child_name_en}
            </h3>
            <p>
              <b className="text-[#104c80]">Registration Date:</b>{" "}
              {reg.registration_date}
            </p>
            <p>
              <b className="text-[#104c80]">Age:</b> {reg.age}
            </p>
            <p>
              <b className="text-[#104c80]">Nationality:</b>{" "}
              {reg.nationality}
            </p>
            <p>
              <b className="text-[#104c80]">Father:</b> {reg.father_name}
            </p>
            <p>
              <b className="text-[#104c80]">Mother:</b> {reg.mother_name}
            </p>
            <p>
              <b className="text-[#104c80]">ID:</b> {reg.id_number}
            </p>

            <div className="mt-3 text-right">
              <button
                onClick={() => setSelected(reg)}
                className="bg-[#104c80] hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm transition"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <StudentModal student={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default RegistrationData;
