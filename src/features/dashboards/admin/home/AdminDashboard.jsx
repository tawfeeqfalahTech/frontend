"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, Clock3, Download, FolderOpen, HeartHandshake, Sparkles, Users, X } from "lucide-react";
import { surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { ActivityChart, SectorChart } from "./charts";
import { AdminError, AdminFrame, AdminLoading, EmptyState, exportButtonClass, SectionTitle } from "./states";
import { buildAdminCsv, formatNumber } from "./data";
import styles from "./AdminDashboard.module.css";

function SummaryCards({ data }) {
    const cards = [
        { id: "users", href: "#activity", label: "المستخدمون حسب الدور", value: formatNumber(data.users.total), Icon: Users, accent: "#1E4C6F", soft: "#E5EDF4", tint: "#F6F9FC", details: [{ label: "صاحب مشروع", value: data.users.owners }, { label: "مستثمر", value: data.users.investors }, { label: "إدارة", value: data.users.admins }] },
        { id: "projects", href: "#sectors", label: "المشاريع حسب الحالة", value: formatNumber(data.projects.total), Icon: FolderOpen, accent: "#367C59", soft: "#E1EEE6", tint: "#F5FAF7", details: [{ label: "منشور", value: data.projects.published }, { label: "قيد المراجعة", value: data.projects.reviewing }, { label: "مسودة", value: data.projects.drafts }] },
        { id: "ai", href: "#ai-note", label: "متوسط تقييم AI العام", value: data.evaluation.average === null ? "—" : `${formatNumber(data.evaluation.average)}%`, Icon: Sparkles, accent: "#9E7F4D", soft: "#EDE5D8", tint: "#FCFAF6" },
    ];
    return <div className="grid grid-cols-1 gap-4 min-[760px]:grid-cols-3">
        {cards.map(({ id, href, label, value, Icon, accent, soft, tint, details }, index) => <a key={id} id={id} href={href} style={{ "--stat-accent": accent, "--stat-soft": soft, "--stat-tint": tint, "--stat-delay": `${index * 70}ms` }} className={`${surfaceClass} ${styles.statCard} min-w-0 scroll-mt-6 rounded-2xl p-4`}>
            <span aria-hidden="true" className={styles.statDecoration} />
            <div className="flex items-center justify-between gap-3"><h2 className="text-xs font-semibold text-[#4B708C]">{label}</h2><span className={`${styles.statIcon} flex size-8 shrink-0 items-center justify-center rounded-lg`}><Icon size={17} aria-hidden="true" /></span></div>
            <p dir="ltr" className="mt-2 text-right text-[28px] font-extrabold leading-none tracking-tight tabular-nums">{value}</p>
            {details ? <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-[#E5EDF3] pt-2 text-[11px] leading-5 text-[#64748B]">{details.map((detail) => <div key={detail.label} className="flex items-center gap-1.5"><dd className="font-bold tabular-nums text-[#4B708C]">{formatNumber(detail.value)}</dd><dt>{detail.label}</dt></div>)}</dl> : <p id="ai-note" className="mt-3 scroll-mt-6 border-t border-[#EBE3D7] pt-2 text-[11px] leading-5 text-[#9E7F4D]">{data.evaluation.count ? <>بناءً على تقييم <b className="tabular-nums">{formatNumber(data.evaluation.count)}</b> مشروعاً</> : "لا توجد مشاريع مقيّمة بعد"}</p>}
        </a>)}
    </div>;
}

function InterestRequests({ data }) {
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    const items = [
        { label: "إجمالي الطلبات", count: total, color: "#1E4C6F", soft: "#E5EDF4", Icon: HeartHandshake },
        { label: "معلّق", count: data.pending, color: "#9E7F4D", soft: "#F4EFE6", Icon: Clock3 },
        { label: "مقبول", count: data.accepted, color: "#367C59", soft: "#E1EEE6", Icon: CheckCheck },
        { label: "مرفوض", count: data.rejected, color: "#B45353", soft: "#FBECEC", Icon: X },
        { label: "ملغي", count: data.cancelled, color: "#64748B", soft: "#EEF1F4", Icon: X },
    ];
    return <section id="requests" aria-labelledby="requests-title" className={`${surfaceClass} scroll-mt-6 p-4 sm:p-5`}>
        <SectionTitle id="requests-title" title="طلبات الاهتمام" description="ملخص حالات الطلبات التي أرسلها المستثمرون لأصحاب المشاريع" />
        {total > 0 ? <dl className="mt-5 grid grid-cols-2 gap-3 min-[760px]:grid-cols-5">{items.map(({ label, count, color, soft, Icon }, index) => <div key={label} className={`rounded-xl border border-[#E5EDF3] p-4 ${index === 0 ? "col-span-2 min-[760px]:col-span-1" : ""}`} style={{ background: index === 0 ? "#F6F9FC" : "#fff" }}>
            <dt className="flex items-center gap-2 text-xs font-semibold" style={{ color }}><span className="flex size-7 shrink-0 items-center justify-center rounded-lg" style={{ background: soft }}><Icon size={15} aria-hidden="true" /></span>{label}</dt>
            <dd className="mt-3 text-2xl font-extrabold tabular-nums" style={{ color }}>{formatNumber(count)}</dd>
        </div>)}</dl> : <EmptyState Icon={HeartHandshake} title="لا توجد طلبات اهتمام بعد" description="عندما يرسل المستثمرون طلبات اهتمام، ستظهر أعدادها وحالاتها هنا." />}
    </section>;
}

export default function AdminDashboard({ data, state = "" }) {
    const router = useRouter();
    const [exporting, setExporting] = useState(false);
    const [notice, setNotice] = useState("");
    const [exportFailed, setExportFailed] = useState(false);

    if (state === "loading") return <AdminLoading />;
    if (state === "error" || !data) return <AdminError onRetry={() => state === "error" ? router.replace("/dashboard/admin") : router.refresh()} />;

    const hasData = data.users.total > 0 || data.projects.total > 0 || data.activity.some((item) => item.count > 0) || Object.values(data.requests).some((count) => count > 0);
    const exportCsv = () => {
        if (exporting || !hasData) return;
        setExporting(true);
        setExportFailed(false);
        setNotice("");
        let url;
        let link;
        try {
            const blob = new Blob([buildAdminCsv(data)], { type: "text/csv;charset=utf-8;" });
            url = URL.createObjectURL(blob);
            link = document.createElement("a");
            link.href = url;
            link.download = "ihyaa-admin-analytics.csv";
            document.body.appendChild(link);
            link.click();
            setNotice("تم تصدير الإحصائيات في ملف CSV.");
        } catch {
            setExportFailed(true);
            setNotice("تعذر تصدير الملف. حاول مرة أخرى.");
        } finally {
            link?.remove();
            if (url) setTimeout(() => URL.revokeObjectURL(url), 1000);
            setExporting(false);
        }
    };

    return <AdminFrame action={<button type="button" onClick={exportCsv} disabled={!hasData || exporting} title={!hasData ? "لا توجد بيانات لتصديرها" : undefined} className={exportButtonClass}><Download size={17} aria-hidden="true" />{exporting ? "جارٍ التصدير…" : "تصدير CSV"}</button>}>
        <div className="mt-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs leading-6">
                <p className="text-[#64748B]">{hasData ? "ملخص النشاط في المنصة" : "لا توجد بيانات في المنصة حتى الآن"}</p>
            </div>
            <SummaryCards data={data} />
            <div className="grid items-stretch gap-4 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"><ActivityChart data={data.activity} /><SectorChart data={data.sectors} /></div>
            <InterestRequests data={data.requests} />
        </div>
        <p role={exportFailed ? "alert" : "status"} aria-live="polite" className={notice ? `mt-4 text-xs ${exportFailed ? "text-[#B45353]" : "text-[#1E4C6F]"}` : "sr-only"}>{notice}</p>
    </AdminFrame>;
}
