"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import EvaluationSummary from "./components/EvaluationSummary"
import EvaluationHistoryChart from "./components/EvaluationHistoryChart"
import EvaluationHistoryTable from "./components/EvaluationHistoryTable"
import EvaluationDetails from "./components/EvaluationDetails"
import EvaluationEmptyState from "./components/EvaluationEmptyState"
import { getEvaluationHistoryView, getRemainingSeconds } from "../../shared/viewState.mjs"
import { evaluationHref } from "./data/evaluationReport"
import { outlineClass } from "../../shared/dashboardStyles"

const EvaluationsPage = ({ projectId, projectName, reports = [], nextEvaluationAt, onRequestEvaluation }) => {
    const router = useRouter()
    const [refreshing, startTransition] = useTransition()
    const [remaining, setRemaining] = useState(() => getRemainingSeconds(nextEvaluationAt))
    const [requesting, setRequesting] = useState(false)
    const [notice, setNotice] = useState("")
    const isFirstEvaluation = getEvaluationHistoryView(reports) === "single"
    const allReports = reports
    const latest = allReports.at(-1)

    useEffect(() => {
        if (!nextEvaluationAt) return
        const timer = setInterval(() => setRemaining(getRemainingSeconds(nextEvaluationAt)), 1000)
        return () => clearInterval(timer)
    }, [nextEvaluationAt])

    const handleReevaluate = async () => {
        if (!onRequestEvaluation || requesting || refreshing || remaining > 0) return
        setRequesting(true)
        try {
            await onRequestEvaluation(projectId)
            startTransition(() => router.refresh())
            setNotice("تم إرسال طلب التقييم.")
        } catch {
            setNotice("تعذّر إرسال طلب التقييم. حاول مرة أخرى.")
        } finally {
            setRequesting(false)
        }
    }

    if (allReports.length === 0) return (
        <div className="mx-auto flex max-w-[960px] flex-col gap-[30px] pt-[15px] text-[#0D202F]" dir="rtl">
            <h1 className="text-[22.5px] font-bold leading-[1.5]">سجل التقييمات — مشروع {projectName}</h1>
            <EvaluationEmptyState variant="reports" actionHref={`/dashboard/idea-owner/view-project?id=${encodeURIComponent(projectId)}#project-evaluation`} />
        </div>
    )

    return (
        <div className="mx-auto flex max-w-[1152px] flex-col gap-[22px] text-[#0D202F]" dir="rtl">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-[22px] font-bold leading-[41px]">سجل التقييمات — مشروع {projectName}</h1>
                <Link href={evaluationHref({ projectId, reportId: latest.id })} className={`${outlineClass} min-h-11 text-sm`}>عرض أحدث تقرير</Link>
            </div>
            <EvaluationSummary remaining={remaining} onReevaluate={handleReevaluate} latest={latest} disabled={!onRequestEvaluation || requesting || refreshing} />
            {notice && <p role="status" className="rounded-[11px] bg-[#E9EDF1] p-[14px] text-[13px] text-[#1E4C6F]">{notice}</p>}
            {isFirstEvaluation ? <EvaluationDetails evaluation={latest} first /> : <>
                <EvaluationHistoryChart evaluations={allReports} />
                <EvaluationHistoryTable evaluations={allReports} projectId={projectId} />
            </>}
        </div>
    )
}

export default EvaluationsPage
