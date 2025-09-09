import React from "react";

const ComplaintDashboard = () => {
  // Example data (yaha aap backend ya form submission se data la sakte ho)
  const complaint = {
    fullName: "Ali Ahmed",
    role: "Student",
    studentId: "ST12345",
    grade: "10th",
    complaintType: "Academic",
    description: "Teacher was absent for multiple classes.",
    involvedParties: "Mr. Khan",
    witnesses: "Classmates",
    documents: "", // Agar file ka link ho to yaha dal dena
    contactMethod: "Email",
    contactTime: "Morning",
    consent: true,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Complaint Dashboard
      </h1>

      {/* User Information */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          User Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p>
            <span className="font-medium">Full Name:</span> {complaint.fullName}
          </p>
          <p>
            <span className="font-medium">Role:</span> {complaint.role}
          </p>
          <p>
            <span className="font-medium">Student ID:</span>{" "}
            {complaint.studentId || "N/A"}
          </p>
          <p>
            <span className="font-medium">Grade/Class:</span>{" "}
            {complaint.grade || "N/A"}
          </p>
        </div>
      </section>

      {/* Complaint Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Complaint Details
        </h2>
        <p>
          <span className="font-medium">Complaint Type:</span>{" "}
          {complaint.complaintType}
        </p>
        <p className="mt-2">
          <span className="font-medium">Description:</span>{" "}
          {complaint.description}
        </p>
      </section>

      {/* Reference & Supporting Info */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Reference & Supporting Information
        </h2>
        <p>
          <span className="font-medium">Involved Parties:</span>{" "}
          {complaint.involvedParties || "N/A"}
        </p>
        <p>
          <span className="font-medium">Witnesses:</span>{" "}
          {complaint.witnesses || "N/A"}
        </p>
        <p>
          <span className="font-medium">Supporting Documents:</span>{" "}
          {complaint.documents ? (
            <a
              href={complaint.documents}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              View Document
            </a>
          ) : (
            "N/A"
          )}
        </p>
      </section>

      {/* Contact Preferences */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Contact Preferences
        </h2>
        <p>
          <span className="font-medium">Preferred Method:</span>{" "}
          {complaint.contactMethod}
        </p>
        <p>
          <span className="font-medium">Preferred Time:</span>{" "}
          {complaint.contactTime || "N/A"}
        </p>
      </section>

      {/* Consent */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Consent
        </h2>
        <p>
          {complaint.consent
            ? "✅ User has given consent for processing."
            : "❌ Consent not provided."}
        </p>
      </section>
    </div>
  );
};

export default ComplaintDashboard;
