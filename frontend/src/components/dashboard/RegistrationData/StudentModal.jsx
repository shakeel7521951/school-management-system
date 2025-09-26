
const StudentModal = ({ student, onClose }) => {
  if (!student) return null;

  const s = student.data;

  return (
    <div
      className="fixed inset-0 bg-[#104c80]/70 flex items-center justify-center z-50 px-3"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-scroll max-h-[90vh] 
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Title */}
        <h3 className="text-2xl font-bold mb-6 text-[#104c80] border-b pb-3">
          Student Details
        </h3>

        {/* Modal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed">
          <div>
            <b className="text-[#104c80]">Registration Date:</b>{" "}
            {s?.createdAt ? new Date(s.createdAt).toLocaleDateString("en-GB") : "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Child’s Name:</b> {s?.child_name}
          </div>
          <div>
            <b className="text-[#104c80]">Age:</b> {s?.age}
          </div>
          <div>
            <b className="text-[#104c80]">Nationality:</b> {s?.nationality}
          </div>
          <div>
            <b className="text-[#104c80]">Date of Birth:</b> {s?.dob || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Home Phone:</b> {s?.home_phone || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Mobile:</b> {s?.mother_mobile || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Mobile:</b> {s?.father_mobile || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Personal ID Number:</b> {s?.id_number}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Name:</b> {s?.father_name}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Name:</b> {s?.mother_name}
          </div>
          <div>
            <b className="text-[#104c80]">Father’s Occupation:</b> {s?.father_job || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Mother’s Occupation:</b> {s?.mother_job || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Previous School:</b> {s?.previous_school || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Medical Condition:</b> {s?.medical_condition || "None"}
          </div>
          <div>
            <b className="text-[#104c80]">Medical Details:</b> {s?.medical_details || "N/A"}
          </div>
          <div>
            <b className="text-[#104c80]">Declarer Name:</b> {s?.declarer_name}
          </div>
          <div>
            <b className="text-[#104c80]">Signature:</b> {s?.signature || "N/A"}
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
