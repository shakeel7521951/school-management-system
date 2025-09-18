import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const VisitorManagement = () => {
  const storageKey = "vms_demo_visitors_v1";
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    id: "",
    reason: "Meeting (Host)",
    host: "",
  });

  function uid() {
    return "v-" + Math.random().toString(36).slice(2, 9);
  }

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setVisitors(JSON.parse(saved));
    else {
      const sample = [
        {
          uid: uid(),
          name: "Ali Raza",
          id: "42101-1234567-1",
          reason: "Meeting (Host)",
          host: "sara.khan@company.com",
          status: "pending",
          ts: Date.now() - 1000 * 60 * 60,
        },
        {
          uid: uid(),
          name: "Delivery - Fazal",
          id: "DEL-2025-03",
          reason: "Delivery",
          host: "logistics@company.com",
          status: "approved",
          ts: Date.now() - 1000 * 60 * 60 * 5,
          hostRespondedAt: Date.now() - 1000 * 60 * 60 * 4,
        },
      ];
      localStorage.setItem(storageKey, JSON.stringify(sample));
      setVisitors(sample);
    }
  }, []);

  function saveVisitors(list) {
    setVisitors(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  }

  function addVisitor(e) {
    e.preventDefault();
    if (!form.name || !form.id) return alert("Please enter name and ID");
    const newVisitor = { ...form, uid: uid(), status: "pending", ts: Date.now() };
    const list = [...visitors, newVisitor];
    saveVisitors(list);
    setForm({ name: "", id: "", reason: "Meeting (Host)", host: "" });
  }

  function respondSim(uid, status) {
    const list = visitors.map((v) =>
      v.uid === uid
        ? {
            ...v,
            status,
            hostRespondedAt: Date.now(),
            host: v.host || "Simulated Host",
          }
        : v
    );
    saveVisitors(list);
  }

  function removeVisitor(uid) {
    const list = visitors.filter((v) => v.uid !== uid);
    saveVisitors(list);
  }

  function statusBadge(status) {
    if (status === "pending")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">
          <Clock size={14} /> Pending
        </span>
      );
    if (status === "approved")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
          <CheckCircle size={14} /> Approved
        </span>
      );
    if (status === "rejected")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
          <XCircle size={14} /> Rejected
        </span>
      );
    return (
      <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-800">
        Unknown
      </span>
    );
  }

  const pending = visitors.filter((v) => v.status === "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#104c80] to-[#0d3a62] text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg">
              VMS
            </div>
            <div>
              <h1 className="text-xl font-bold">Visitor Management System</h1>
              <p className="text-sm opacity-90">
                Secure check-in and employee approval
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Check-in Form */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-[#104c80]">
            Visitor Check-in
          </h2>
          <form onSubmit={addVisitor} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Government ID / Badge</label>
              <input
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                required
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Reason for visit</label>
              <select
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none"
              >
                <option>Meeting (Host)</option>
                <option>Interview</option>
                <option>Delivery</option>
                <option>Maintenance / Contractor</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Host employee email or name
              </label>
              <input
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#104c80] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-[#104c80] text-white font-medium hover:bg-[#0d3a62] transition"
            >
              Check in
            </button>
          </form>
        </section>

        {/* Pending Visitors */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Pending visitors ({pending.length})</h2>
          <div className="mt-4 space-y-3 max-h-80 overflow-auto">
            {pending.length === 0 && (
              <p className="text-sm text-slate-500">No pending visitors </p>
            )}
            {pending.map((v) => (
              <div
                key={v.uid}
                className="p-4 rounded-xl border flex items-center justify-between hover:bg-slate-50 transition"
              >
                <div>
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-xs text-slate-500">
                    ID: {v.id} • Host: {v.host || "—"}
                  </div>
                  <div className="text-xs mt-1">{v.reason}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => respondSim(v.uid, "approved")}
                    className="px-3 py-1 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => respondSim(v.uid, "rejected")}
                    className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visitor Log */}
        <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Visitor log ({visitors.length})</h2>
          <div className="mt-4 space-y-3 max-h-80 overflow-auto text-sm">
            {visitors
              .slice()
              .reverse()
              .map((v) => (
                <div
                  key={v.uid}
                  className="p-4 rounded-xl border hover:bg-slate-50 transition"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{v.name}</div>
                    <div className="text-xs">{new Date(v.ts).toLocaleString()}</div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {v.reason} • Host: {v.host || "—"}
                  </div>
                  <div className="mt-2 text-xs">Status: {statusBadge(v.status)}</div>
                  <button
                    onClick={() => removeVisitor(v.uid)}
                    className="mt-2 px-3 py-1 rounded-md border text-xs hover:bg-slate-100 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>

     
    </div>
  );
};

export default VisitorManagement;
