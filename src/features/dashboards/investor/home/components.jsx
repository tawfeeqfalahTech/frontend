"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, X } from "lucide-react";
import DeletedProjectsEmptyState from "@/features/dashboards/owner/delete-project/components/DeletedProjectsEmptyState";
import { suggestedProjects } from "./data";

export const base = "/dashboard/investor";
export const primaryClass = "inline-flex min-h-9 items-center justify-center rounded-lg bg-[#1E4C6F] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]";
export const outlineClass = "inline-flex min-h-8 items-center justify-center rounded-lg border border-[#9CB1C1] px-3 py-1.5 text-xs text-[#1E4C6F] transition-colors hover:bg-[#EDF3F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]";
export const surfaceClass = "rounded-xl bg-white shadow-[0_2px_14px_rgba(30,76,111,0.07)]";

export function SectionHeading({ id, title, href, linkLabel = "عرض جميع الطلبات" }) {
    return <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id={id} className="border-s-[3px] border-[#1E4C6F] ps-2 text-base font-bold text-[#163852]">{title}</h2>
        {href && <Link href={href} className="text-xs text-[#1E4C6F] hover:underline">{linkLabel}</Link>}
    </div>;
}

export function EmptyState({ title, description, explore = false }) {
    return <DeletedProjectsEmptyState compact title={title} description={description}>
        {explore && <Link href={`${base}/projects`} className={primaryClass}>استكشاف المشاريع</Link>}
    </DeletedProjectsEmptyState>;
}

export function ProjectCard({ project, saved, onSave, onDetails }) {
    return <article className={`${surfaceClass} overflow-hidden`}>
        <div className="relative h-36 overflow-hidden sm:h-40 lg:h-44">
            <Image src={project.cover} alt={`واجهة ${project.title}`} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 40vw, 30vw" className="object-cover" />
            <span className="absolute end-3 top-3 rounded-md bg-[#1E4C6F]/90 px-2.5 py-1 text-[10px] text-white">{project.category}</span>
        </div>
        <div className="p-4">
            <h3 className="text-sm font-bold text-[#163852]">{project.title}</h3>
            <p className="mt-1.5 min-h-10 text-xs leading-5 text-gray-400">{project.description}</p>
            <dl className="mt-2 space-y-1 text-[11px] text-[#B19971]">
                <div className="flex gap-1"><dt>جودة الفكرة:</dt><dd dir="ltr">{project.score}%</dd></div>
                <div className="flex gap-1"><dt className="sr-only">مرحلة المشروع</dt><dd>{project.stage}</dd></div>
            </dl>
            <div className="mt-2 flex items-center justify-between gap-2 text-[11px]">
                <span className="text-gray-400">{project.sector}</span>
                <button type="button" aria-label={`${saved ? "إلغاء حفظ" : "حفظ"} ${project.title}`} aria-pressed={saved} onClick={() => onSave(project.id)} className="flex min-h-9 items-center gap-1.5 rounded-md px-1 text-[#1E4C6F] hover:bg-slate-50">
                    <Bookmark size={15} className={saved ? "fill-[#1E4C6F]" : ""} />{saved ? "محفوظ" : "حفظ"}
                </button>
            </div>
        </div>
        <button type="button" onClick={() => onDetails(project)} className="flex min-h-10 w-full items-center justify-center gap-2 border-t border-slate-100 text-xs text-[#1E4C6F] transition-colors hover:bg-[#F3F7FA]">عرض التفاصيل<ArrowLeft size={14} /></button>
    </article>;
}

export function ProjectAvatar({ project }) {
    return <div className="relative size-11 shrink-0 overflow-hidden rounded-full"><Image src={project.cover} alt="" fill sizes="44px" className="object-cover" /></div>;
}

export function RequestRow({ request, onDetails }) {
    const project = suggestedProjects.find((item) => item.id === request.projectId);
    const accepted = request.status === "accepted";
    return <li className={`${surfaceClass} flex items-center gap-3 p-4`}>
        <ProjectAvatar project={project} />
        <div className="min-w-0 flex-1">
            <h3 className="text-xs font-bold leading-6 text-[#163852]">{project.title}</h3>
            <p className="truncate text-[10px] text-gray-400">{project.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-center gap-2">
            <span className={`rounded px-2 py-0.5 text-[10px] ${accepted ? "bg-[#EFF5E9] text-[#7A9C59]" : "bg-[#F7F3E9] text-[#B19971]"}`}>{accepted ? "مقبول" : "قيد المراجعة"}</span>
            <button type="button" onClick={() => onDetails(project, request)} className={outlineClass}>{accepted ? "تواصل مع المالك" : "عرض الطلب"}</button>
            <time className="text-[10px] text-gray-400">{request.date}</time>
        </div>
    </li>;
}

export function SavedRow({ project, onDetails, onSave }) {
    return <li className={`${surfaceClass} flex items-center gap-3 p-4`}>
        <ProjectAvatar project={project} />
        <div className="min-w-0 flex-1"><h3 className="text-xs font-bold leading-6">{project.title}</h3><p className="text-[10px] text-gray-400">{project.sector}</p></div>
        <button type="button" onClick={() => onDetails(project)} className={outlineClass}>عرض</button>
        <button type="button" onClick={() => onSave(project.id)} aria-label={`إلغاء حفظ ${project.title}`} className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#1E4C6F] hover:bg-slate-100"><Bookmark size={15} className="fill-[#1E4C6F]" /></button>
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
    return <dialog ref={dialogRef} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="investor-project-title" className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-[#163852] shadow-2xl backdrop:bg-[#0D202F]/50">
        {project && <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4"><h2 id="investor-project-title" className="text-xl font-bold">{project.title}</h2><button type="button" onClick={onClose} aria-label="إغلاق التفاصيل" className="flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-slate-100"><X size={20} /></button></div>
            <div className="relative mt-5 h-52 overflow-hidden rounded-xl"><Image src={project.cover} alt={`واجهة ${project.title}`} fill sizes="560px" className="object-cover" /></div>
            <p className="mt-5 text-sm leading-7 text-gray-500">{project.description}</p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-xs">{[{ label: "القطاع", value: project.sector }, { label: "جودة الفكرة", value: `${project.score}%` }, { label: "المرحلة", value: project.stage }].map((item) => <div key={item.label} className="rounded-lg bg-slate-50 p-3"><dt className="text-gray-400">{item.label}</dt><dd className="mt-2 font-semibold">{item.value}</dd></div>)}</dl>
            {selection.request && <div className="mt-5 rounded-xl bg-[#F3F7FA] p-4 text-sm leading-7"><p>حالة الطلب: <strong>{selection.request.status === "accepted" ? "مقبول" : "قيد المراجعة"}</strong></p><p className="mt-1 text-xs text-gray-500">{selection.request.status === "accepted" ? "تم قبول طلب اهتمامك. بيانات التواصل مع المالك غير متاحة حالياً." : "طلب اهتمامك قيد المراجعة من صاحب المشروع."}</p></div>}
            <button type="button" onClick={onClose} className={`${primaryClass} mt-6`}>إغلاق</button>
        </div>}
    </dialog>;
}
