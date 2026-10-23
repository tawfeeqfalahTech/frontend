"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { iconActionClass, primaryClass } from "@/features/dashboards/shared/dashboardStyles";

export default function ProjectDialog({ selection, onClose }) {
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
