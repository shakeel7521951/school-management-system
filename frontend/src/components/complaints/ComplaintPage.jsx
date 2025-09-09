import { useState } from "react";

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    complaintType: "",
    details: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Complaint Submitted:", formData);
    alert("Your complaint has been submitted!");
    // Here you can integrate API call to submit the complaint
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          School Management System Complaint
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Complaint Type</label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Complaint Type</option>
              <option value="technical">Technical Issue</option>
              <option value="academic">Academic Record Issue</option>
              <option value="administrative">Administrative Issue</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Complaint Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Attach File (Optional)</label>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Complaint
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Track Your Complaint</h2>
          <input
            type="text"
            placeholder="Enter Complaint ID"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <button className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition">
            Track Status
          </button>
        </div>
      </div>
    </div>
  );
}
