import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data }) => {

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Resumen de Pruebas por Mes</h2>

            <Chart
                type="bar"
                height={350}
                series={[
                    { name: "Total", data: data.map(m => m.total) },
                    { name: "Pendientes", data: data.map(m => m.pending) },
                    { name: "Canceladas", data: data.map(m => m.cancelled) },
                    { name: "Completadas", data: data.map(m => m.completed) },
                ]}
                options={{
                    chart: { toolbar: { show: false } },
                    xaxis: { categories: data.map(m => m.month) },
                    plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
                }}
            />
        </div>
    );
};

export default BarChart;
