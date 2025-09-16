import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ComplaintsDoughnutChart = () => {
  const data = {
    labels: ["Resolved", "Pending", "Escalated"],
    datasets: [
      {
        label: "Complaints Status",
        data: [25, 10, 5],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows height control
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Complaints Status Overview" },
    },
  };

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ComplaintsDoughnutChart;
