import { Eye, Edit3, Trash2 } from "lucide-react";

const ReceptionistTable = ({ visitors, onView, onEdit, onDelete }) => {
  return (
    <>
      {/* --- TABLE (Laptop & Tablet) --- */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-x-auto border border-slate-200">
        <table className="w-full text-sm text-left table-auto whitespace-nowrap">
          <thead className="bg-[#104c80] text-[#eef3f9] uppercase text-xs font-semibold">
            <tr>
              <th className="px-5 py-3 text-center">#</th>
              <th className="px-5 py-3">Full Name</th>
              <th className="px-5 py-3">Qatar ID / Passport</th>
              <th className="px-5 py-3">Phone Number</th>
              <th className="px-5 py-3">Visitor Type</th> {/* ✅ NEW COLUMN */}
              <th className="px-5 py-3">Purpose of Visit</th>
              <th className="px-5 py-3">Person / Department</th>
              <th className="px-5 py-3">Signature</th>
              <th className="px-5 py-3">Submitted On</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {visitors.map((v, i) => (
              <tr
                key={v._id}
                className={`border-t ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50"
                } hover:bg-[#f1f7ff] transition-all`}
              >
                <td className="px-5 py-3 text-center font-medium text-[#104c80]">
                  {i + 1}
                </td>
                <td className="px-5 py-3">{v.name}</td>
                <td className="px-5 py-3">{v.governmentId}</td>
                <td className="px-5 py-3">{v.phone}</td>
                <td className="px-5 py-3 capitalize">{v.visitorType}</td> {/* ✅ NEW DATA */}
                <td className="px-5 py-3">{v.reason}</td>
                <td className="px-5 py-3">{v.hostEmail}</td>
                <td className="px-5 py-3">{v.signature || "—"}</td>
                <td className="px-5 py-3">
                  {new Date(v.createdAt).toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      v.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : v.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                  </span>
                </td>

                <td className="px-5 py-3 flex gap-2 justify-center">
                  <button
                    onClick={() => onView(v)}
                    className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(v)}
                    className="p-2 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(v)}
                    className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW --- */}
      <div className="block md:hidden space-y-4">
        {visitors.map((v, i) => (
          <div
            key={v._id}
            className="bg-white shadow-md rounded-2xl p-5 border border-slate-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-[#104c80]">{v.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  v.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : v.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              <strong>ID / Passport:</strong> {v.governmentId}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> {v.phone}
            </p>
            <p className="text-sm text-gray-700 capitalize">
              <strong>Visitor Type:</strong> {v.visitorType}
            </p> {/* ✅ NEW FIELD IN MOBILE VIEW */}
            <p className="text-sm text-gray-700">
              <strong>Purpose:</strong> {v.reason}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Person/Dept:</strong> {v.hostEmail}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Submitted:</strong>{" "}
              {new Date(v.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => onView(v)}
                className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <Eye size={16} />
              </button>
              <button
                onClick={() => onEdit(v)}
                className="p-2 rounded-md bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => onDelete(v)}
                className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReceptionistTable;
