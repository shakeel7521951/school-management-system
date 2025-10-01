import React from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const PRIMARY = "#104C80";
const SUCCESS = "#16a34a";
const DANGER = "#dc2626";
const WARNING = "#facc15";
const TEXT_LIGHT = "#64748B";
const CARD_BG = "#FFFFFF";

const CustomTooltip = ({ active, payload, label }) => {
    const { t } = useTranslation("analytics");
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200 max-w-[200px]">
                <p className="font-semibold text-sm" style={{ color: PRIMARY }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-xs">
                        {t(`charts.${entry.name.toLowerCase()}`)}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ChartsSection = ({ registrations, totalApprovals, totalRejections, totalPending }) => {
    const { t } = useTranslation("analytics");

    const barData = [{ name: t("charts.requests"), approved: totalApprovals, rejected: totalRejections, pending: totalPending }];
    const pieData = [
        { name: "Approved", value: totalApprovals },
        { name: "Rejected", value: totalRejections },
        { name: "Pending", value: totalPending }
    ];
    const lineData = registrations.map(r => ({
        name: new Date(r.createdAt).toLocaleDateString(),
        approved: r.status === "approved" ? 1 : 0,
        rejected: r.status === "rejected" ? 1 : 0,
        pending: r.status === "pending" ? 1 : 0
    }));

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-2xl p-4 shadow-lg" style={{ backgroundColor: CARD_BG }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>{t("charts.bar_title")}</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <YAxis tick={{ fill: TEXT_LIGHT, fontSize: 12 }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="approved" fill={SUCCESS} />
                        <Bar dataKey="rejected" fill={DANGER} />
                        <Bar dataKey="pending" fill={WARNING} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="rounded-2xl p-4 shadow-lg" style={{ backgroundColor: CARD_BG }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>{t("charts.pie_title")}</h2>
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
                            label={({ name, percent }) => t("charts.percent_format", { name: t(`charts.${name.toLowerCase()}`), percent: (percent * 100).toFixed(0) })}
                            labelLine={false}
                        >
                            <Cell fill={SUCCESS} />
                            <Cell fill={DANGER} />
                            <Cell fill={WARNING} />
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="rounded-2xl p-4 shadow-lg xl:col-span-2" style={{ backgroundColor: CARD_BG }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: PRIMARY }}>{t("charts.line_title")}</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <YAxis tick={{ fill: TEXT_LIGHT, fontSize: 12 }} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="approved" stroke={SUCCESS} />
                        <Line type="monotone" dataKey="rejected" stroke={DANGER} />
                        <Line type="monotone" dataKey="pending" stroke={WARNING} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartsSection;
