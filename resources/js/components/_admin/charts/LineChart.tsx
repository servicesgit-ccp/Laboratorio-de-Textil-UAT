import React from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Tendencia de Productividad</h2>

            <Chart
                type="line"
                height={350}
                series={[
                    {
                        name: "Productividad",
                        data: data.map(m => m.productivity),
                    }
                ]}
                options={{
                    stroke: { curve: "smooth", width: 3 },
                    xaxis: { categories: data.map(m => m.month) },
                    chart: { toolbar: { show: false } },
                }}
            />
        </div>
    );
};

export default LineChart;
