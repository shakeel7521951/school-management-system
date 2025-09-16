import React from "react";
import VisitorTrendsChart from "./VisitorTrendsChart";
import ComplaintsPieChart from "./ComplaintsPieChart";
import DocumentApprovalBarChart from "./DocumentApprovalBarChart";
import ComplaintsDoughnutChart from "./ComplaintsDoughnutChart";

const Charts = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Visitor Trends */}
      <div className="bg-white p-4 rounded-xl shadow">
        <VisitorTrendsChart />
      </div>

      {/* Complaints Pie */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ComplaintsPieChart />
      </div>

      {/* Document Approval Bar */}
      <div className="bg-white p-4 border border-blue-900 h-[250px] rounded-xl shadow">
        <DocumentApprovalBarChart />
      </div>

      {/* Complaints Doughnut */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ComplaintsDoughnutChart />
      </div>
    </div>
  );
};

export default Charts;
