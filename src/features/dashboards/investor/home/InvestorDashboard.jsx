"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Check, CheckCheck, CircleAlert, Clock3, FileText, Send } from "lucide-react";
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader";
import useInvestorProfile from "../profile/useInvestorProfile";
import useSavedProjects from "./useSavedProjects";
import { suggestedProjects } from "./data";
import { base, primaryClass, surfaceClass, EmptyState, ProjectCard, ProjectDialog, RequestRow, SavedRow, SectionHeading } from "./components";
import styles from "./InvestorDashboard.module.css";

function RequestSummary({ requests }) {
    const cards = [
        { label: "الطلبات المرسلة", hint: "كل طلبات اهتمامك", count: requests.length, Icon: Send, accent: "#1E4C6F", soft: "#E5EDF4", tint: "#F6F9FC" },
        { label: "الطلبات المقبولة", hint: "جاهزة للتواصل", count: requests.filter((request) => request.status === "accepted").length, Icon: CheckCheck, accent: "#367C59", soft: "#E1EEE6", tint: "#F5FAF7" },
        { label: "الطلبات قيد المراجعة", hint: "بانتظار رد صاحب المشروع", count: requests.filter((request) => request.status === "pending").length, Icon: Clock3, accent: "#9E7F4D", soft: "#EDE5D8", tint: "#FCFAF6" },
    ];
    return <div className="grid grid-cols-1 gap-4 min-[760px]:grid-cols-3">
        {cards.map(({ label, hint, count, Icon, accent, soft, tint }, index) => <Link key={label} href={`${base}/requests`} style={{ "--stat-accent": accent, "--stat-soft": soft, "--stat-tint": tint, "--stat-delay": `${index * 70}ms` }} className={`${surfaceClass} ${styles.statCard} min-w-0 rounded-2xl p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]`}>
            <span aria-hidden="true" className={styles.statDecoration} />
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-[#4B708C]">{label}</h2>
                <span className={`${styles.statIcon} flex size-10 shrink-0 items-center justify-center rounded-xl`}><Icon size={20} aria-hidden="true" /></span>
            </div>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
                <p className="text-[34px] font-extrabold leading-none tracking-tight text-[#0D202F]">{count}</p>
                <span className={`${styles.statHint} inline-flex items-center gap-1.5 pb-0.5 text-[11px] font-medium`}><span aria-hidden="true" className={`${styles.statDot} size-1.5 shrink-0 rounded-full`} />{hint}</span>
            </div>
        </Link>)}
    </div>;
}

function Updates({ updates, requests, onDetails }) {
    return <section id="updates" aria-labelledby="updates-title">
        <SectionHeading id="updates-title" title="آخر التحديثات" />
        {updates.length ? <ul className={`${surfaceClass} divide-y divide-[#E5EDF3] px-4 sm:px-5`}>{updates.map((update) => {
            const Icon = update.type === "saved" ? Bookmark : update.type === "request" ? Check : FileText;
            return <li key={update.id}><button type="button" onClick={() => onDetails(suggestedProjects.find((project) => project.id === update.projectId), requests.find((request) => request.projectId === update.projectId))} className="grid min-h-16 w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-3 gap-y-1 rounded-lg px-2 py-3 text-right text-sm transition-colors hover:bg-[#EDF6FC] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1E4C6F] sm:grid-cols-[2rem_minmax(0,1fr)_auto]">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E9EDF1] text-[#4B708C]"><Icon size={16} aria-hidden="true" /></span>
                <span className="leading-6 text-[#4B708C]">{update.text}</span><time className="col-start-2 text-xs text-slate-500 sm:col-start-auto">{update.time}</time>
            </button></li>;
        })}</ul> : <div className={surfaceClass}><EmptyState title="لا توجد تحديثات بعد" description="ستظهر هنا مستجدات طلباتك والمشاريع التي تتابعها." /></div>}
    </section>;
}

export default function InvestorDashboard({ data, view = "home", query = "", previewState = "" }) {
    const { profile, email } = useInvestorProfile();
    const { ids: savedIds, toggle } = useSavedProjects(data.savedIds, email || "current", Boolean(previewState));
    const [selection, setSelection] = useState(null);
    const [notice, setNotice] = useState("");
    const complete = Boolean(profile.investmentType && profile.minInvestment !== "" && profile.maxInvestment !== "" && profile.bio.trim() && profile.sectors.length);
    const showProfileBanner = data.profileState === "incomplete" || (data.profileState === "auto" && !complete);
    const saved = savedIds.map((id) => suggestedProjects.find((project) => project.id === id)).filter(Boolean);
    const openDetails = (project, request) => setSelection({ project, request });
    const saveProject = (id) => {
        try { toggle(id); setNotice(savedIds.includes(id) ? "تمت إزالة المشروع من المحفوظات" : "تم حفظ المشروع"); }
        catch { setNotice("تعذر حفظ المشروع. تحقق من إعدادات التخزين في المتصفح وحاول مجددًا."); }
    };
    const headings = { home: "الرئيسية", projects: "استكشاف المشاريع", saved: "المشاريع المحفوظة", requests: "طلباتي" };
    const renderCards = (projects) => <div className={styles.projectGrid}>{projects.map((project) => <ProjectCard key={project.id} project={project} saved={savedIds.includes(project.id)} onSave={saveProject} onDetails={openDetails} />)}</div>;
    const requestContent = data.requests.length ? <ul className="space-y-3">{data.requests.map((request) => <RequestRow key={request.id} request={request} onDetails={openDetails} />)}</ul> : <div className={surfaceClass}><EmptyState title="لم ترسل أي طلب بعد" description="استكشف المشاريع وأبدِ اهتمامك بالفرص المناسبة لك." explore /></div>;
    const savedContent = saved.length ? <ul className="space-y-3">{saved.slice(0, view === "home" ? 2 : saved.length).map((project) => <SavedRow key={project.id} project={project} onDetails={openDetails} onSave={saveProject} />)}</ul> : <div className={surfaceClass}><EmptyState title="احفظ المشاريع التي تهمك" description="مشاريعك المحفوظة ستظهر هنا لتعود إليها في أي وقت." explore /></div>;
    const matches = suggestedProjects.filter((project) => `${project.title} ${project.sector} ${project.description}`.includes(query.trim()));

    return <div dir="rtl" className="min-w-0 pr-55 text-[#0D202F] max-[660px]:pr-0">
        <DashboardHeader route={headings[view]} paragraph={view === "home" ? "مرحباً بك مجدداً، إليك نظرة عامة على طلباتك والمشاريع التي تهمك" : "تابع الفرص الاستثمارية والمشاريع التي تهمك"} />
        <div className="mt-5 space-y-6">
        {view === "home" && <>
            <RequestSummary requests={data.requests} />
            {showProfileBanner && <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#EBE3D7] bg-[#F9F6F0] px-4 py-3"><p className="flex items-center gap-2 text-sm leading-6 text-[#9E7F4D]"><CircleAlert size={18} aria-hidden="true" className="shrink-0" />أكمل ملفك لرفع اهتمام المشاريع بمجالك</p><Link href={`${base}/profile/edit`} className={primaryClass}>أكمل ملفك</Link></div>}
            <section aria-labelledby="suggested-title"><SectionHeading id="suggested-title" title="مشاريع مقترحة" href={`${base}/projects`} linkLabel="استكشاف المشاريع" />{renderCards(suggestedProjects.slice(0, 4))}</section>
            <div className="grid items-start gap-5 min-[1000px]:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
                <section aria-labelledby="requests-title" className="min-w-0"><SectionHeading id="requests-title" title="طلباتي المرسلة" />{requestContent}</section>
                <section aria-labelledby="saved-title" className="min-w-0"><SectionHeading id="saved-title" title="المشاريع المحفوظة" href={`${base}/saved`} linkLabel="عرض جميع المحفوظات" />{savedContent}</section>
            </div>
            <Updates updates={data.updates} requests={data.requests} onDetails={openDetails} />
        </>}
        {view === "projects" && <section aria-label="استكشاف المشاريع"><form action={`${base}/projects`} className="mb-5 flex gap-2"><label htmlFor="project-search" className="sr-only">ابحث عن مشروع</label><input id="project-search" name="q" defaultValue={query} placeholder="ابحث باسم المشروع أو القطاع" className="min-h-11 min-w-0 flex-1 rounded-lg border border-[#E5EDF3] bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-[#1E4C6F] focus:ring-2 focus:ring-[#1E4C6F]/15" /><button className={primaryClass}>بحث</button></form>{query && <p className="mb-4 text-sm text-slate-500">نتائج البحث عن «{query}» ({matches.length})</p>}{matches.length ? renderCards(matches) : <div className={surfaceClass}><EmptyState title="لا توجد مشاريع مطابقة" description="جرّب البحث باسم آخر أو استعرض جميع المشاريع." explore /></div>}</section>}
        {view === "saved" && <section aria-label="المشاريع المحفوظة">{savedContent}</section>}
        {view === "requests" && <section aria-label="طلباتي المرسلة">{requestContent}</section>}
        </div>
        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-xs text-[#1E4C6F]">{notice}</p>
        <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
    </div>;
}
