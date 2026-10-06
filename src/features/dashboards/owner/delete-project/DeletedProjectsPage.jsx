"use client"

import { useState } from 'react'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import DashboardHeader from '@/features/dashboards/shared/DashboardHeader'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import RestoreProjectSuccessModal from './components/RestoreProjectSuccessModal'
import DeletedProjectsEmptyState from './components/DeletedProjectsEmptyState'

export default function DeletedProjectsPage() {
    const [projects, setProjects] = useState([
        { id: 1, title: "مشروع تطبيق تدوير لإعادة تصنيع النفايات الصلبة", time: 17, img: "/images/Rectangle 16.png", t: "project" },
        { id: 2, title: "مشروع تطبيق تدوير لإعادة تصنيع النفايات الصلبة", time: 1, img: "/images/Rectangle 16.png", t: "project" },
    ])
    const [selectedProject, setSelectedProject] = useState(null)
    const [showRestoreSuccess, setShowRestoreSuccess] = useState(false)

    const handleDelete = () => {
        if (!selectedProject) return
        setProjects(current => current.filter(project => project.id !== selectedProject.id))
        setSelectedProject(null)
    }

    const handleRestore = project => {
        setProjects(current => current.filter(item => item.id !== project.id))
        setShowRestoreSuccess(true)
    }

    return (
        <div className="pr-55 max-[660px]:pr-0 py-6 text-[#1E4C6F]" dir="rtl">
            <div className="mx-auto w-full max-w-[1280px]">
                <DashboardHeader
                    route="سلة المهملات"
                    paragraph="المشاريع المحذوفة تُحفظ هنا 30 يوما قبل حذفها نهائيا"
                />
                <div className="mt-6">
                    {projects.length === 0 ? <DeletedProjectsEmptyState /> : (
                        <section aria-label="المشاريع المحذوفة" className="flex flex-col gap-3">
                            {projects.map(project => (
                                <article key={project.id} className="flex flex-col justify-between gap-5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row">
                                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                                        <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-40">
                                            <Image src={project.img} alt="" fill priority unoptimized sizes="(max-width: 640px) 100vw, 160px" className="object-cover" />
                                        </div>
                                        <div className="flex min-w-0 flex-col gap-4">
                                            <h2 className="text-lg font-bold sm:text-xl">{project.title}</h2>
                                            <p className="flex w-fit items-center gap-1.5 rounded-md bg-[#E9EDF1] px-2.5 py-1.5 text-xs text-[#4B708C]">
                                                <Clock size={14} aria-hidden="true" />
                                                متبقي {project.time} يوم للاسترجاع
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 flex-col justify-center gap-3 lg:w-64">
                                        <button type="button" onClick={() => handleRestore(project)} className="h-11 cursor-pointer rounded-xl bg-[#1E4C6F] text-lg text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]">
                                            استرجاع
                                        </button>
                                        <button type="button" onClick={() => setSelectedProject(project)} className="h-11 cursor-pointer rounded-xl border border-red-600 text-lg text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
                                            حذف نهائي
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    )}
                </div>
            </div>
            <DeleteConfirmModal open={selectedProject !== null} onConfirm={handleDelete} onCancel={() => setSelectedProject(null)} />
            <RestoreProjectSuccessModal open={showRestoreSuccess} onContinue={() => setShowRestoreSuccess(false)} />
        </div>
    )
}
