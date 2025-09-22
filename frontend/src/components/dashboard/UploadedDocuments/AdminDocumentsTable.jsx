import { Eye, CheckCircle, XCircle } from "lucide-react";

const AdminDocumentsTable = ({
  uploads,
  setSelectedDoc,
  setShowViewModal,
  setShowRejectModal,
  handleApprove,
  getStatusClass,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      {/* ✅ Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#104c80] text-white">
              <th className="px-4 py-3 text-left font-semibold text-sm">#</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Uploader</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Type</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-sm">Status</th>
              <th className="px-4 py-3 text-center font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {uploads.map((doc, i) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{doc.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{doc.uploader}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{doc.role}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{doc.type}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(doc.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      doc.status
                    )}`}
                  >
                    {doc.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    {/* View */}
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowViewModal(true);
                      }}
                      className="p-2 text-gray-600 hover:text-[#104c80] hover:bg-gray-100 rounded-md"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Approve */}
                    <button
                      onClick={() => handleApprove(doc.id)}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md"
                      title="Approve document"
                    >
                      <CheckCircle size={16} />
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setShowRejectModal(true);
                      }}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                      title="Reject document"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="block md:hidden divide-y divide-gray-200">
        {uploads.map((doc, i) => (
          <div key={doc.id} className="p-4 flex flex-col gap-3 bg-white">
            {/* Title & Index */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-900 text-sm">{doc.title}</h3>
              <span className="text-xs text-gray-500">#{i + 1}</span>
            </div>

            {/* Info */}
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium">Uploader:</span> {doc.uploader}
              </p>
              <p>
                <span className="font-medium">Role:</span> {doc.role}
              </p>
              <p>
                <span className="font-medium">Type:</span> {doc.type}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(doc.date).toLocaleDateString()}
              </p>
            </div>

            {/* Status */}
            <span
              className={`inline-flex self-start items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                doc.status
              )}`}
            >
              {doc.status}
            </span>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedDoc(doc);
                  setShowViewModal(true);
                }}
                className="p-2 text-gray-600 hover:text-[#104c80] hover:bg-gray-100 rounded-md"
                title="View details"
              >
                <Eye size={18} />
              </button>
              <button
                onClick={() => handleApprove(doc.id)}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md"
                title="Approve"
              >
                <CheckCircle size={18} />
              </button>
              <button
                onClick={() => {
                  setSelectedDoc(doc);
                  setShowRejectModal(true);
                }}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                title="Reject"
              >
                <XCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDocumentsTable;
