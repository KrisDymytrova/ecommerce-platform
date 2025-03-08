import * as React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
    labels: ["01 Mar", "02 Mar", "03 Mar", "04 Mar", "05 Mar", "06 Mar", "07 Mar"],
    datasets: [
        {
            label: "New Users",
            data: [12, 25, 10, 30, 18, 40, 22],
            borderColor: "#6A5ACD",
            backgroundColor: "rgba(106, 90, 205, 0.5)",
            fill: true,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
    },
};

const NewUsersChart: React.FC = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">New Users per Day</h3>
            <Line data={data} options={options} />
        </div>
    );
};

export default NewUsersChart;
