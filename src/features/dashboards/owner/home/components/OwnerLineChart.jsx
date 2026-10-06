"use client"

import { useMemo } from "react"
import { ArrowUpRight } from "lucide-react"
import ApexChart from "../../evaluations/components/ApexChart"

const weeklyInterest = [24, 40, 18, 32, 55, 48, 70]
const days = ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]

export default function OwnerLineChart({ empty = false }) {
    const series = useMemo(() => [{ name: "المهتمون", data: empty ? days.map(() => 0) : weeklyInterest }], [empty])
    const options = useMemo(() => ({
        chart: {
            type: "area", fontFamily: "Cairo, sans-serif", foreColor: "#64748B",
            toolbar: { show: false }, zoom: { enabled: false }, animations: { enabled: false },
            parentHeightOffset: 0,
        },
        colors: ["#2563EB"],
        stroke: { curve: "straight", width: 3 },
        fill: { type: "gradient", gradient: { shadeIntensity: 0, opacityFrom: 0.3, opacityTo: 0, stops: [5, 95] } },
        dataLabels: { enabled: false },
        grid: { borderColor: "#F1F5F9", strokeDashArray: 4, xaxis: { lines: { show: false } }, padding: { top: -20, left: -8, right: 2, bottom: -22 } },
        xaxis: {
            categories: days, axisBorder: { show: false }, axisTicks: { show: false },
            tooltip: { enabled: false },
            labels: { rotate: 0, hideOverlappingLabels: false, style: { fontSize: "12px", fontWeight: 500 } },
        },
        yaxis: { min: 0, max: 80, tickAmount: 4, labels: { style: { fontSize: "12px" }, formatter: value => Math.round(value).toString() } },
        markers: { size: 0, hover: { size: 4 } },
        tooltip: { theme: "dark", y: { formatter: value => value + " مهتم" } },
        responsive: [{ breakpoint: 480, options: { xaxis: { labels: { style: { fontSize: "9px" } } }, grid: { padding: { left: -6, right: 2 } } } }],
    }), [])

    return (
        <section className="w-full min-w-0 rounded-2xl border border-slate-100 bg-white px-4 pb-6 pt-4 shadow-sm" dir="rtl" aria-labelledby="interest-chart-title">
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h2 id="interest-chart-title" className="text-base font-bold text-slate-800">عدد المهتمين</h2>
                    <p className="pt-1 text-xs text-slate-500">إحصائيات الإقبال للأيام السبعة الماضية</p>
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1">
                    <span className="text-2xl font-bold text-slate-900">{empty ? 0 : 147}</span>
                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        <span dir="ltr">{empty ? "0%" : "+14.5%"}</span>
                    </div>
                </div>
            </div>
            <div className="h-48 min-w-0 overflow-hidden">
                <ApexChart type="area" options={options} series={series} height={192} label="عدد المهتمين خلال الأيام السبعة الماضية" />
            </div>
        </section>
    )
}
