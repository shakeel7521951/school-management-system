import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { AlertCircle, Download, Filter, Calendar, RotateCw } from "lucide-react";

// ===== Sample Data (replace with API results) =====
const complaintTypeData = [
  { name: "Bullying", value: 12, resolved: 8, color: "#3b82f6" },
  { name: "Safety", value: 8, resolved: 5, color: "#22c55e" },
  { name: "Staff", value: 6, resolved: 3, color: "#f59e0b" },
  { name: "Facilities", value: 5, resolved: 4, color: "#ef4444" },
  { name: "Other", value: 3, resolved: 2, color: "#8b5cf6" },
];

const severityData = [
  { severity: "Simple", count: 7, resolved: 5 },
  { severity: "Urgent", count: 9, resolved: 6 },
  { severity: "Follow-up", count: 6, resolved: 4 },
  { severity: "Serious", count: 12, resolved: 5 },
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

export default function Reports() {
  const [timeRange, setTimeRange] = useState("last6months");
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Simulate data loading
  useEffect(() => {
    if (timeRange !== "last6months") {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRange]);

  const handleExport = () => {
    alert("Export functionality would be implemented here");
  };

  // Stats summary
  const totalComplaints = complaintTypeData.reduce((sum, item) => sum + item.value, 0);
  const totalResolved = statusData.find(item => item.status === "Resolved")?.value || 0;
  const resolutionRate = totalComplaints > 0 ? Math.round((totalResolved / totalComplaints) * 100) : 0;

  // Custom Pie Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border">
          <p className="font-semibold">{label}</p>
          <p className="text-sm">
            Total: <span className="font-medium">{payload[0].value}</span>
          </p>
          {payload[1] && (
            <p className="text-sm">
              Resolved:{" "}
              <span className="font-medium text-green-500">{payload[1].value}</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom Pie Labels
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="py-6 space-y-8 min-h-screen md:max-w-5xl md:ms-[24%]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📊  Reports</h1>
          <p className="text-gray-500 mt-1">Dashboard overview of submitted complaints</p>
        </div>

        <div className="flex gap-2">
          <button
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="lastweek">Last Week</option>
              <option value="lastmonth">Last Month</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
            <Calendar size={16} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button
            className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700"
            onClick={handleExport}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Type</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Types</option>
                {complaintTypeData.map(type => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Severities</option>
                {severityData.map(sev => (
                  <option key={sev.severity} value={sev.severity}>{sev.severity}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">All Statuses</option>
                {statusData.map(status => (
                  <option key={status.status} value={status.status}>{status.status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-sm text-gray-500">Total Complaints</h3>
          <p className="text-2xl font-bold text-gray-800">{totalComplaints}</p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-sm text-gray-500">Resolved</h3>
          <p className="text-2xl font-bold text-green-600">{totalResolved}</p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-sm text-gray-500">In Progress</h3>
          <p className="text-2xl font-bold text-blue-600">
            {statusData.find(item => item.status === "In Progress")?.value || 0}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-sm text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-amber-600">
            {statusData.find(item => item.status === "Pending")?.value || 0}
          </p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4 text-center">
          <h3 className="text-sm text-gray-500">Resolution Rate</h3>
          <p className="text-2xl font-bold text-indigo-600">{resolutionRate}%</p>
        </div>
      </div>

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
            {/* Pie Chart - Complaint Types */}
            <div className="rounded-2xl shadow-md bg-white p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Complaints by Type</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${activeChart === "all" ? "bg-white shadow-sm" : ""}`}
                    onClick={() => setActiveChart("all")}
                  >
                    All
                  </button>
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${activeChart === "resolved" ? "bg-white shadow-sm" : ""}`}
                    onClick={() => setActiveChart("resolved")}
                  >
                    Resolved
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={complaintTypeData}
                    dataKey={activeChart === "resolved" ? "resolved" : "value"}
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  >
                    {complaintTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart - Severity */}
            <div className="rounded-2xl shadow-md bg-white p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Complaints by Severity</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={severityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="severity" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart - Monthly Trends */}
          <div className="rounded-2xl shadow-md bg-white p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Complaints Trend (Monthly)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="complaints" name="Total Complaints" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* No Data State */}
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
