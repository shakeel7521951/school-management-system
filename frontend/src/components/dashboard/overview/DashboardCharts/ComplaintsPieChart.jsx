import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ComplaintsPieChart = () => {
  const data = {
    labels: ["Academic", "Facilities", "HR", "Behavior", "Admin"],
    datasets: [
      {
        label: "Complaints",
        data: [12, 5, 8, 3, 6],
        backgroundColor: ["#6366F1", "#F59E0B", "#10B981", "#EF4444", "#8B5CF6"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Fill parent height
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Complaints by Type" },
    },
  };

  return (
    <div className="w-full h-full  mt-[-18px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ComplaintsPieChart;
