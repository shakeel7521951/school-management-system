import { useState } from "react";
import { Eye, Plus, X } from "lucide-react";
import VisitorViewModal from "../../components/securityDashboard/VisitorViewModal";
import VisitorForm from "../../components/securityDashboard/VisitorForm";
import {
  useGetVisitorsQuery,
} from "../../redux/slices/VisitorApi"; 

const VisitorPage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: visitors = [], isLoading, isError } = useGetVisitorsQuery();

  const filteredVisitors =
    filter === "All" ? visitors : visitors.filter((v) => v.status === filter);

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-[#f5f9ff] to-[#e8f0fa] p-4 sm:p-6 lg:p-8">
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#104c80]">
          Visitor Management
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#104c80] text-white font-medium shadow-md hover:shadow-lg transition"
        >
          <Plus size={18} /> Add Visitor
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-6">
        {["All", "approved", "rejected", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === "All" ? "All" : status)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium border transition ${
              filter === status
                ? "bg-[#104c80] text-white border-[#104c80]"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-center text-slate-500">Loading visitors...</p>
        ) : isError ? (
          <p className="p-6 text-center text-red-500">Failed to load visitors</p>
        ) : filteredVisitors.length === 0 ? (
          <p className="p-6 text-center text-slate-500">No visitors found</p>
        ) : (
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-slate-100 text-[#104c80] uppercase text-xs font-semibold">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">Host</th>
                <th className="px-3 py-2">Check-in</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.map((v) => (
                <tr key={v._id} className="border-t hover:bg-slate-50 transition">
                  <td className="px-3 py-2 font-medium">{v.name}</td>
                  <td className="px-3 py-2">{v.governmentId}</td>
                  <td className="px-3 py-2">{v.reason}</td>
                  <td className="px-3 py-2">{v.hostEmail}</td>
                  <td className="px-3 py-2">
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
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => setSelectedVisitor(v)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-xs font-medium"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Modal */}
      {selectedVisitor && (
        <VisitorViewModal
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
        />
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              <X size={20} />
            </button>
            <VisitorForm onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorPage;
