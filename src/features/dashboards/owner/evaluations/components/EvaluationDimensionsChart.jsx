"use client"

import { useMemo } from "react"
import ApexChart from "./ApexChart"
import { evaluationDimensions } from "../data/mockEvaluations"

const EvaluationDimensionsChart = ({ evaluation }) => {
    const series = useMemo(() => [{ name: "الدرجة", data: evaluation.scores }], [evaluation])
    const options = useMemo(() => ({
        chart: { type: "bar", fontFamily: "Cairo, sans-serif", foreColor: "#4B5563", toolbar: { show: false }, zoom: { enabled: false } },
        colors: evaluationDimensions.map(dimension => dimension.color),
        plotOptions: { bar: { horizontal: false, distributed: true, columnWidth: "32%", borderRadius: 5, borderRadiusApplication: "end", dataLabels: { position: "top" }, colors: { backgroundBarColors: ["#F9FAFB"], backgroundBarRadius: 5 } } },
        dataLabels: { enabled: true, formatter: value => value + " / 100", offsetY: -26, style: { fontSize: "13px", fontWeight: 600, colors: ["#111827"] } },
        legend: { show: false },
        grid: { show: false, padding: { top: 30 } },
        xaxis: { categories: evaluationDimensions.map(dimension => dimension.label.split(" ")), axisBorder: { show: false }, axisTicks: { show: false }, labels: { rotate: 0, trim: false, style: { fontSize: "12px" } }, tooltip: { enabled: false } },
        yaxis: { min: 0, max: 100, show: false },
        tooltip: { x: { show: true }, y: { formatter: value => value + " / 100" } },
        fill: { opacity: 1 },
        responsive: [{ breakpoint: 640, options: { plotOptions: { bar: { columnWidth: "48%" } }, dataLabels: { style: { fontSize: "10px" }, offsetY: -22 }, xaxis: { labels: { style: { fontSize: "9px" } } }, grid: { padding: { left: 0, right: 0, top: 26 } } } }],
    }), [])

    return <ApexChart type="bar" options={options} series={series} height={275} label={"أبعاد تقييم " + evaluation.date} />
}

export default EvaluationDimensionsChart
