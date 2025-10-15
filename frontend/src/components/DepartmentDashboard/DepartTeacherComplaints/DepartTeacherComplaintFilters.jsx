import React from "react";
import { useTranslation } from "react-i18next";
import { FaFilter, FaFileExport, FaSearch } from "react-icons/fa";

const DepartTeacherComplaintFilters = ({
  filterStatus,
  setFilterStatus,
  filterImpact,
  setFilterImpact,
  filterType,
  setFilterType,
  searchTerm,
  setSearchTerm,
  itemsPerPage,
  setItemsPerPage,
  filteredComplaints = [], // ✅ default empty array
  resetFilters,
  exportData,
  setCurrentPage,
}) => {
  const { t } = useTranslation("departTeacherComplaintFilter");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-gray-500" /> {t("header.title")}
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm text-[#1a4480] font-medium hover:underline flex items-center gap-1"
        >
          {t("header.reset")}
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("search.label")}
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={t("search.placeholder")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 shadow-sm w-full"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("status.label")}
          </label>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("status.options.all")}</option>
            <option value="pending">{t("status.options.pending")}</option>
            <option value="in_progress">{t("status.options.in_progress")}</option>
            <option value="resolved">{t("status.options.resolved")}</option>
            <option value="rejected">{t("status.options.rejected")}</option>
          </select>
        </div>

        {/* Impact */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("impact.label")}
          </label>
          <select
            value={filterImpact}
            onChange={(e) => {
              setFilterImpact(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("impact.options.all")}</option>
            <option value="stress">{t("impact.options.stress")}</option>
            <option value="performance">{t("impact.options.performance")}</option>
            <option value="health">{t("impact.options.health")}</option>
            <option value="isolation">{t("impact.options.isolation")}</option>
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            {t("type.label")}
          </label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("type.options.all")}</option>
<option value="Safety at Work">{t("type.options.safety")}</option>
<option value="Stress">{t("type.options.stress")}</option>
<option value="Work Environment">{t("type.options.work_env")}</option>
<option value="Colleagues">{t("type.options.colleagues")}</option>
<option value="Management">{t("type.options.management")}</option>
<option value="Rights">{t("type.options.rights")}</option>
<option value="Other">{t("type.options.other")}</option>

          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
        <div className="text-sm text-gray-700 text-center sm:text-left">
          {t("footer.showing", { count: filteredComplaints?.length || 0 })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 w-full sm:w-auto"
          >
            <option value={5}>{t("footer.items_per_page.5")}</option>
            <option value={10}>{t("footer.items_per_page.10")}</option>
            <option value={20}>{t("footer.items_per_page.20")}</option>
            <option value={50}>{t("footer.items_per_page.50")}</option>
          </select>

          <button
            onClick={exportData}
            className="flex items-center justify-center gap-2 bg-[#1a4480] text-white px-4 py-2.5 rounded-lg hover:bg-[#0d3260] transition shadow-sm w-full sm:w-auto"
          >
            <FaFileExport /> {t("footer.export")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartTeacherComplaintFilters;
