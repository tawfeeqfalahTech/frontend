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
    tooltip: { y: { formatter: value => value + " مشروع" } },
}

export default function OwnerPieChart({ empty = false }) {
    const totalProjects = empty ? 0 : data.reduce((sum, item) => sum + item.value, 0)

    return (
        <section className="w-full min-w-0 rounded-2xl border border-slate-100 bg-white px-5 pb-2 pt-5 shadow-sm" dir="rtl" aria-labelledby="status-chart-title">
            <h2 id="status-chart-title" className="mb-4 text-lg font-bold text-slate-800">توزيع المشاريع حسب الحالة</h2>
            <div className="flex flex-col items-center gap-4 py-2">
                <div className="relative h-44 w-44 shrink-0">
                    {empty ? <div className="absolute inset-[18px] rounded-full border-[18px] border-slate-100" /> : <ApexChart type="donut" options={options} series={data.map(item => item.value)} height={176} width={176} label="توزيع المشاريع حسب الحالة" />}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-extrabold leading-none text-slate-900">{totalProjects}</span>
                        <span className="mt-1 text-[11px] font-semibold text-slate-500">إجمالي المشاريع</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
