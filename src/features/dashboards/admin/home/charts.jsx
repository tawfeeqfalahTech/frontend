"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Activity, ChartPie } from "lucide-react";
import { surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { EmptyState, SectionTitle } from "./states";
import { formatNumber } from "./data";
import styles from "./AdminDashboard.module.css";

const ApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <div className={`${styles.skeleton} h-full w-full rounded-xl`} role="status" aria-label="جارٍ تحميل الرسم البياني" />,
});

const chartDefaults = {
    fontFamily: "var(--font-cairo), sans-serif",
    foreColor: "#64748B",
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: false },
    parentHeightOffset: 0,
};

export function ActivityChart({ data }) {
    const hasActivity = data.some((item) => item.count > 0);
    const latest = data.at(-1);
    const peak = data.reduce((highest, item) => item.count > (highest?.count ?? -1) ? item : highest, null);
    const series = useMemo(() => [{ name: "المستخدمون النشطون", data: data.map((item) => item.count) }], [data]);
    const options = useMemo(() => ({
        chart: { ...chartDefaults, type: "area" },
        colors: ["#1E4C6F"],
        stroke: { curve: "smooth", width: 3.18, lineCap: "round" },
        fill: { type: "gradient", gradient: { shadeIntensity: 0, opacityFrom: 0.28, opacityTo: 0.015, stops: [0, 95, 100] } },
        dataLabels: { enabled: false },
        markers: { size: 4.24, colors: ["#fff"], strokeColors: "#1E4C6F", strokeWidth: 2.12, hover: { size: 6.36 } },
        grid: { borderColor: "#E5EDF3", strokeDashArray: 4, padding: { top: 8, right: 12, bottom: 0, left: 8 }, xaxis: { lines: { show: false } } },
        xaxis: {
            categories: data.map((item) => item.day),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { rotate: 0, hideOverlappingLabels: false, style: { fontSize: "11.66px" } },
            tooltip: { enabled: false },
            crosshairs: { stroke: { color: "#B8CBD9", dashArray: 4 } },
        },
        yaxis: { min: 0, tickAmount: 4, forceNiceScale: true, labels: { formatter: (value) => formatNumber(Math.round(value)), style: { fontSize: "11.66px" } } },
        tooltip: { theme: "light", shared: true, intersect: false, marker: { show: false }, y: { formatter: (value) => `${formatNumber(value)} مستخدم نشط`, title: { formatter: () => "" } } },
        legend: { show: false },
        responsive: [{ breakpoint: 480, options: { xaxis: { labels: { style: { fontSize: "9.54px" } } }, grid: { padding: { left: 0, right: 4 } }, markers: { size: 3.18 } } }],
    }), [data]);
    return <section id="activity" aria-labelledby="activity-title" className={`${surfaceClass} ${styles.chartCard} min-w-0 scroll-mt-6 p-4`}>
        <SectionTitle id="activity-title" title="المستخدمون النشطون آخر 7 أيام" description="عدد المستخدمين الفريدين الذين استخدموا المنصة يومياً" />
        {hasActivity ? <>
            <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div><dt className="text-[11.66px] text-[#64748B]">آخر يوم · {latest.day}</dt><dd className="mt-1 flex items-baseline gap-2"><span className="text-[25.44px] font-extrabold tabular-nums text-[#1E4C6F]">{formatNumber(latest.count)}</span><span className="text-[11.66px] text-[#64748B]">مستخدم نشط</span></dd></div>
                <div className="border-s border-[#E5EDF3] ps-4"><dt className="text-[11.66px] text-[#64748B]">أعلى نشاط · {peak.day}</dt><dd className="mt-1 text-[16.96px] font-bold tabular-nums text-[#367C59]">{formatNumber(peak.count)}</dd></div>
            </dl>
            <div dir="ltr" className={`${styles.chart} mt-1 h-[190.8px] min-w-0 text-[12.72px]`} role="img" aria-label="رسم بياني لأعداد المستخدمين النشطين خلال آخر 7 أيام">
                <ApexChart options={options} series={series} type="area" height={190.8} width="100%" />
            </div>
        </> : <EmptyState Icon={Activity} title="لا يوجد نشاط خلال هذه الفترة" description="ستظهر هنا إحصائيات النشاط عندما يبدأ المستخدمون باستخدام المنصة." />}
    </section>;
}

export function SectorChart({ data }) {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const series = useMemo(() => data.map((item) => item.count), [data]);
    const options = useMemo(() => ({
        chart: { ...chartDefaults, type: "donut" },
        labels: data.map((item) => item.name),
        colors: data.map((item) => item.color),
        stroke: { width: 4.24, colors: ["#fff"], lineCap: "round" },
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: { pie: { expandOnClick: false, donut: { size: "76%", labels: {
            show: true,
            name: { show: true, fontSize: "10.6px", color: "#64748B", offsetY: 19.08 },
            value: { show: true, fontSize: "27.56px", fontWeight: 800, color: "#1E4C6F", offsetY: -12.72, formatter: formatNumber },
            total: { show: true, showAlways: true, label: "إجمالي المشاريع", color: "#64748B", fontSize: "10.6px", formatter: () => formatNumber(total) },
        } } } },
        tooltip: { theme: "light", y: { formatter: (value) => `${formatNumber(value)} مشروع (${Math.round(value / total * 100)}%)` } },
        states: { hover: { filter: { type: "lighten", value: 0.08 } }, active: { filter: { type: "none" } } },
    }), [data, total]);
    return <section id="sectors" aria-labelledby="sectors-title" className={`${surfaceClass} ${styles.chartCard} min-w-0 scroll-mt-6 p-4`}>
        <SectionTitle id="sectors-title" title="توزيع المشاريع حسب المجال" description="عدد المشاريع ونسبتها من إجمالي المشاريع في المنصة" />
        {total > 0 ? <div className={styles.sectorContent}>
            <ul className="grid min-w-0 gap-4 text-[12.72px]">{data.map((item) => <li key={item.name}>
                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#4B708C]"><span aria-hidden="true" style={{ background: item.color }} className="size-2 shrink-0 rounded-full" />{item.name}</span>
                    <span className="flex items-center gap-2"><span className="tabular-nums text-[#64748B]">{formatNumber(item.count)}</span><span dir="ltr" className="min-w-9 text-left font-bold tabular-nums">{Math.round(item.count / total * 100)}%</span></span>
                </div>
                <div aria-hidden="true" className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#F0F4F7]"><div className="h-full rounded-full" style={{ width: `${item.count / total * 100}%`, background: item.color }} /></div>
            </li>)}</ul>
            <div className={`${styles.chart} ${styles.sectorPlot}`} dir="ltr" role="img" aria-label={`توزيع ${formatNumber(total)} مشروعاً حسب المجال، والتفاصيل في القائمة المجاورة`}>
                <ApexChart options={options} series={series} type="donut" height="100%" width="100%" />
            </div>
        </div> : <EmptyState Icon={ChartPie} title="لا توجد مشاريع لعرض توزيعها" description="عند إضافة مشاريع، ستظهر المجالات هنا مع عدد المشاريع ونسبتها." />}
    </section>;
}
