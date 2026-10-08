"use client"

import ApexChart from "../../evaluations/components/ApexChart"

const data = [
    { name: "نشط", value: 8, color: "#4EA853" },
    { name: "قيد التقييم", value: 10, color: "#F7931E" },
    { name: "مرفوض", value: 6, color: "#F14336" },
]

const options = {
    chart: {
        type: "donut", fontFamily: "Cairo, sans-serif",
        toolbar: { show: false }, animations: { enabled: false },
        parentHeightOffset: 0, sparkline: { enabled: true },
    },
    labels: data.map(item => item.name),
    colors: data.map(item => item.color),
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 4, colors: ["#FFFFFF"] },
    plotOptions: { pie: { expandOnClick: false, customScale: 0.91, donut: { size: "74.3%" } } },
    tooltip: {
        enabled: true,
        style: { fontSize: "14px" },
        y: {
            formatter: value => {
                const total = data.reduce((sum, item) => sum + item.value, 0)
                const percentage = total > 0 ? (value / total) * 100 : 0
                return `${value} مشروع (${Number(percentage.toFixed(1))}%)`
            },
        },
    },
}

export default function OwnerPieChart({ empty = false }) {
    const totalProjects = empty ? 0 : data.reduce((sum, item) => sum + item.value, 0)

    return (
        <section className="flex w-full min-w-0 flex-col rounded-2xl border border-slate-100 bg-white px-4 pb-6 pt-4 shadow-sm" dir="rtl" aria-labelledby="status-chart-title">
            <h2 id="status-chart-title" className="mb-6 text-base font-bold text-slate-800">توزيع المشاريع حسب الحالة</h2>
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
                <div className="relative h-48 w-48 shrink-0">
                    {empty ? <div className="absolute inset-5 rounded-full border-[20px] border-slate-100" /> : <ApexChart type="donut" options={options} series={data.map(item => item.value)} height={192} width={192} label="توزيع المشاريع حسب الحالة" />}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold leading-none text-slate-900">{totalProjects}</span>
                        <span className="mt-1 text-xs font-semibold text-slate-500">إجمالي المشاريع</span>
                    </div>
                </div>
                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600" aria-label="حالات المشاريع">
                    {data.map(item => (
                        <li key={item.name} className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} aria-hidden="true" />
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
