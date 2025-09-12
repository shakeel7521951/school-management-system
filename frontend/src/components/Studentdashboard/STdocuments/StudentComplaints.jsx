import React, { useState } from "react";
import {
  AlertCircle,
  Bell,
  FileText,
  Plus,
  AlertTriangle,
  Megaphone,
  Calendar,
  Trophy,
  BookOpen,
} from "lucide-react";

const StDashboardHome = () => {
  const studentName = "John Doe"; // Replace dynamically later

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleComplaintSubmit = () => {
    if (!title || !description || !category || !severity) {
      alert("Please fill in all fields!");
      return;
    }

    const newComplaint = {
      id: complaints.length + 1,
      title,
      description,
      category,
      severity,
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    setComplaints([...complaints, newComplaint]);
    setTitle("");
    setDescription("");
    setCategory("");
    setSeverity("");
    closeModal();
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#14528B] via-[#1a6bb6] to-[#14528B] text-white rounded-xl p-6 sm:p-8 shadow-lg mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          Welcome, {studentName} 👋
        </h1>
        <p className="mt-2 text-base sm:text-lg text-gray-100">
          Here’s your overview. Submit complaints, check announcements, and stay updated.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Documents</h2>
          </div>
          <p className="text-2xl font-bold mt-2">12</p>
          <p className="text-gray-500 text-sm sm:text-base">Uploaded by you</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Complaints</h2>
          </div>
          <p className="text-2xl font-bold mt-2">{complaints.length}</p>
          <p className="text-gray-500 text-sm sm:text-base">Submitted by you</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-3">
            <Bell className="text-yellow-600" size={28} />
            <h2 className="text-2xl text-[#14528C] font-bold">Announcements</h2>
          </div>
          <p className="text-2xl font-bold mt-2">5</p>
          <p className="text-gray-500 text-sm sm:text-base">Unread notices</p>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl text-[#14528C] font-bold mb-4 flex items-center gap-2">
          <Megaphone className="text-[#14528C]" size={24} /> Recent Announcements
        </h2>
        <ul className="space-y-3">
          <li className="border-b pb-2 flex items-center gap-2">
            <Calendar className="text-blue-500" size={18} />
            <div>
              <p className="font-semibold">Parent-Teacher Meeting on Friday</p>
              <p className="text-gray-600 text-sm">Sep 15, 2025</p>
            </div>
          </li>
          <li className="border-b pb-2 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={18} />
            <div>
              <p className="font-semibold">Sports Week starts next month</p>
              <p className="text-gray-600 text-sm">Sep 20, 2025</p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <BookOpen className="text-green-500" size={18} />
            <div>
              <p className="font-semibold">New Library Books Available</p>
              <p className="text-gray-600 text-sm">Sep 10, 2025</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Complaint Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={openModal}
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
        {complaints.length === 0 ? (
          <p className="text-gray-500">No complaints submitted yet.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100">
                {["ID", "Title", "Category", "Severity", "Description", "Status", "Date"].map(
                  (heading) => (
                    <th key={heading} className="border border-gray-300 p-2 whitespace-nowrap">
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{comp.id}</td>
                  <td className="border border-gray-300 p-2">{comp.title}</td>
                  <td className="border border-gray-300 p-2">{comp.category}</td>
                  <td className="border border-gray-300 p-2">{comp.severity}</td>
                  <td className="border border-gray-300 p-2">{comp.description}</td>
                  <td className="border border-gray-300 p-2">
                    <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                      {comp.status}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">{comp.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-lg shadow-lg relative">
            <h2 className="text-xl sm:text-2xl text-[#14528B] font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} /> Submit a Complaint
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm sm:text-base font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="Complaint Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm sm:text-base font-semibold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1"
                >
                  <option value="">Select Category</option>
                  <option>Bullying</option>
                  <option>Staff</option>
                  <option>Facilities</option>
                  <option>Transportation</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm sm:text-base font-semibold">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1"
                >
                  <option value="">Select Severity</option>
                  <option>Simple Note</option>
                  <option>Follow-up</option>
                  <option>Urgent</option>
                </select>
              </div>

              <div>
                <label className="text-sm sm:text-base font-semibold">Message</label>
                <textarea
                  placeholder="Describe your complaint..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-full mt-1"
                  rows="3"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleComplaintSubmit}
                  className="flex-1 inline-flex items-center justify-center gap-2 text-white bg-gradient-to-l from-[#14528B] via-[#68f5ba] to-[#14528B] font-semibold px-4 py-2 rounded-lg hover:scale-105 transition-transform"
                >
                  <AlertTriangle size={18} /> Submit
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StDashboardHome;
