import React from "react";

const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-[#104c80]/70 flex items-center justify-center z-50 px-3">
      <div
        className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-scroll max-h-[90vh] 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      >
        {/* Modal Title */}
        <h3 className="text-2xl font-bold mb-6 text-[#104c80] border-b pb-3">
          Student Details
        </h3>

        {/* Modal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div>
            <b className="text-[#104c80]">Registration Date:</b>{" "}
            {student.registration_date}
          </div>
          <div>
            <b className="text-[#104c80]">Child’s Name:</b>{" "}
            {student.child_name_en}
          </div>
          <div>
            <b className="text-[#104c80]">Age:</b> {student.age}
          </div>
          <div>
            <b className="text-[#104c80]">Nationality:</b> {student.nationality}
          </div>
          <div>
            <b className="text-[#104c80]">Date of Birth:</b> {student.dob}
          </div>
          <div>
            <b className="text-[#104c80]">Home Phone:</b> {student.home_phone}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Mobile:</b>{" "}
            {student.mother_mobile}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Mobile:</b>{" "}
            {student.father_mobile}
          </div>
          <div>
            <b className="text-[#104c80]">Personal ID Number:</b>{" "}
            {student.id_number}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Name:</b>{" "}
            {student.father_name}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Name:</b>{" "}
            {student.mother_name}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Occupation:</b>{" "}
            {student.father_job}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Occupation:</b>{" "}
            {student.mother_job}
          </div>
          <div>
            <b className="text-[#104c80]">Previous School:</b>{" "}
            {student.previous_school}
          </div>
          <div>
            <b className="text-[#104c80]">Medical Condition:</b>{" "}
            {student.medical_condition}
          </div>
          <div>
            <b className="text-[#104c80]">Medical Details:</b>{" "}
            {student.medical_details || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Declarer Name:</b>{" "}
            {student.declarer_name}
          </div>
          <div>
            <b className="text-[#104c80]">Signature:</b> {student.signature}
          </div>
        </div>

        {/* Modal Action */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#104c80] hover:bg-blue-900 text-white px-6 py-2 rounded-md transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
