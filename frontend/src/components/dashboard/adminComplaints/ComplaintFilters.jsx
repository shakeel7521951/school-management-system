import React from "react";
import { FaFilter, FaFileExport, FaSearch } from "react-icons/fa";

const ComplaintFilters = ({
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
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
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaFilter className="text-gray-500" /> Filters
                </h2>
                <button
                    onClick={resetFilters}
                    className="text-sm text-[#1a4480] font-medium hover:underline flex items-center gap-1"
                >
                    Reset Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Search</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search complaints..."
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
                    <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {/* Priority */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                        value={filterPriority}
                        onChange={(e) => {
                            setFilterPriority(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                    >
                        <option value="all">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* Type */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-200 focus:border-indigo-400"
                    >
                        <option value="all">All Types</option>
                        <option value="physical safety">Physical Safety</option>
                        <option value="Emotions">Emotions</option>
                        <option value="bullying">Bullying</option>
                        <option value="staff">Staff</option>
                        <option value="Learning">Learning</option>
                        <option value="Facilities">Facilities</option>
                        <option value="Bus">Bus</option>
                        <option value="Rights">Rights</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
                <div className="text-sm text-gray-700 text-center sm:text-left">
                    Showing {filteredComplaints.length} complaints
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
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </select>

                    <button
                        onClick={exportData}
                        className="flex items-center justify-center gap-2 bg-[#1a4480] text-white px-4 py-2.5 rounded-lg hover:bg-[#0d3260] transition shadow-sm w-full sm:w-auto"
                    >
                        <FaFileExport /> Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ComplaintFilters;
