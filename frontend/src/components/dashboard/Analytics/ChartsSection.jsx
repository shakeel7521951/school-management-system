import React from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PRIMARY = "#104C80";
const SUCCESS = "#16a34a";
const DANGER = "#dc2626";
const WARNING = "#facc15";
const TEXT_LIGHT = "#64748B";
const CARD_BG = "#FFFFFF";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200 max-w-[200px]">
        <p className="font-semibold text-sm" style={{ color: PRIMARY }}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};


const ChartsSection = ({
  registrations,
  totalApprovals,
  totalRejections,
  totalPending,
}) => {
  const { t } = useTranslation("analytics");

  // ✅ Bar chart data
  const barData = [
    {
      name: t("charts.requests"),
      approved: totalApprovals || 0,
      rejected: totalRejections || 0,
      pending: totalPending || 0,
    },
  ];

  // ✅ Pie chart data (translated)
  const pieData = [
    { name: t("charts.approved"), value: totalApprovals || 0 },
    { name: t("charts.rejected"), value: totalRejections || 0 },
    { name: t("charts.pending"), value: totalPending || 0 },
  ];

  // ✅ Line chart aggregated + sorted by date
  const lineDataMap = {};
  registrations.forEach((r) => {
    const date = new Date(r.createdAt).toLocaleDateString();
    if (!lineDataMap[date]) {
      lineDataMap[date] = { name: date, approved: 0, rejected: 0, pending: 0 };
    }
    if (r.status === "approved") lineDataMap[date].approved++;
    if (r.status === "rejected") lineDataMap[date].rejected++;
    if (r.status === "pending") lineDataMap[date].pending++;
  });

  const lineData = Object.values(lineDataMap).sort(
    (a, b) => new Date(a.name) - new Date(b.name)
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
      {/* Bar Chart */}
      <div
        className="rounded-2xl p-4 shadow-lg"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>
          {t("charts.bar_title")}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
            <YAxis
              tick={{ fill: TEXT_LIGHT, fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="approved" fill={SUCCESS} name={t("charts.approved")} />
            <Bar dataKey="rejected" fill={DANGER} name={t("charts.rejected")} />
            <Bar dataKey="pending" fill={WARNING} name={t("charts.pending")} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div
        className="rounded-2xl p-4 shadow-lg"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>
          {t("charts.pie_title")}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={false}
            >
              <Cell fill={SUCCESS} />
              <Cell fill={DANGER} />
              <Cell fill={WARNING} />
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div
        className="rounded-2xl p-4 shadow-lg xl:col-span-2"
        style={{ backgroundColor: CARD_BG }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>
          {t("charts.line_title")}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
            <YAxis
              tick={{ fill: TEXT_LIGHT, fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="approved"
              stroke={SUCCESS}
              dot={false}
              name={t("charts.approved")}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke={DANGER}
              dot={false}
              name={t("charts.rejected")}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke={WARNING}
              dot={false}
              name={t("charts.pending")}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
