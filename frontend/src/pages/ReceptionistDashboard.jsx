import { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
} from "lucide-react";
import {
  useGetVisitorsQuery,
  useUpdateVisitorStatusMutation,
} from "../redux/slices/VisitorApi";
import ReceptionistTable from "../components/ReceptionistDashboard/ReceptionistTable";
import VisitorViewModal from "../components/ReceptionistDashboard/VisitorViewModal";
import VisitorEditModal from "../components/ReceptionistDashboard/VisitorEditModal";
import VisitorDeleteModal from "../components/ReceptionistDashboard/VisitorDeleteModal";



const ReceptionistDashboard = () => {
  const { data: visitors = [], isLoading } = useGetVisitorsQuery();
  const [updateVisitorStatus] = useUpdateVisitorStatusMutation();

  // --- Modal States ---
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, visitor: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, visitor: null });

  // --- Stats Computation ---
  const stats = useMemo(() => {
    const approved = visitors.filter((v) => v.status === "approved").length;
    const rejected = visitors.filter((v) => v.status === "rejected").length;
    const pending = visitors.filter((v) => v.status === "pending").length;
    return { approved, rejected, pending, total: visitors.length };
  }, [visitors]);

  // --- Status Update ---
  const handleStatusUpdate = async (id, status) => {
    try {
      await updateVisitorStatus({ id, status }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const openViewModal = (visitor) => setSelectedVisitor(visitor);
  const closeViewModal = () => setSelectedVisitor(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#104c80] font-semibold">
        Loading visitors...
      </div>
    );
  }

  return (
    <div className="lg:ml-64 min-h-screen bg-gradient-to-br from-[#f2f6fb] to-[#e4edf6] px-6 md:px-14 py-8">
      {/* --- PAGE TITLE --- */}
      <div className="text-left mb-10">
        <h1 className="text-4xl font-extrabold text-[#104c80] mb-2">
          Visitor Management
        </h1>
        <p className="text-[#517ca3] text-base font-medium">
          Efficiently manage, review, and track all visitor applications in one place.
        </p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#104c80] flex items-center gap-4">
          <Users className="text-[#104c80] w-10 h-10" />
          <div>
            <h3 className="text-base font-semibold text-gray-700">Total Visitors</h3>
            <p className="text-2xl font-bold text-[#104c80]">{stats.total}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-500 flex items-center gap-4">
          <Clock className="text-yellow-500 w-10 h-10" />
          <div>
            <h3 className="text-base font-semibold text-gray-700">Pending</h3>
            <p className="text-2xl font-bold text-[#104c80]">{stats.pending}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-green-500 flex items-center gap-4">
          <UserCheck className="text-green-500 w-10 h-10" />
          <div>
            <h3 className="text-base font-semibold text-gray-700">Approved</h3>
            <p className="text-2xl font-bold text-[#104c80]">{stats.approved}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-red-500 flex items-center gap-4">
          <UserX className="text-red-500 w-10 h-10" />
          <div>
            <h3 className="text-base font-semibold text-gray-700">Rejected</h3>
            <p className="text-2xl font-bold text-[#104c80]">{stats.rejected}</p>
          </div>
        </div>
      </div>

      {/* --- VISITOR TABLE COMPONENT --- */}
      <ReceptionistTable
        visitors={visitors}
        onView={openViewModal}
        onEdit={(v) => setEditModal({ open: true, visitor: v })}
        onDelete={(v) => setDeleteModal({ open: true, visitor: v })}
      />

      {/* --- MODALS --- */}
      {selectedVisitor && (
        <VisitorViewModal
          visitor={selectedVisitor}
          onClose={closeViewModal}
          onApprove={(id) => handleStatusUpdate(id, "approved")}
          onReject={(id) => handleStatusUpdate(id, "rejected")}
        />
      )}

      {editModal.open && (
        <VisitorEditModal
          visitor={editModal.visitor}
          onClose={() => setEditModal({ open: false, visitor: null })}
        />
      )}

      {deleteModal.open && (
        <VisitorDeleteModal
          visitor={deleteModal.visitor}
          onClose={() => setDeleteModal({ open: false, visitor: null })}
        />
      )}
    </div>
  );
};

export default ReceptionistDashboard;
