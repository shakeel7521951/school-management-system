import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { staffData } from "./constants";
import StaffTable from "./StaffTable";

// Updated color scheme
const PRIMARY = "#104C80";
const PRIMARY_LIGHT = "#3B82F6";
const SUCCESS = "#104C80";
const DANGER = "#3B82F6";
const TEXT_LIGHT = "#64748B";
const CARD_BG = "#FFFFFF";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 sm:p-4 shadow-lg rounded-lg border border-gray-200 max-w-[200px] sm:max-w-xs">
                <p className="font-semibold text-sm sm:text-base" style={{ color: PRIMARY }}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-xs sm:text-sm">
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const ChartsSection = ({ totalApprovals, totalRejections }) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">

            {/* Bar Chart */}
            <div className="rounded-2xl p-4 sm:p-6 shadow-lg" style={{ backgroundColor: CARD_BG }}>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6" style={{ color: PRIMARY }}>
                    Approvals vs Rejections
                </h2>
                <ResponsiveContainer width="100%" height={250} minHeight={200}>
                    <BarChart data={staffData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <YAxis tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="approvals" fill={SUCCESS} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="rejections" fill={DANGER} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="rounded-2xl p-4 sm:p-6 shadow-lg" style={{ backgroundColor: CARD_BG }}>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6" style={{ color: PRIMARY }}>
                    Average Decision Time
                </h2>
                <ResponsiveContainer width="100%" height={250} minHeight={200}>
                    <LineChart data={staffData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <YAxis tick={{ fill: TEXT_LIGHT, fontSize: 12 }} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="avgTime"
                            stroke={PRIMARY}
                            strokeWidth={3}
                            dot={{ fill: PRIMARY_LIGHT, stroke: PRIMARY, r: 4 }}
                            activeDot={{ r: 6, fill: PRIMARY_LIGHT }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Pie Chart + Staff Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 xl:col-span-2">
                {/* Pie Chart */}
                <div className="rounded-2xl p-4 sm:p-6 shadow-lg" style={{ backgroundColor: CARD_BG }}>
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6" style={{ color: PRIMARY }}>
                        Request Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={250} minHeight={200}>
                        <PieChart>
                            <Pie
                                data={[
                                    { name: "Approvals", value: totalApprovals },
                                    { name: "Rejections", value: totalRejections },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                                labelLine={false}
                            >
                                <Cell fill={SUCCESS} />
                                <Cell fill={DANGER} />
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Staff Table */}
                <div>
                    <StaffTable />
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;
