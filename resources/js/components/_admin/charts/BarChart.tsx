import React from "react";
import ReactApexChart from "react-apexcharts";
import {Col, Row} from "react-bootstrap";
import {overViewChartData} from "@/pages/dashboard/sales/data";
import IconifyIcon from "@/components/wrappers/IconifyIcon";

const BarChart = ({ data }) => {
    const categories = data.map(m => m.month);

    const series = [
        {
            name: "Total",
            type: "bar",
            data: data.map(m => m.total),
        },
        {
            name: "Pendientes",
            type: "bar",
            data: data.map(m => m.pending),
        },
        {
            name: "Canceladas",
            type: "bar",
            data: data.map(m => m.cancelled),
        },
        {
            name: "Completadas",
            type: "bar",
            data: data.map(m => m.completed),
        },
    ];

    const options = {
        chart: {
            height: 300,
            type: "line",
            toolbar: { show: false },
        },
        stroke: {
            curve: "smooth",
            width: [0, 0, 0, 0],
            dashArray: [0, 0, 0, 0],
        },
        fill: {
            opacity: [1, 1, 1, 1],
            type: ["solid", "solid", "solid", "solid"],
        },
        markers: {
            size: [0, 0, 0, 4],
            strokeWidth: 2,
            hover: { size: 6 }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories,
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                offsetX: -10,
            },
        },
        plotOptions: {
            bar: {
                columnWidth: "40%",
                borderRadius: 4,
            }
        },
        legend: {
            show: true,
            horizontalAlign: "center",
            itemMargin: { horizontal: 10 },
        },
        colors: ["#859fe3", "#ffdc79", "#e0666e", "#71bb87"],
        tooltip: {
            shared: true,
        },
    };

    return (

        <div className="border-0 rounded-4 bg-white p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Resumen de Pruebas por Mes</h2>

            <ReactApexChart
                height={500}
                options={options}
                series={series}
                type="line"
            />
        </div>
    );
};

export default BarChart;
