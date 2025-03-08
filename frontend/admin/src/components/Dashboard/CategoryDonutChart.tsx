import * as React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const data = [
    { name: "New", value: 400 },
    { name: "Men", value: 300 },
    { name: "Women", value: 300 },
    { name: "Kids", value: 200 },
    { name: "Outlet", value: 100 },
];

const CategoryDonutChart: React.FC = () => {
    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>

            <PieChart width={270} height={280}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <div className="mt-4 flex flex-col items-center space-y-2">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center space-x-2">
                        <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                        ></span>
                        <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDonutChart;
