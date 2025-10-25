import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ChartsSection from "../../components/dashboard/Analytics/ChartsSection";
import { COLORS } from "../../components/dashboard/Analytics/constants";
import {
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaChartLine,
} from "react-icons/fa";
import { useGetRegistrationsQuery } from "../../redux/slices/RegistrationApi";
import { useTranslation } from "react-i18next";

const AnalyticsPage = () => {
    const { t } = useTranslation("analytics");
    const [timeRange] = useState("monthly");

    // Fetch registrations from backend
    const { data, isLoading, isError } = useGetRegistrationsQuery();
    const registrations = Array.isArray(data?.data) ? data.data : [];

    // Metrics
    const { totalRequests, totalApprovals, totalRejections, totalPending } = useMemo(() => {
        if (!registrations.length) {
            return { totalRequests: 0, totalApprovals: 0, totalRejections: 0, totalPending: 0 };
        }

        const approvals = registrations.filter(r => r.status === "approved").length;
        const rejections = registrations.filter(r => r.status === "rejected").length;
        const pending = registrations.filter(r => r.status === "pending").length;

        return {
            totalRequests: registrations.length,
            totalApprovals: approvals,
            totalRejections: rejections,
            totalPending: pending
        };
    }, [registrations]);

    // Export Excel
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(registrations);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics");
        XLSX.writeFile(workbook, "AnalyticsReport.xlsx");
    };

    // Export PDF
    const exportPDF = () => {
        const input = document.getElementById("analyticsReport");
        html2canvas(input).then(canvas => {
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("AnalyticsReport.pdf");
        });
    };

    if (isLoading) return <div className="p-8">{t("loading")}</div>;
    if (isError) return <div className="p-8 text-red-500">{t("error")}</div>;

    return (
        <div
            id="analyticsReport"
            className="min-h-screen lg:ml-64"
            style={{ backgroundColor: COLORS.background }}
        >
            {/* Header */}
            <div className="pt-8 px-8 mb-8">
                <h1 className="md:text-4xl text-3xl font-extrabold mb-2" style={{ color: COLORS.primary }}>
                    {t("title")}
                </h1>
                <p className="text-lg" style={{ color: COLORS.textLight }}>
                    {t("subtitle")}
                </p>
            </div>

            {/* KPI Cards */}
            <div className="px-8 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard label={t("kpi.total_requests")} value={totalRequests} icon={<FaClipboardList size={26} />} color={COLORS.primary} />
                <KpiCard label={t("kpi.approved")} value={totalApprovals} icon={<FaCheckCircle size={26} />} color="green" />
                <KpiCard label={t("kpi.rejected")} value={totalRejections} icon={<FaTimesCircle size={26} />} color="red" />
                <KpiCard label={t("kpi.pending")} value={totalPending} icon={<FaClock size={26} />} color="orange" />
            </div>

            {/* Charts Section */}
            <div className="px-8 mb-10">
                <ChartsSection
                    registrations={registrations}
                    totalApprovals={totalApprovals}
                    totalRejections={totalRejections}
                    totalPending={totalPending}
                />
            </div>

            {/* Export Section */}
            <div className="px-4 sm:px-6 md:px-8 pb-8 md:pb-10">
                <div
                    className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 sm:p-6 rounded-2xl"
                    style={{
                        backgroundColor: COLORS.card,
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                    }}
                >
                    {/* Left Side */}
                    <div className="text-center md:text-left">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1" style={{ color: COLORS.primary }}>
                            {t("export.heading")}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base" style={{ color: COLORS.textLight }}>
                            {t("export.description")}
                        </p>
                    </div>

                    {/* Right Side: Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 w-[150px] md:w-[420px]">
                        <button
                            onClick={exportExcel}
                            className="md:w-full flex items-center justify-center gap-4 sm:w-auto px-3 py-3 sm:px-4 md:px-2 md:py-3 rounded-xl text-xs sm:text-sm md:text-base font-semibold text-white transition-colors duration-200"
                            style={{ backgroundColor: COLORS.secondary }}
                        >
                            <FaClipboardList className="text-base sm:text-lg md:text-xl" />
                            <span>{t("export.excel_button")}</span>
                        </button>

                        <button
                            onClick={exportPDF}
                            className="md:w-full flex items-center justify-center gap-4 sm:w-auto px-3 sm:px-4 md:px-2 py-3 md:py-2 rounded-xl text-xs sm:text-sm md:text-sm font-semibold text-white transition-colors duration-200"
                            style={{ backgroundColor: COLORS.primary }}
                        >
                            <FaChartLine className="text-base sm:text-lg md:text-xl" />
                            <span>{t("export.pdf_button")}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ label, value, icon, color }) => (
    <div
        className="rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        style={{
            background: "linear-gradient(135deg, #fff, #F1F5F9)",
            borderLeft: `4px solid ${color}`
        }}
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium mb-2" style={{ color: COLORS.textLight }}>{label}</p>
                <p className="text-3xl font-bold" style={{ color }}>{value}</p>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                {icon}
            </div>
        </div>
    </div>
);

export default AnalyticsPage;
