"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Check, CheckCheck, CircleAlert, Clock3, FileText, Send } from "lucide-react";
import useInvestorProfile from "../profile/useInvestorProfile";
import useSavedProjects from "./useSavedProjects";
import { suggestedProjects } from "./data";
import { base, primaryClass, surfaceClass, EmptyState, ProjectCard, ProjectDialog, RequestRow, SavedRow, SectionHeading } from "./components";

function RequestSummary({ requests }) {
    const cards = [
        { label: "الطلبات المرسلة", count: requests.length, Icon: Send },
        { label: "الطلبات المقبولة", count: requests.filter((request) => request.status === "accepted").length, Icon: CheckCheck },
        { label: "الطلبات قيد المراجعة", count: requests.filter((request) => request.status === "pending").length, Icon: Clock3 },
    ];
    return <div className="mb-5 grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
        {cards.map(({ label, count, Icon }) => <Link key={label} href={`${base}/requests`} className="flex min-h-28 items-center gap-3 rounded-xl bg-white p-5 shadow-[0_2px_18px_rgba(30,76,111,0.13)] transition-shadow hover:shadow-md">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-[#7C8B97]"><Icon size={19} /></span>
            <div className="flex-1 text-right"><h2 className="text-xs font-semibold">{label}</h2><p className="mt-2 text-2xl font-semibold">{count}</p></div>
        </Link>)}
    </div>;
}

function Updates({ updates, requests, onDetails }) {
    return <section id="updates" aria-labelledby="updates-title">
        <SectionHeading id="updates-title" title="آخر التحديثات" />
        {updates.length ? <ul className={`${surfaceClass} space-y-1 p-4`}>{updates.map((update) => {
            const Icon = update.type === "saved" ? Bookmark : update.type === "request" ? Check : FileText;
            return <li key={update.id}><button type="button" onClick={() => onDetails(suggestedProjects.find((project) => project.id === update.projectId), requests.find((request) => request.projectId === update.projectId))} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-2 text-right text-xs hover:bg-slate-50">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F2F4F6] text-[#7C8B97]"><Icon size={15} /></span>
                <span className="flex-1 leading-6">{update.text}</span><time className="shrink-0 text-[10px] text-gray-400">{update.time}</time>
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
    const renderCards = (projects) => <div className="grid gap-4 sm:grid-cols-2 min-[1100px]:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} saved={savedIds.includes(project.id)} onSave={saveProject} onDetails={openDetails} />)}</div>;
    const requestContent = data.requests.length ? <ul className="space-y-3">{data.requests.map((request) => <RequestRow key={request.id} request={request} onDetails={openDetails} />)}</ul> : <EmptyState title="لم ترسل أي طلب بعد" description="استكشف المشاريع وأبدِ اهتمامك بالفرص المناسبة لك." explore />;
    const savedContent = saved.length ? <ul className="space-y-3">{saved.slice(0, view === "home" ? 2 : saved.length).map((project) => <SavedRow key={project.id} project={project} onDetails={openDetails} onSave={saveProject} />)}</ul> : <EmptyState title="احفظ المشاريع التي تهمك" description="مشاريعك المحفوظة ستظهر هنا لتعود إليها في أي وقت." explore />;
    const matches = suggestedProjects.filter((project) => `${project.title} ${project.sector} ${project.description}`.includes(query.trim()));

    return <div dir="rtl" className="min-w-0 pr-55 text-[#163852] max-[660px]:pr-0">
        <header className="mb-6"><h1 className="text-[28px] font-semibold">{headings[view]}</h1><p className="mt-1 text-sm leading-6 text-[#B19971]">{view === "home" ? "مرحباً بك مجدداً، إليك نظرة عامة على طلباتك والمشاريع التي تهمك" : "تابع الفرص الاستثمارية والمشاريع التي تهمك"}</p></header>
        {view === "home" && <>
            <RequestSummary requests={data.requests} />
            {showProfileBanner && <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F3C87F] bg-[#FFF3DE] px-4 py-3"><p className="flex items-center gap-2 text-xs leading-6"><CircleAlert size={17} className="shrink-0 text-[#B19971]" />أكمل ملفك لرفع اهتمام المشاريع بمجالك</p><Link href={`${base}/profile/edit`} className={primaryClass}>أكمل ملفك</Link></div>}
            <section aria-labelledby="suggested-title" className="mb-6"><SectionHeading id="suggested-title" title="مشاريع مقترحة" href={`${base}/projects`} linkLabel="استكشاف المشاريع" />{renderCards(suggestedProjects.slice(0, 3))}</section>
            <div className="mb-7 grid items-start gap-5 min-[1000px]:grid-cols-[1.35fr_1fr]">
                <section aria-labelledby="requests-title"><SectionHeading id="requests-title" title="طلباتي المرسلة" />{requestContent}</section>
                <section aria-labelledby="saved-title"><SectionHeading id="saved-title" title="المشاريع المحفوظة" href={`${base}/saved`} linkLabel="عرض جميع المحفوظات" />{savedContent}</section>
            </div>
            <Updates updates={data.updates} requests={data.requests} onDetails={openDetails} />
        </>}
        {view === "projects" && <section aria-label="استكشاف المشاريع"><form action={`${base}/projects`} className="mb-5 flex gap-2"><label htmlFor="project-search" className="sr-only">ابحث عن مشروع</label><input id="project-search" name="q" defaultValue={query} placeholder="ابحث باسم المشروع أو القطاع" className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#1E4C6F]" /><button className={primaryClass}>بحث</button></form>{query && <p className="mb-4 text-sm text-gray-500">نتائج البحث عن «{query}» ({matches.length})</p>}{matches.length ? renderCards(matches) : <EmptyState title="لا توجد مشاريع مطابقة" description="جرّب البحث باسم آخر أو استعرض جميع المشاريع." explore />}</section>}
        {view === "saved" && <section aria-label="المشاريع المحفوظة">{savedContent}</section>}
        {view === "requests" && <section aria-label="طلباتي المرسلة">{requestContent}</section>}
        <p role="status" aria-live="polite" className="mt-4 min-h-5 text-xs text-[#1E4C6F]">{notice}</p>
        <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
    </div>;
}
