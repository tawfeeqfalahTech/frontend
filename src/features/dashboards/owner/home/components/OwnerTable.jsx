"use client"

import { useEffect, useRef, useState } from "react"
import { SquarePen, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { projects as defaultProjects } from "../../data/projects"
import ProjectsEmptyState from "./ProjectsEmptyState"

const columns = ["رقم", "صورة", "المشروع", "المجال", "الحالة", "تقييم الذكاء", "المشاهدات", "تاريخ الإنشاء", "إجراءات"]
const statusStyles = {
    "نشط": "bg-[#D9EEDB] text-[#369649]",
    "قيد التقييم": "bg-amber-100 text-amber-700",
    "مرفوض": "bg-rose-100 text-rose-700",
}
const actionClass = "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E5EDF3] bg-white text-[#1E4C6F] transition-colors hover:border-[#1E4C6F] hover:bg-[#E9EDF1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]"

export default function ProjectsTable({ slice, projects = defaultProjects, onDelete }) {
    const [hiddenIds, setHiddenIds] = useState([])
    const [selectedProject, setSelectedProject] = useState(null)
    const [lastRemoved, setLastRemoved] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")
    const dialogRef = useRef(null)
    const remainingProjects = projects.filter(project => !hiddenIds.includes(project.id))
    const visibleProjects = slice === undefined ? remainingProjects : remainingProjects.slice(0, slice)

    useEffect(() => {
        if (selectedProject) dialogRef.current?.showModal()
        else dialogRef.current?.close()
    }, [selectedProject])

    const handleDelete = async () => {
        if (!selectedProject || deleting) return
        setDeleting(true)
        setError("")
        try {
            if (onDelete) await onDelete(selectedProject)
            setHiddenIds(current => [...current, selectedProject.id])
            setLastRemoved(onDelete ? null : selectedProject)
            setSelectedProject(null)
        } catch {
            setError("تعذّر حذف المشروع، حاول مرة أخرى.")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <section className="min-w-0 bg-white" dir="rtl" aria-label="المشاريع الأخيرة">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-[#1E4C6F]">المشاريع الأخيرة</h2>
                {remainingProjects.length > 0 && <Link href="/dashboard/idea-owner/projects" className="rounded-lg text-sm font-semibold text-[#0039C4] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">عرض الكل</Link>}
            </div>
            {lastRemoved && <div role="status" className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#EDF6FC] px-4 py-3 text-sm text-[#1E4C6F]">
                <span>تمت إزالة «{lastRemoved.title}» من العرض الحالي.</span>
                <button type="button" onClick={() => { setHiddenIds(current => current.filter(id => id !== lastRemoved.id)); setLastRemoved(null) }} className="rounded font-bold underline focus-visible:outline-2 focus-visible:outline-offset-2">تراجع</button>
            </div>}
            <div className="overflow-hidden rounded-xl border border-[#E5EDF3] shadow-sm">
                <div className="overflow-x-auto overscroll-x-contain" tabIndex={0} role="region" aria-label="جدول المشاريع، يمكن تمريره أفقياً على الشاشات الصغيرة">
                    <table className={"w-full table-fixed border-collapse text-center text-sm text-[#0D202F]" + (remainingProjects.length ? " min-w-[900px]" : "")}>
                        <colgroup>
                            <col className="w-[4%]" /><col className="w-[5.5%]" /><col className="w-[18.5%]" />
                            {Array.from({ length: 6 }, (_, index) => <col key={index} className="w-[12%]" />)}
                        </colgroup>
                        <thead className={"bg-[#1E4C6F] text-white" + (remainingProjects.length === 0 ? " hidden" : "")}>
                            <tr>{columns.map(column => <th key={column} scope="col" className="h-11 border-l border-white/20 px-2 text-xs font-semibold last:border-l-0">{column}</th>)}</tr>
                        </thead>
                        <tbody>
                            {visibleProjects.map((project, index) => {
                                const score = Math.min(100, Math.max(0, parseFloat(project.rating) || 0))
                                const projectHref = "/dashboard/idea-owner/view-project?id=" + encodeURIComponent(project.id)
                                const cellClass = "h-16 border-l border-[#E5EDF3]/50 px-3 last:border-l-0"
                                return <tr key={project.id} className="odd:bg-white even:bg-[#EDF6FC] transition-colors hover:bg-[#E4F0F8]">
                                    <td className={cellClass + " text-xs text-[#1E4C6F]"}>{index + 1}</td>
                                    <td className="h-16 border-l border-[#E5EDF3]/50 px-1">
                                        <Link href={projectHref} aria-label={"عرض مشروع " + project.title} className="relative mx-auto block h-8 w-8 overflow-hidden rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]">
                                            <Image src={project.image || "/images/background_auth.jpeg"} alt="" fill sizes="32px" className="object-cover" />
                                        </Link>
                                    </td>
                                    <td className={cellClass}><Link href={projectHref} className="block break-words text-sm leading-6 hover:text-[#1E4C6F] hover:underline">{project.title}</Link></td>
                                    <td className={cellClass + " text-[#4B708C]"}>{project.field || "—"}</td>
                                    <td className={cellClass}><span className={"inline-flex rounded-full px-2.5 py-1 text-xs " + (statusStyles[project.status] || "bg-slate-100 text-slate-600")}>{project.status}</span></td>
                                    <td className={cellClass}>
                                        <div role="progressbar" aria-label={"تقييم الذكاء لمشروع " + project.title} aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} title={score + "%"} dir="ltr" className="mx-auto h-1.5 w-full max-w-[104px] overflow-hidden rounded-full bg-[#E9EDF1]">
                                            <div className="h-full rounded-full bg-gradient-to-r from-[#269557] to-[#58B979]" style={{ width: score + "%" }} />
                                        </div>
                                    </td>
                                    <td className={cellClass}>{project.views ?? "—"}</td>
                                    <td className={cellClass + " text-[#4B708C]"}>{project.createdAt || "—"}</td>
                                    <td className={cellClass}>
                                        <div className="flex flex-row-reverse items-center justify-center gap-2">
                                            <Link href={"/dashboard/idea-owner/edit-project?id=" + encodeURIComponent(project.id)} aria-label={"تعديل مشروع " + project.title} title="تعديل المشروع" className={actionClass}><SquarePen size={15} aria-hidden="true" /></Link>
                                            <button type="button" onClick={() => { setError(""); setSelectedProject(project) }} aria-label={"حذف مشروع " + project.title} title="حذف المشروع" className={actionClass + " hover:text-rose-600"}><Trash2 size={15} aria-hidden="true" /></button>
                                        </div>
                                    </td>
                                </tr>
                            })}
                            {remainingProjects.length === 0 && <tr><td colSpan={columns.length}><ProjectsEmptyState /></td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <dialog ref={dialogRef} onCancel={event => { event.preventDefault(); if (!deleting) setSelectedProject(null) }} onClick={event => { if (event.target === event.currentTarget && !deleting) setSelectedProject(null) }} aria-labelledby="project-delete-title" className="fixed inset-0 m-auto w-[calc(100%-32px)] max-w-md rounded-2xl border-0 bg-white p-6 text-center text-[#0D202F] shadow-xl backdrop:bg-slate-900/40">
                <h3 id="project-delete-title" className="text-xl font-bold">حذف المشروع</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">{onDelete ? "هل تريد حذف مشروع «" + selectedProject?.title + "»؟" : "هل تريد إزالة مشروع «" + selectedProject?.title + "» من العرض الحالي؟ يمكنك التراجع بعد الإزالة."}</p>
                {error && <p role="alert" className="mt-3 text-sm text-rose-600">{error}</p>}
                <div className="mt-5 flex gap-3">
                    <button type="button" disabled={deleting} onClick={handleDelete} className="min-h-11 flex-1 rounded-lg bg-rose-600 px-4 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50">{deleting ? "جارٍ الحذف…" : "حذف المشروع"}</button>
                    <button type="button" disabled={deleting} onClick={() => setSelectedProject(null)} className="min-h-11 flex-1 rounded-lg border border-slate-200 px-4 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">إلغاء</button>
                </div>
            </dialog>
        </section>
    )
}
