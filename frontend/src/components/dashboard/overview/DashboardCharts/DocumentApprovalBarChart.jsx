import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DocumentApprovalBarChart = () => {
  const data = {
    labels: ["Teacher A", "Teacher B", "HR", "Finance", "Principal"],
    datasets: [
      {
        label: "Approved",
        data: [15, 20, 10, 8, 12],
        backgroundColor: "#4F46E5",
      },
      {
        label: "Rejected",
        data: [2, 1, 3, 2, 0],
        backgroundColor: "#EF4444",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows height control via CSS
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Document Approvals & Rejections" },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DocumentApprovalBarChart;
