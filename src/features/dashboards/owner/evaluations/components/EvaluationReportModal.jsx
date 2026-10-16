"use client"

import { useEffect, useId, useRef } from "react"
import { X } from "lucide-react"
import EvaluationEmptyState from "./EvaluationEmptyState"
import EvaluationDetails from "./EvaluationDetails"
import { iconActionClass } from "@/features/dashboards/shared/dashboardStyles"

const EvaluationReportModal = ({ evaluation, onClose }) => {
    const dialogRef = useRef(null)
    const titleId = useId()

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog.open) dialog.showModal()
    }, [])

    return (
        <dialog ref={dialogRef} dir="rtl" aria-labelledby={titleId} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-[#0D202F] shadow-xl backdrop:bg-[#0D202F]/40">
            <div className="flex items-center justify-between gap-3 border-b border-[#E5EDF3] px-4 py-4 sm:px-6">
                <h2 id={titleId} className="text-lg font-bold">تقرير تقييم المشروع</h2>
                <button type="button" onClick={onClose} aria-label="إغلاق التقرير" className={iconActionClass}><X size={20} aria-hidden="true" /></button>
            </div>
            {evaluation ? <div className="p-4 sm:p-6"><EvaluationDetails evaluation={evaluation} /></div> : <EvaluationEmptyState variant="report" />}
        </dialog>
    )
}

export default EvaluationReportModal
