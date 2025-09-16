import Stats from "../../components/dashboard/overview/KPICards/Stats";
import VisitorTrendsChart from "../../components/dashboard/overview/DashboardCharts/VisitorTrendsChart";
import ComplaintsPieChart from "../../components/dashboard/overview/DashboardCharts/ComplaintsPieChart";
import DocumentApprovalBarChart from "../../components/dashboard/overview/DashboardCharts/DocumentApprovalBarChart";
import { Link } from "react-router-dom";

const Overview = () => {
  const complaints = [
    { id: 1, type: "Academic", status: "Pending", date: "2025-09-01" },
    { id: 2, type: "Facilities", status: "Resolved", date: "2025-09-05" },
    { id: 3, type: "HR", status: "In Progress", date: "2025-09-07" },
  ];

  const users = [
    { id: 1, name: "Ali Khan", role: "Teacher", joined: "2025-09-01" },
    { id: 2, name: "Sara Ahmed", role: "Student", joined: "2025-09-03" },
    { id: 3, name: "John Smith", role: "Admin", joined: "2025-09-06" },
  ];

  return (
    <div className="lg:ml-[270px] md:ml-20 px-4 sm:px-6 md:px-8 py-6 max-w-full bg-gray-50 flex flex-col gap-10">
      {/* Page Title */}
      <header>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a4480]">
          Overview
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          A quick snapshot of visitors, complaints, documents, and performance.
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      {/* KPI Cards */}
      <Stats />

      {/* Tables Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Complaints Overview */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Complaints Overview
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block flex-1 rounded-lg border border-gray-100">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-[#10448c] text-white">
                  <th className="p-2 text-left font-semibold w-12">ID</th>
                  <th className="p-2 text-left font-semibold">Type</th>
                  <th className="p-2 text-left font-semibold">Status</th>
                  <th className="p-2 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="p-2 text-gray-700 text-center">{c.id}</td>
                    <td className="p-2 text-gray-700">{c.type}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium 
                          ${
                            c.status === "Resolved"
                              ? "bg-green-100 text-green-700"
                              : c.status === "Pending"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-3">
            {complaints.map((c) => (
              <div key={c.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <p>
                  <strong>ID:</strong> {c.id}
                </p>
                <p>
                  <strong>Type:</strong> {c.type}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${
                      c.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Pending"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong> {c.date}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/complain"
              className="text-sm text-[#1a4480] font-medium hover:underline"
            >
              View All Complaints →
            </Link>
          </div>
        </div>

        {/* Recently Joined Users */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recently Joined Users
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block flex-1 rounded-lg border border-gray-100">
            <table className="w-full text-sm table-auto">
              <thead>
                <tr className="bg-[#10448c] text-white">
                  <th className="p-2 text-left font-semibold w-12">ID</th>
                  <th className="p-2 text-left font-semibold">User</th>
                  <th className="p-2 text-left font-semibold">Role</th>
                  <th className="p-2 text-left font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="p-2 text-gray-700 text-center">{u.id}</td>
                    <td className="p-2 text-gray-700">{u.name}</td>
                    <td className="p-2 text-gray-700">{u.role}</td>
                    <td className="p-2 text-gray-600">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden flex flex-col gap-3">
            {users.map((u) => (
              <div key={u.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <p>
                  <strong>ID:</strong> {u.id}
                </p>
                <p>
                  <strong>Name:</strong> {u.name}
                </p>
                <p>
                  <strong>Role:</strong> {u.role}
                </p>
                <p>
                  <strong>Joined:</strong> {u.joined}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/users"
              className="text-sm text-[#1a4480] font-medium hover:underline"
            >
              View All Users →
            </Link>
          </div>
        </div>
      </section>

      {/* Charts Section - Below Tables */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md h-[350px]">
          <ComplaintsPieChart />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 h-[350px] flex flex-col">
          <DocumentApprovalBarChart />
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-gray-100 h-[380px] col-span-1 md:col-span-2">
          <VisitorTrendsChart />
        </div>
      </section>
    </div>
  );
};

export default Overview;
