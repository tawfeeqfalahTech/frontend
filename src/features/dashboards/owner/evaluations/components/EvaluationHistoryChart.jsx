"use client"

import { useMemo } from "react"
import ApexChart from "./ApexChart"
import { evaluationDimensions } from "../data/mockEvaluations"

const EvaluationHistoryChart = ({ evaluations }) => {
    const series = useMemo(() => evaluationDimensions.map((dimension, index) => ({
        name: dimension.label,
        data: evaluations.map(evaluation => evaluation.scores[index]),
    })), [evaluations])

    const options = useMemo(() => ({
        chart: {
            type: "bar",
            fontFamily: "Cairo, sans-serif",
            foreColor: "#4B5563",
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: true, speed: 350 },
        },
        colors: evaluationDimensions.map(dimension => dimension.color),
        plotOptions: { bar: { horizontal: false, columnWidth: "60%", borderRadius: 3.6, borderRadiusApplication: "end" } },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2.7, colors: ["transparent"] },
        fill: { opacity: 1 },
        grid: { borderColor: "#E5E7EB", xaxis: { lines: { show: false } } },
        xaxis: {
            categories: evaluations.map(evaluation => evaluation.label),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { fontSize: "14px" }, rotate: 0, trim: false },
            tooltip: { enabled: false },
        },
        yaxis: { min: 0, max: 100, tickAmount: 4, labels: { formatter: value => Math.round(value).toString() } },
        legend: { position: "bottom", horizontalAlign: "center", fontSize: "14px", itemMargin: { horizontal: 11, vertical: 7 } },
        tooltip: { shared: true, intersect: false, y: { formatter: value => value + " / 100" } },
        responsive: [{ breakpoint: 640, options: { plotOptions: { bar: { columnWidth: "76%" } }, yaxis: { show: false, min: 0, max: 100 }, grid: { padding: { left: 0, right: 0 } }, legend: { fontSize: "11px", itemMargin: { horizontal: 5, vertical: 4 } }, xaxis: { labels: { style: { fontSize: "10px" } } } } }],
    }), [evaluations])

    return (
        <section className="rounded-[14px] bg-white p-[22px] shadow-[0_4px_29px_#1E4C6F33]" aria-labelledby="history-chart-title">
            <h2 id="history-chart-title" className="mb-[22px] text-[17px] font-bold leading-[26px] text-[#111827]">تطور أبعاد التقييم عبر الزمن</h2>
            <div className="min-w-0 overflow-hidden">
                <ApexChart type="bar" options={options} series={series} height={340} label="مخطط أعمدة يوضح أبعاد التقييم من 100 عبر الزمن" />
            </div>
        </section>
    )
}

export default EvaluationHistoryChart
