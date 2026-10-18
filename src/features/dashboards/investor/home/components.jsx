"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, CheckCheck, Clock3, FolderOpen, X } from "lucide-react";
import DashboardEmptyState from "@/features/dashboards/shared/EmptyState";
import { iconActionClass, outlineClass, primaryClass, surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { suggestedProjects } from "./data";
import styles from "./InvestorDashboard.module.css";

export const base = "/dashboard/investor";
export { primaryClass, surfaceClass };

export function SectionHeading({ id, title, href, linkLabel = "عرض جميع الطلبات" }) {
    return <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id={id} className="border-s-[3px] border-[#1E4C6F] ps-2 text-lg font-bold text-[#1E4C6F]">{title}</h2>
        {href && <Link href={href} className="rounded text-sm font-semibold text-[#1E4C6F] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F]">{linkLabel}</Link>}
    </div>;
}

export function EmptyState({ title, description, explore = false, icon = FolderOpen }) {
    return <DashboardEmptyState title={title} description={description} icon={icon}>
        {explore && <Link href="/explore" className={primaryClass}>استكشاف المشاريع</Link>}
    </DashboardEmptyState>;
}

export function ProjectCard({ project, saved, onSave, onDetails }) {
    return <article className={`${surfaceClass} group flex h-full min-w-0 flex-col overflow-hidden transition-shadow duration-200 hover:shadow-md`}>
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
            <Image src={project.cover} alt={`واجهة ${project.title}`} fill sizes="(min-width: 1280px) calc((100vw - 310px) / 4), (min-width: 1000px) calc((100vw - 300px) / 3), (min-width: 768px) calc((100vw - 285px) / 2), (min-width: 661px) calc(100vw - 268px), (min-width: 510px) calc((100vw - 65px) / 2), calc(100vw - 48px)" className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.025]" />
            <span className="absolute end-2.5 top-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-md bg-[#1E4C6F]/95 px-2 py-1 text-[11px] font-semibold text-white" title={project.sector}>{project.sector}</span>
        </div>
        <div className="flex flex-1 flex-col p-3">
            <h3 className="line-clamp-2 text-sm font-bold leading-6 text-[#0D202F]" title={project.title}>{project.title}</h3>
            <p className="mt-1 min-h-10 line-clamp-2 text-xs leading-5 text-[#4B708C]">{project.description}</p>
            <dl className="mt-auto flex flex-wrap items-center justify-between gap-x-2 gap-y-1 pt-2 text-[11px] font-medium leading-5">
                <div className="flex items-center gap-1 text-[#876A3E]"><dt>جودة الفكرة:</dt><dd dir="ltr" className="font-bold">{project.score}%</dd></div>
                <div className="flex items-center gap-1.5 text-[#4B708C]"><span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-[#9CB1C1]" /><dt className="sr-only">مرحلة المشروع</dt><dd>{project.stage}</dd></div>
            </dl>
        </div>
        <div className="flex items-center gap-2 border-t border-[#E5EDF3] p-2">
            <button type="button" onClick={() => onDetails(project)} aria-label={`عرض تفاصيل ${project.title}`} className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-[#1E4C6F] px-2 text-xs font-semibold text-white transition-colors hover:bg-[#4B708C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]">عرض التفاصيل<ArrowLeft size={14} aria-hidden="true" /></button>
            <button type="button" aria-label={`${saved ? "إلغاء حفظ" : "حفظ"} ${project.title}`} aria-pressed={saved} onClick={() => onSave(project.id)} className={`inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold text-[#1E4C6F] transition-colors hover:bg-[#E5EDF4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F] ${saved ? "border-[#C9D9E5] bg-[#E5EDF4]" : "border-[#E5EDF3] bg-white"}`}>
                <Bookmark size={16} aria-hidden="true" className={saved ? "fill-[#1E4C6F]" : ""} />{saved ? "محفوظ" : "حفظ"}
            </button>
        </div>
    </article>;
}

export function ProjectAvatar({ project }) {
    return <div className="relative size-11 shrink-0 overflow-hidden rounded-full border border-[#E5EDF3] bg-[#E9EDF1]"><Image src={project.cover} alt="" fill sizes="44px" className="object-cover" /></div>;
}

export function RequestRow({ request, onDetails }) {
    const project = suggestedProjects.find((item) => item.id === request.projectId);
    const accepted = request.status === "accepted";
    const StatusIcon = accepted ? CheckCheck : Clock3;
    return <li style={{ "--row-accent": accepted ? "#367C59" : "#9E7F4D", "--row-soft": accepted ? "#E1EEE6" : "#EDE5D8", "--row-tint": accepted ? "#F5FAF7" : "#FCFAF6" }} className={`${surfaceClass} ${styles.detailCard} grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 p-4 sm:p-5`}>
        <ProjectAvatar project={project} />
        <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold leading-6 text-[#0D202F]">{project.title}</h3>
                <span className={`${styles.statusBadge} inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-semibold`}><StatusIcon size={13} aria-hidden="true" />{accepted ? "مقبول" : "قيد المراجعة"}</span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-6 text-[#4B708C]">{project.description}</p>
        </div>
        <div className="col-span-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5EDF3] pt-3">
            <time className="inline-flex items-center gap-1.5 text-[11px] text-[#4B708C]"><Clock3 size={13} aria-hidden="true" />{request.date}</time>
            <button type="button" onClick={() => onDetails(project, request)} className={`${outlineClass} ${styles.rowAction}`}>{accepted ? "تواصل مع المالك" : "عرض الطلب"}<ArrowLeft size={13} aria-hidden="true" /></button>
        </div>
    </li>;
}

export function SavedRow({ project, onDetails, onSave }) {
    return <li style={{ "--row-accent": "#1E4C6F", "--row-soft": "#E5EDF4", "--row-tint": "#F6F9FC" }} className={`${surfaceClass} ${styles.detailCard} grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-3 gap-y-3 p-4 sm:p-5`}>
        <ProjectAvatar project={project} />
        <div className="min-w-0"><h3 className="text-sm font-bold leading-6 text-[#0D202F]">{project.title}</h3><p className="mt-1 text-xs leading-6 text-[#4B708C]">{project.sector}</p></div>
        <div className="col-span-2 flex items-center justify-between gap-2 border-t border-[#E5EDF3] pt-3">
            <button type="button" onClick={() => onDetails(project)} aria-label={`عرض ${project.title}`} className={`${outlineClass} ${styles.rowAction}`}>عرض التفاصيل<ArrowLeft size={13} aria-hidden="true" /></button>
            <button type="button" onClick={() => onSave(project.id)} aria-label={`إلغاء حفظ ${project.title}`} aria-pressed="true" className={`${iconActionClass} ${styles.savedAction}`}><Bookmark size={16} aria-hidden="true" className="fill-[#1E4C6F]" /></button>
        </div>
    </li>;
}

export function ProjectDialog({ selection, onClose }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (selection && !dialog.open) dialog.showModal();
        if (!selection && dialog.open) dialog.close();
    }, [selection]);
    const project = selection?.project;
    return <dialog ref={dialogRef} dir="rtl" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="investor-project-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-[#0D202F] shadow-xl backdrop:bg-[#0D202F]/40">
        {project && <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><h2 id="investor-project-title" className="text-xl font-bold">{project.title}</h2><button type="button" onClick={onClose} aria-label="إغلاق التفاصيل" className={iconActionClass}><X size={20} /></button></div>
            <div className="relative mt-5 h-52 overflow-hidden rounded-xl"><Image src={project.cover} alt={`واجهة ${project.title}`} fill sizes="560px" className="object-cover" /></div>
            <p className="mt-5 text-sm leading-7 text-[#4B708C]">{project.description}</p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">{[{ label: "القطاع", value: project.sector }, { label: "جودة الفكرة", value: `${project.score}%` }, { label: "المرحلة", value: project.stage }].map((item) => <div key={item.label} className="rounded-lg bg-[#E9EDF1] p-3"><dt className="text-xs text-[#4B708C]">{item.label}</dt><dd className="mt-2 font-semibold">{item.value}</dd></div>)}</dl>
            {selection.request && <div className="mt-5 rounded-xl bg-[#F3F7FA] p-4 text-sm leading-7"><p>حالة الطلب: <strong>{selection.request.status === "accepted" ? "مقبول" : "قيد المراجعة"}</strong></p><p className="mt-1 text-xs text-gray-500">{selection.request.status === "accepted" ? "تم قبول طلب اهتمامك. بيانات التواصل مع المالك غير متاحة حالياً." : "طلب اهتمامك قيد المراجعة من صاحب المشروع."}</p></div>}
            <button type="button" onClick={onClose} className={`${primaryClass} mt-6`}>إغلاق</button>
        </div>}
    </dialog>;
}
