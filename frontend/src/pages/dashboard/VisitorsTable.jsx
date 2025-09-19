import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import VisitorViewModal from "../../components/dashboard/visitorTable/VisitorViewModal";

const VisitorTable = () => {
  const [visitors, setVisitors] = useState([
    {
      id: 1,
      name: "Ali Khan",
      badge: "CNIC-12345",
      reason: "Meeting",
      host: "ahmed@company.com",
      time: "2025-09-19 09:30 AM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sara Ahmed",
      badge: "EMP-9087",
      reason: "Interview",
      host: "hr@company.com",
      time: "2025-09-19 10:15 AM",
      status: "Pending",
    },
    {
      id: 3,
      name: "John Doe",
      badge: "DLV-5678",
      reason: "Delivery",
      host: "ops@company.com",
      time: "2025-09-19 11:00 AM",
      status: "Approved",
    },
  ]);

  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const updateStatus = (id, status) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status } : v))
    );
  };

  const openModal = (visitor) => setSelectedVisitor(visitor);
  const closeModal = () => setSelectedVisitor(null);

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-[#eef3f9] to-[#dae4f2] p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <h1 className="text-2xl md:mt-10 lg:mt-5 sm:text-3xl font-bold text-[#104c80] text-center mb-6 lg:mb-8">
        Visitor Management
      </h1>

      {/* Visitors Table / Cards */}
      <div className="max-w-7xl md:mt-16 mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#104c80] px-4 sm:px-6 py-3">
          <h2 className="text-white font-semibold text-base sm:text-lg">
            Checked-in Visitors
          </h2>
        </div>

        {/* Table for md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-slate-100 text-[#104c80] uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-2 text-center whitespace-nowrap">#</th>
                <th className="px-3 py-2 whitespace-nowrap">Name</th>
                <th className="px-3 py-2 whitespace-nowrap">Badge</th>
                <th className="px-3 py-2 whitespace-nowrap">Reason</th>
                <th className="px-3 py-2 whitespace-nowrap">Host</th>
                <th className="px-3 py-2 whitespace-nowrap">Check-in Time</th>
                <th className="px-3 py-2 whitespace-nowrap">Status</th>
                <th className="px-3 py-2 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {visitors.map((v, i) => (
                <tr
                  key={v.id}
                  className={`border-t ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100/60 transition`}
                >
                  <td className="px-3 py-2 text-center font-medium text-slate-600 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="px-3 py-3 text-slate-800 whitespace-nowrap">
                    {v.name}
                  </td>
                  <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                    {v.badge}
                  </td>
                  <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                    {v.reason}
                  </td>
                  <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                    {v.host}
                  </td>
                  <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                    {v.time}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        v.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : v.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center flex flex-col sm:flex-row gap-2 justify-center whitespace-nowrap">
                    <button
                      onClick={() => openModal(v)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-xs font-medium"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      onClick={() => updateStatus(v.id, "Approved")}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition text-xs font-medium"
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => updateStatus(v.id, "Rejected")}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition text-xs font-medium"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Small screens */}
        <div className="md:hidden p-4 space-y-4">
          {visitors.map((v) => (
            <div
              key={v.id}
              className="bg-slate-50 rounded-lg shadow-sm border border-slate-200 p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">{v.name}</h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    v.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : v.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {v.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Badge:</span> {v.badge}
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Reason:</span> {v.reason}
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Host:</span> {v.host}
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-medium">Check-in:</span> {v.time}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => openModal(v)}
                  className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                >
                  <Eye size={14} /> View
                </button>
                <button
                  onClick={() => updateStatus(v.id, "Approved")}
                  className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition"
                >
                  <CheckCircle size={14} /> Approve
                </button>
                <button
                  onClick={() => updateStatus(v.id, "Rejected")}
                  className="flex items-center gap-1 px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  <XCircle size={14} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Modal */}
      {selectedVisitor && (
        <VisitorViewModal visitor={selectedVisitor} onClose={closeModal} />
      )}
    </div>
  );
};

export default VisitorTable;
