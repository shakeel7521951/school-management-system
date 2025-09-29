import React from "react";
import { staffData } from "./constants";

const COLORS = {
    primary: "#104C80",
    card: "#F8FAFC",
    text: "#1E293B",
    textLight: "#64748B",
    success: "#104C80",
    danger: "#DC2626",
    warning: "#F59E0B",
};

const StaffTable = () => {
    return (
        <div
            className="rounded-2xl p-6 shadow-lg"
            style={{ backgroundColor: COLORS.card }}
        >
            <h2
                className="text-xl font-semibold mb-6"
                style={{ color: COLORS.primary }}
            >
                Staff Performance Details
            </h2>

            {/* ---------- Desktop Table ---------- */}
            <div className="hidden md:block rounded-xl border" style={{ borderColor: "#E2E8F0" }}>
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr style={{ backgroundColor: `${COLORS.primary}10` }}>
                            <th className="py-1 px-2 text-left font-semibold text-sm md:text-base" style={{ color: COLORS.primary }}>
                                Staff Member
                            </th>
                            <th className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.primary }}>
                                Approvals
                            </th>
                            <th className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.primary }}>
                                Rejections
                            </th>
                            <th className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.primary }}>
                                Avg Time (hrs)
                            </th>
                            <th className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.primary }}>
                                Efficiency
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffData.map((staff, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50 transition-colors" style={{ borderColor: "#E2E8F0" }}>
                                <td className="py-3 px-4 font-medium text-sm md:text-base" style={{ color: COLORS.text }}>
                                    {staff.name}
                                </td>
                                <td className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.success }}>
                                    {staff.approvals}
                                </td>
                                <td className="py-3 px-2 md:px-4 text-center font-semibold text-sm md:text-base" style={{ color: COLORS.danger }}>
                                    {staff.rejections}
                                </td>
                                <td className="py-3 px-2 md:px-4 text-center text-sm md:text-base" style={{ color: COLORS.primary }}>
                                    {staff.avgTime}
                                </td>
                                <td className="py-3 px-2 md:px-4 text-center">
                                    <EfficiencyBar efficiency={staff.efficiency} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ---------- Mobile Cards ---------- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {staffData.map((staff, index) => (
                    <div
                        key={index}
                        className="rounded-xl border p-4 shadow-sm bg-white"
                        style={{ borderColor: "#E2E8F0" }}
                    >
                        <h3 className="font-semibold text-lg mb-2" style={{ color: COLORS.primary }}>
                            {staff.name}
                        </h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-600">Approvals:</span>{" "}
                                <span style={{ color: COLORS.success }}>{staff.approvals}</span>
                            </p>
                            <p><span className="font-medium text-gray-600">Rejections:</span>{" "}
                                <span style={{ color: COLORS.danger }}>{staff.rejections}</span>
                            </p>
                            <p><span className="font-medium text-gray-600">Avg Time:</span>{" "}
                                <span style={{ color: COLORS.primary }}>{staff.avgTime} hrs</span>
                            </p>
                            <p className="font-medium text-gray-600">Efficiency:</p>
                            <EfficiencyBar efficiency={staff.efficiency} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EfficiencyBar = ({ efficiency }) => {
    const color =
        efficiency > 80
            ? COLORS.success
            : efficiency > 70
                ? COLORS.warning
                : COLORS.danger;

    return (
        <div className="flex items-center gap-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                    className="h-2 rounded-full"
                    style={{
                        width: `${efficiency}%`,
                        backgroundColor: color,
                    }}
                ></div>
            </div>
            <span className="text-sm text-gray-500">{efficiency}%</span>
        </div>
    );
};

export default StaffTable;
