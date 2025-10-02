import { useState } from "react";
import { User, IdCard, Mail, ClipboardList, CheckCircle2 } from "lucide-react";
import { useAddVisitorMutation } from "../../redux/slices/VisitorApi";

const VisitorForm = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    governmentId: "",
    reason: "Meeting (Host)",
    hostEmail: "",
  });

  const [addVisitor, { isLoading }] = useAddVisitorMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.governmentId) {
      return alert("Please enter name and ID");
    }
    try {
      await addVisitor(form).unwrap();
      onClose(); // ✅ close modal after success
    } catch (err) {
      console.error("Add visitor failed:", err);
      alert("Failed to add visitor");
    }
  }
  
  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#104c80]">Visitor Check-in</h2>
        <p className="text-sm text-slate-500">
          Please fill out the form to check in
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User size={16} className="text-[#104c80]" /> Full name
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            placeholder="Enter your full name"
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        {/* Government ID */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <IdCard size={16} className="text-[#104c80]" /> Government ID / Badge
          </label>
          <input
            value={form.governmentId}
            onChange={(e) =>
              setForm({ ...form, governmentId: e.target.value })
            }
            required
            placeholder="e.g. CNIC, Employee Badge"
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <ClipboardList size={16} className="text-[#104c80]" /> Reason
          </label>
          <select
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          >
            <option>Meeting (Host)</option>
            <option>Interview</option>
            <option>Delivery</option>
            <option>Maintenance / Contractor</option>
            <option>Other</option>
          </select>
        </div>

        {/* Host */}
        <div>
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Mail size={16} className="text-[#104c80]" /> Host email
          </label>
          <input
            value={form.hostEmail}
            onChange={(e) => setForm({ ...form, hostEmail: e.target.value })}
            placeholder="Enter host's email"
            className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a62] text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50"
        >
          <CheckCircle2 size={20} /> {isLoading ? "Submitting..." : "Check in"}
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;
