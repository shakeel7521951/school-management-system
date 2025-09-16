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
    <div className="lg:ml-[270px] max-w-7xl mx-auto bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Page Title */}
      <header>
        <h1 className="text-3xl font-bold text-[#1a4480] md:text-4xl">
          Overview
        </h1>
        <p className="text-gray-500 mt-1">
          A quick snapshot of visitors, complaints, documents, and performance.
        </p>
        <hr className="mt-4 border-gray-200" />
      </header>

      {/* KPI Cards */}
      <Stats />

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white px-6 py-8 rounded-2xl shadow-md h-[350px]">
          <ComplaintsPieChart />
        </div>

        <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-gray-100 h-[350px] flex flex-col">
          <DocumentApprovalBarChart />
        </div>

        <div className="bg-white w-full p-6 rounded-2xl shadow-md border border-gray-100 h-[380px] col-span-1 md:col-span-2">
          <VisitorTrendsChart />
        </div>
      </section>

      {/* Tables Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Complaints Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Complaints Overview
          </h3>
          <div className="flex-1 rounded-lg border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#10448c] text-white">
                  <th className="p-3 text-left font-semibold w-12">ID</th>
                  <th className="p-3 text-left font-semibold w-40">Type</th>
                  <th className="p-3 text-left font-semibold w-32">Status</th>
                  <th className="hidden md:table-cell p-3 text-left font-semibold w-28">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                  >
                    <td className="p-3 text-gray-700 text-center">{c.id}</td>
                    <td className="p-3 text-gray-700">{c.type}</td>
                    <td className="py-3 px-1">
                      <span
                        className={`px-3 py-1 text-center rounded-full text-xs font-medium shadow-sm whitespace-nowrap
                          ${c.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : c.status === "Pending"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 hidden md:table-cell text-gray-600 whitespace-nowrap">
                      {c.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Align button right */}
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
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Recently Joined Users
          </h3>
          <div className="flex-1 rounded-lg border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#10448c] text-white">
                  <th className="p-3 text-left font-semibold w-12">ID</th>
                  <th className="p-3 text-left font-semibold w-40">User</th>
                  <th className="p-3 text-left font-semibold w-32">Role</th>
                  <th className="p-3 text-left font-semibold w-28 hidden md:table-cell">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr
                    key={u.id}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                  >
                    {/* ID */}
                    <td className="p-3 text-gray-700 text-center">{u.id}</td>

                    {/* User */}
                    <td className="p-3 flex items-center gap-3">
                      <span className="text-gray-700 font-medium whitespace-nowrap">
                        {u.name}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="p-3 text-gray-700">{u.role}</td>

                    {/* Joined */}
                    <td className="p-3 hidden md:table-cell text-gray-600 whitespace-nowrap">
                      {u.joined}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Align button right */}
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
    </div>
  );
};

export default Overview;
