"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import EvaluationDetails from "./EvaluationDetails"
import EvaluationEmptyState from "./EvaluationEmptyState"

const EvaluationReportModal = ({ evaluation, onClose }) => {
    const dialogRef = useRef(null)
    const hasReport = Array.isArray(evaluation?.scores) && evaluation.scores.length > 0

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog.open) dialog.showModal()
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    return (
        <dialog ref={dialogRef} dir="rtl" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }} aria-label={hasReport ? `التقرير الكامل — ${evaluation.date}` : "التقرير الكامل — لا يوجد تقرير بعد"} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-29px)] max-w-[1080px] overflow-y-auto rounded-[14px] bg-white p-[14px] text-[#0D202F] backdrop:bg-[#0D202F]/50 sm:p-[22px]">
            <div className="mb-[14px] flex items-center justify-between">
                <h2 className="text-[18px] font-bold">التقرير الكامل</h2>
                <button type="button" onClick={onClose} aria-label="إغلاق التقرير" className="cursor-pointer rounded-[7px] p-[7px] hover:bg-gray-100 focus-visible:outline-2"><X size={22} /></button>
            </div>
            {hasReport ? <EvaluationDetails evaluation={evaluation} /> : <EvaluationEmptyState variant="report" />}
        </dialog>
    )
}

export default EvaluationReportModal
