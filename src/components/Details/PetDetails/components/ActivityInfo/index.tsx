import React from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

// Регистрируем необходимые модули
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,

  Filler,
);

const getLastFiveDays = () => {
  const result = [];

  const today = new Date();

  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    result.push(date.getDate());
  }

  return result.reverse();
};

const barData = {
  labels: getLastFiveDays(),
  datasets: [
    {
      label: "минуты",
      data: [44, 34, 22, 30, 63],
      backgroundColor: "#8884d8",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Активность питомца за последние пять дней",
      font: {
        size: 16,
        weight: "bold",
      },
    },
  },
};

const lineData = {
  labels: getLastFiveDays(),
  datasets: [
    {
      label: "Вес питомца",
      data: [5, 5.2, 5.4, 5.3, 5.1],
      pointStyle: false,
      fill: true,
      borderWidth: 2,
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.6)",
      tension: 0.4,
    },
  ],
};

const lineOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 8,
      ticks: {
        stepSize: 0.1,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

// Todo поработать на типами
export const ActivityInfo = () => {
  return (
    <>
      <Bar data={barData} options={barOptions} />
      <Line data={lineData} options={lineOptions} />
    </>
  );
};
