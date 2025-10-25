import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Legend as ReLegend,
  LineChart,
  Line,
} from "recharts";
import { AlertCircle, Download, Filter, Calendar, RotateCw } from "lucide-react";

// ===== Chart.js for Pie =====
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const complaintTypeData = [
  { name: "Bullying", value: 12, resolved: 8, color: "#3b82f6" },
  { name: "Safety", value: 8, resolved: 5, color: "#22c55e" },
  { name: "Staff", value: 6, resolved: 3, color: "#f59e0b" },
  { name: "Facilities", value: 5, resolved: 4, color: "#ef4444" },
  { name: "Other", value: 3, resolved: 2, color: "#8b5cf6" },
];

const severityData = [
  { severity: "Low", count: 7, resolved: 5 },
  { severity: "Medium", count: 9, resolved: 6 },
  { severity: "High", count: 6, resolved: 4 },
  { severity: "Critical", count: 12, resolved: 5 },
];

const monthlyData = [
  { month: "Jan", complaints: 5, resolved: 3 },
  { month: "Feb", complaints: 8, resolved: 5 },
  { month: "Mar", complaints: 12, resolved: 8 },
  { month: "Apr", complaints: 6, resolved: 4 },
  { month: "May", complaints: 10, resolved: 7 },
  { month: "Jun", complaints: 14, resolved: 9 },
];

const statusData = [
  { status: "Resolved", value: 18, color: "#22c55e" },
  { status: "In Progress", value: 10, color: "#3b82f6" },
  { status: "Pending", value: 6, color: "#f59e0b" },
];

// ===== Pie Chart Component =====
const ComplaintsPieChart = ({ complaintTypeData, activeChart }) => {
  const labels = complaintTypeData.map((item) => item.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Complaints",
        data:
          activeChart === "resolved"
            ? complaintTypeData.map((item) => item.resolved)
            : complaintTypeData.map((item) => item.value),
        backgroundColor: complaintTypeData.map((item) => item.color),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
  };

  return (
    <div className="w-full h-[250px] sm:h-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
};

// ===== Reports Component =====
export default function Reports() {
  const [timeRange, setTimeRange] = useState("last6months");
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (timeRange !== "last6months") {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRange]);

  const totalComplaints = complaintTypeData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const totalResolved =
    statusData.find((item) => item.status === "Resolved")?.value || 0;
  const resolutionRate =
    totalComplaints > 0
      ? Math.round((totalResolved / totalComplaints) * 100)
      : 0;

  return (
    <div className="py-6 px-4 lg:ml-64 md:ml-20 md:px-8 space-y-8 min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-3xl font-bold text-[#1a4480] md:text-4xl">
            📊 Reports
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Overview of complaints and resolutions
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center w-[40%] gap-2 bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="relative w-[50%]">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
            <Calendar
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <button
            className="flex w-[100px] items-center gap-2 bg-blue-600 text-white rounded-lg px-3 sm:px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="font-medium text-gray-700 mb-3">Filter Reports</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Categories</option>
              {complaintTypeData.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Severities</option>
              {severityData.map((sev) => (
                <option key={sev.severity} value={sev.severity}>
                  {sev.severity}
                </option>
              ))}
            </select>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option value="">All Statuses</option>
              {statusData.map((status) => (
                <option key={status.status} value={status.status}>
                  {status.status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-xs sm:text-sm text-gray-500">Total Complaints</h3>
          <p className="text-lg sm:text-2xl font-bold text-gray-800">
            {totalComplaints}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-xs sm:text-sm text-gray-500">Resolved</h3>
          <p className="text-lg sm:text-2xl font-bold text-green-600">
            {totalResolved}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-xs sm:text-sm text-gray-500">In Progress</h3>
          <p className="text-lg sm:text-2xl font-bold text-blue-600">
            {statusData.find((i) => i.status === "In Progress")?.value || 0}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-xs sm:text-sm text-gray-500">Pending</h3>
          <p className="text-lg sm:text-2xl font-bold text-amber-600">
            {statusData.find((i) => i.status === "Pending")?.value || 0}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-xs sm:text-sm text-gray-500">Resolution %</h3>
          <p className="text-lg sm:text-2xl font-bold text-indigo-600">
            {resolutionRate}%
          </p>
        </div>
      </div>

      {/* Loading or Charts */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <RotateCw className="animate-spin mx-auto mb-3 text-blue-500" size={32} />
            <p className="text-gray-600">Loading data...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl shadow-md bg-white p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-gray-700">
                  Complaints by Category
                </h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${activeChart === "all" ? "bg-white shadow-sm" : ""
                      }`}
                    onClick={() => setActiveChart("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${activeChart === "resolved" ? "bg-white shadow-sm" : ""
                      }`}
                    onClick={() => setActiveChart("resolved")}
                  >
                    Resolved
                  </button>
                </div>
              </div>
              <ComplaintsPieChart
                complaintTypeData={complaintTypeData}
                activeChart={activeChart}
              />
            </div>

            <div className="rounded-2xl shadow-md bg-white p-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                Complaints by Severity
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="severity" />
                  <YAxis />
                  <ReTooltip />
                  <ReLegend />
                  <Bar dataKey="count" name="Total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl shadow-md bg-white p-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
              Monthly Complaints Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ReTooltip />
                <ReLegend />
                <Line
                  type="monotone"
                  dataKey="complaints"
                  name="Total Complaints"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* No Data */}
          {complaintTypeData.length === 0 &&
            severityData.length === 0 &&
            monthlyData.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto mb-3 text-gray-300" size={48} />
                <h3 className="text-lg font-medium text-gray-600">No data available</h3>
                <p className="text-gray-500 mt-1">Try adjusting your filters or time range</p>
              </div>
            )}
        </>
      )}
    </div>
  );
}
