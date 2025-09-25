import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import VisitorViewModal from "../../components/dashboard/visitorTable/VisitorViewModal";
import {
  useGetVisitorsQuery,
  useUpdateVisitorStatusMutation,
} from "../../redux/slices/VisitorApi";

const VisitorTable = () => {
  const { data: visitors = [], isLoading } = useGetVisitorsQuery();
  const [updateVisitorStatus] = useUpdateVisitorStatusMutation();

  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateVisitorStatus({ id, status }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const openModal = (visitor) => setSelectedVisitor(visitor);
  const closeModal = () => setSelectedVisitor(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#104c80]">
        Loading visitors...
      </div>
    );
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-[#eef3f9] to-[#dae4f2] p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <h1 className="text-2xl md:mt-10 lg:mt-5 sm:text-3xl font-bold text-[#104c80] text-center mb-6 lg:mb-8">
        Visitor Management
      </h1>

      {/* Visitors Table */}
      <div className="max-w-7xl md:mt-16 mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#104c80] px-4 sm:px-6 py-3">
          <h2 className="text-white font-semibold text-base sm:text-lg">
            Checked-in Visitors
          </h2>
        </div>

        {/* Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-slate-100 text-[#104c80] uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-2 text-center">#</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Badge</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">Host</th>
                <th className="px-3 py-2">Check-in Time</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
                <tr
                  key={v._id}
                  className={`border-t ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100/60`}
                >
                  <td className="px-3 py-2 text-center">{i + 1}</td>
                  <td className="px-3 py-2 text-nowrap">{v.name}</td>
                  <td className="px-3 py-2 text-nowrap">{v.governmentId}</td>
                  <td className="px-3 py-2 text-nowrap">{v.reason}</td>
                  <td className="px-3 py-2 text-nowrap">{v.hostEmail}</td>
                  <td className="px-3 py-2 text-nowrap">
                    {new Date(v.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        v.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : v.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => openModal(v)}
                      className="px-3 py-1 text-xs rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(v._id, "approved")}
                      className="px-3 py-1 text-xs rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                    >
                      <CheckCircle size={14} title="Approved" />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(v._id, "rejected")}
                      className="px-3 py-1 text-xs rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <XCircle size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
