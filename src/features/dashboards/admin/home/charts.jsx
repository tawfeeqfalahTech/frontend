"use client";

import { useId } from "react";
import { Activity, ChartPie } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { EmptyState, SectionTitle } from "./states";
import { formatNumber } from "./data";

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return <div dir="rtl" className="rounded-xl border border-[#E5EDF3] bg-white px-4 py-3 text-xs shadow-lg">
        <p className="font-semibold text-[#1E4C6F]">{label || item.name}</p>
        <p className="mt-1 text-[#64748B]"><b className="text-[#0D202F]">{formatNumber(item.value)}</b> {item.dataKey === "count" && item.payload.day ? "مستخدم نشط" : "مشروع"}</p>
    </div>;
}

export function ActivityChart({ data }) {
    const gradientId = useId().replaceAll(":", "");
    const hasActivity = data.some((item) => item.count > 0);
    return <section id="activity" aria-labelledby="activity-title" className={`${surfaceClass} min-w-0 scroll-mt-6 p-4 sm:p-5`}>
        <SectionTitle id="activity-title" title="المستخدمون النشطون آخر 7 أيام" description="عدد المستخدمين الفريدين الذين استخدموا المنصة يومياً" />
        {hasActivity ? <>
            <div dir="ltr" className="mt-5 h-60 min-w-0 text-xs" role="img" aria-label="رسم بياني لأعداد المستخدمين النشطين لكل يوم، والبيانات متاحة في الجدول أدناه">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={data} margin={{ top: 12, right: 12, left: -18, bottom: 0 }}>
                        <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1E4C6F" stopOpacity={0.2} /><stop offset="95%" stopColor="#1E4C6F" stopOpacity={0.015} /></linearGradient></defs>
                        <CartesianGrid stroke="#EAF0F5" strokeDasharray="4 4" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 10 }} tickLine={false} axisLine={false} interval={0} tickMargin={12} />
                        <YAxis tick={{ fill: "#64748B", fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} width={45} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="count" name="المستخدمون النشطون" stroke="#1E4C6F" strokeWidth={2.5} fill={`url(#${gradientId})`} isAnimationActive={false} dot={{ r: 3, strokeWidth: 2, fill: "#fff" }} activeDot={{ r: 5 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <details className="mt-4 border-t border-[#E5EDF3] pt-3 text-xs text-[#4B708C]">
                <summary className="w-fit cursor-pointer rounded-md font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F]">عرض بيانات الرسم</summary>
                <table className="mt-3 w-full text-right"><caption className="sr-only">المستخدمون النشطون خلال آخر 7 أيام</caption><thead><tr><th scope="col" className="pb-2">اليوم</th><th scope="col" className="pb-2">المستخدمون النشطون</th></tr></thead><tbody>{data.map((item) => <tr key={item.day} className="border-t border-[#E5EDF3]"><th scope="row" className="py-2 font-medium">{item.day}</th><td className="py-2 tabular-nums">{formatNumber(item.count)}</td></tr>)}</tbody></table>
            </details>
        </> : <EmptyState Icon={Activity} title="لا يوجد نشاط خلال هذه الفترة" description="ستظهر هنا إحصائيات النشاط عندما يبدأ المستخدمون باستخدام المنصة." />}
    </section>;
}

export function SectorChart({ data }) {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return <section id="sectors" aria-labelledby="sectors-title" className={`${surfaceClass} min-w-0 scroll-mt-6 p-4 sm:p-5`}>
        <SectionTitle id="sectors-title" title="توزيع المشاريع حسب المجال" description="عدد المشاريع ونسبتها من إجمالي المشاريع في المنصة" />
        {total > 0 ? <div className="mt-5 flex min-h-60 flex-wrap items-center justify-center gap-x-5 gap-y-4">
            <div className="relative size-52 shrink-0" dir="ltr" role="img" aria-label={`توزيع ${formatNumber(total)} مشروعاً حسب المجال، والتفاصيل في القائمة المجاورة`}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={data} dataKey="count" nameKey="name" innerRadius={65} outerRadius={94} paddingAngle={3} stroke="none" startAngle={90} endAngle={-270} isAnimationActive={false}>{data.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip content={<ChartTooltip />} /></PieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-extrabold tabular-nums">{formatNumber(total)}</span><span className="mt-1 text-xs text-[#64748B]">إجمالي المشاريع</span></div>
            </div>
            <ul className="min-w-44 flex-1 space-y-4 text-xs">{data.map((item) => <li key={item.name} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[#4B708C]"><span aria-hidden="true" style={{ background: item.color }} className="size-2.5 rounded-full" />{item.name}</span>
                <span className="flex items-center gap-3"><span className="tabular-nums text-[#64748B]">{formatNumber(item.count)}</span><span dir="ltr" className="min-w-9 text-left font-bold tabular-nums">{Math.round(item.count / total * 100)}%</span></span>
            </li>)}</ul>
        </div> : <EmptyState Icon={ChartPie} title="لا توجد مشاريع لعرض توزيعها" description="عند إضافة مشاريع، ستظهر المجالات هنا مع عدد المشاريع ونسبتها." />}
    </section>;
}
