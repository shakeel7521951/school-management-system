import React, { useState } from "react";
import { Search } from "lucide-react";

const ComplaintStatus = () => {
  const [complaintId, setComplaintId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!complaintId.trim()) return;

    setLoading(true);
    setStatus(null);

    // Simulate backend check
    setTimeout(() => {
      // Example statuses
      const mockStatuses = [
        { id: "12345", status: "Under Review", updated: "2025-09-01" },
        { id: "67890", status: "Resolved", updated: "2025-09-05" },
      ];

      const result = mockStatuses.find((c) => c.id === complaintId);
      setStatus(result || { id: complaintId, status: "Not Found" });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-5">
          <h1 className="text-2xl font-bold text-white">Track Complaint Status</h1>
          <p className="text-indigo-100 mt-1 text-sm">
            Enter your Complaint ID to check the latest status
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="px-6 py-8 space-y-6">
          <div>
            <label
              htmlFor="complaintId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Complaint ID
            </label>
            <div className="flex">
              <input
                type="text"
                id="complaintId"
                name="complaintId"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                placeholder="Enter Complaint ID (e.g., 12345)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
              >
                <Search className="h-4 w-4 mr-1" />
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </form>

        {/* Status Result */}
        {status && (
          <div className="px-6 pb-8">
            <div className="mt-6 p-6 bg-gray-50 border rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800">
                Complaint ID: {status.id}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`${
                    status.status === "Resolved"
                      ? "text-green-600"
                      : status.status === "Under Review"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {status.status}
                </span>
              </p>
              {status.updated && (
                <p className="mt-1 text-sm text-gray-500">
                  Last Updated: {status.updated}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintStatus;
