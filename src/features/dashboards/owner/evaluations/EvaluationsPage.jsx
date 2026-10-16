"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import EvaluationSummary from "./components/EvaluationSummary"
import EvaluationHistoryChart from "./components/EvaluationHistoryChart"
import EvaluationHistoryTable from "./components/EvaluationHistoryTable"
import EvaluationDetails from "./components/EvaluationDetails"
import EvaluationEmptyState from "./components/EvaluationEmptyState"
import { evaluationHistory, evaluationCooldown } from "./data/mockEvaluations"
import { evaluationHref } from "./data/evaluationReport"
import { outlineClass } from "../../shared/dashboardStyles"

const EvaluationsPage = ({ state = "history", projectId, projectName, reports }) => {
    const [remaining, setRemaining] = useState(state === "cooldown" ? evaluationCooldown : 0)
    const [deadline, setDeadline] = useState(() => state === "cooldown" ? Date.now() + evaluationCooldown * 1000 : null)
    const [notice, setNotice] = useState("")
    const isFirstEvaluation = state === "single"
    const allReports = state === "empty" ? [] : reports ?? evaluationHistory
    const evaluations = state === "cooldown" ? allReports.slice(0, 3) : allReports
    const chartEvaluations = state === "cooldown" ? allReports.slice(2) : allReports
    const latest = allReports.at(-1)

    useEffect(() => {
        if (!deadline) return
        const timer = setInterval(() => setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000))), 1000)
        return () => clearInterval(timer)
    }, [deadline])

    const handleReevaluate = () => {
        setRemaining(evaluationCooldown)
        setDeadline(Date.now() + evaluationCooldown * 1000)
        setNotice("يمكنك إعادة تقييم مشروعك بعد انتهاء فترة الانتظار.")
    }

    if (allReports.length === 0) return (
        <div className="mx-auto flex max-w-[960px] flex-col gap-[30px] pt-[15px] text-[#0D202F]" dir="rtl">
            <h1 className="text-[22.5px] font-bold leading-[1.5]">سجل التقييمات — مشروع {projectName}</h1>
            <EvaluationEmptyState variant="reports" actionHref={evaluationHref({ projectId, state: "single" })} />
        </div>
    )

    return (
        <div className="mx-auto flex max-w-[1152px] flex-col gap-[22px] text-[#0D202F]" dir="rtl">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-[22px] font-bold leading-[41px]">سجل التقييمات — مشروع {projectName}</h1>
                <Link href={evaluationHref({ projectId, reportId: latest.id })} className={`${outlineClass} min-h-11 text-sm`}>عرض أحدث تقرير</Link>
            </div>
            <EvaluationSummary remaining={remaining} onReevaluate={handleReevaluate} latest={latest} />
            {notice && <p role="status" className="rounded-[11px] bg-[#E9EDF1] p-[14px] text-[13px] text-[#1E4C6F]">{notice}</p>}
            {isFirstEvaluation ? <EvaluationDetails evaluation={latest} first /> : <>
                <EvaluationHistoryChart evaluations={chartEvaluations} />
                <EvaluationHistoryTable evaluations={evaluations} projectId={projectId} />
            </>}
        </div>
    )
}

export default EvaluationsPage
