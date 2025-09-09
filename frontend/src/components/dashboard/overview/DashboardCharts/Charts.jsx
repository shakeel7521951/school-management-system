import React from "react";
import VisitorTrendsChart from "./VisitorTrendsChart";
import ComplaintsPieChart from "./ComplaintsPieChart";
import DocumentApprovalBarChart from "./DocumentApprovalBarChart";
import ComplaintsDoughnutChart from "./ComplaintsDoughnutChart";

const Charts = () => {
  return (
    <div className="space-y-6 mt-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <VisitorTrendsChart/>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <ComplaintsPieChart/>
      </div>

      <div className="bg-white p-4 border border-blue-900 h-[200px] rounded-xl shadow">
        <DocumentApprovalBarChart/>
      </div>
       <div className="bg-white p-4 rounded-xl shadow">
        <ComplaintsDoughnutChart/>
      </div>
    </div>
  );
};

export default Charts;
