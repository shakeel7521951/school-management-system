import { useState } from "react";
import { User, IdCard, Mail, ClipboardList, CheckCircle2 } from "lucide-react";

const VisitorForm = ({ onAddVisitor }) => {
  const [form, setForm] = useState({
    name: "",
    id: "",
    reason: "Meeting (Host)",
    host: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.id) return alert("Please enter name and ID");
    onAddVisitor({ ...form });
    setForm({ name: "", id: "", reason: "Meeting (Host)", host: "" });
  }

  return (
    <div className="relative py-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f0f4f9] to-[#dce7f3] px-4">
      {/* Background Card */}
      <div className="absolute w-96 h-96 bg-[#104c80]/10 rounded-3xl blur-2xl"></div>

      {/* Main Form Card */}
      <section className="relative mt-8 z-10 max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 lg:ml-[250px]">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-[#104c80] to-[#0d3a62] px-6 py-5">
          <h2 className="text-lg font-bold text-white tracking-wide">
            Visitor Check-in
          </h2>
          <p className="text-sm text-blue-100">
            Please fill out the form to check in
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User size={16} className="text-[#104c80]" /> Full name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Enter your full name"
              className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <IdCard size={16} className="text-[#104c80]" /> Government ID / Badge
            </label>
            <input
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              required
              placeholder="e.g. CNIC, Employee Badge"
              className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <ClipboardList size={16} className="text-[#104c80]" /> Reason for visit
            </label>
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
            >
              <option>Meeting (Host)</option>
              <option>Interview</option>
              <option>Delivery</option>
              <option>Maintenance / Contractor</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail size={16} className="text-[#104c80]" /> Host employee email or name
            </label>
            <input
              value={form.host}
              onChange={(e) => setForm({ ...form, host: e.target.value })}
              placeholder="Enter host's email or name"
              className="mt-2 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] focus:border-[#104c80] outline-none transition"
            />
          </div>

          {/* Submit Button with Icon */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#104c80] to-[#0d3a62] text-white font-semibold tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
          >
            <CheckCircle2 size={20} className="text-white" />
            Check in
          </button>
        </form>
      </section>
    </div>
  );
};

export default VisitorForm;
