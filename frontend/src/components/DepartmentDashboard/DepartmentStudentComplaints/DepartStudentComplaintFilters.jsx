import React from "react";
import { FaFilter, FaFileExport, FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DepartStudentComplaintFilters = ({
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
  filteredComplaints,
  resetFilters,
  exportData,
  setCurrentPage,
}) => {
  const { t } = useTranslation("departStudentComplaintFilters");

  // Pagination options (translated)
  const itemsPerPageOptions = {
    5: t("footer.show5"),
    10: t("footer.show10"),
    20: t("footer.show20"),
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-gray-500" />
          {t("filtersTitle")}
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm text-[#1a4480] font-medium hover:underline flex items-center gap-1"
        >
          {t("resetFilters")}
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1">
            {t("search.label")}
          </label>
          <div className="relative">
            <input
              id="search"
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

        {/* Status Filter */}
        <div className="flex flex-col">
          <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
            {t("status.label")}
          </label>
          <select
            id="status"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("status.all")}</option>
            <option value="pending">{t("status.pending")}</option>
            <option value="in-progress">{t("status.in-progress")}</option>
            <option value="resolved">{t("status.resolved")}</option>
            <option value="rejected">{t("status.rejected")}</option>
          </select>
        </div>

        {/* Impact Filter */}
        <div className="flex flex-col">
          <label htmlFor="impact" className="text-sm font-medium text-gray-700 mb-1">
            {t("impact.label")}
          </label>
          <select
            id="impact"
            value={filterImpact}
            onChange={(e) => {
              setFilterImpact(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("impact.all")}</option>
            <option value="physical">{t("impact.physical")}</option>
            <option value="psychological">{t("impact.psychological")}</option>
            <option value="social">{t("impact.social")}</option>
            <option value="academic">{t("impact.academic")}</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">
            {t("type.label")}
          </label>
          <select
            id="type"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
          >
            <option value="all">{t("type.all")}</option>
            <option value="physical">{t("type.physical")}</option>
            <option value="emotions">{t("type.emotions")}</option>
            <option value="bullying">{t("type.bullying")}</option>
            <option value="staff">{t("type.staff")}</option>
            <option value="learning">{t("type.learning")}</option>
            <option value="facilities">{t("type.facilities")}</option>
            <option value="bus">{t("type.bus")}</option>
            <option value="rights">{t("type.rights")}</option>
            <option value="other">{t("type.other")}</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
        <p className="text-sm text-gray-700 text-center sm:text-left">
          {t("footer.showing", { count: filteredComplaints.length })}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Items per page */}
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400 w-full sm:w-auto"
          >
            {Object.entries(itemsPerPageOptions).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>

          {/* Export button */}
          <button
            onClick={exportData}
            className="flex items-center justify-center gap-2 bg-[#1a4480] text-white px-4 py-2.5 rounded-lg hover:bg-[#0d3260] transition-all duration-150 shadow-sm w-full sm:w-auto"
          >
            <FaFileExport /> {t("footer.export")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartStudentComplaintFilters;
