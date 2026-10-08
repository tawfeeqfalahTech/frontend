"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { CircleSlash, Clock3, TriangleAlert } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"
import { projectDetails } from "./projectDetails"

const cardClass = "w-full min-w-0 mt-4 max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm"
const buttonClass = "inline-flex min-h-10 items-center justify-center rounded-lg bg-[#1E4C6F] px-5 py-2 text-sm font-semibold text-white hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F] disabled:opacity-60"

function RadarAxisTick({ x, y, payload, textAnchor }) {
    const words = payload.value.split(" ")
    return <text x={x} y={y} textAnchor={textAnchor} fill="#68879F" fontSize={12}>
        {words.map((word, index) => <tspan key={index} x={x} dy={index === 0 ? (words.length > 1 ? -4 : 0) : 14}>{word}</tspan>)}
    </text>
}

export default function ProjectEvaluation({ initialState = "completed", projectId, evaluation = projectDetails.evaluation, onRequestEvaluation }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [state, setState] = useState(initialState)
    const requestInProgress = useRef(false)
    const completed = state === "completed" || state === "report"

    const changeState = nextState => {
        setState(nextState)
        const params = new URLSearchParams(searchParams.toString())
        params.set("state", nextState)
        router.replace(`?${params}`, { scroll: false })
    }

    const requestEvaluation = async () => {
        if (requestInProgress.current || state === "evaluating") return
        requestInProgress.current = true
        setState("evaluating")
        try {
            // Without a service callback, this previews the pending state without fabricating a result.
            if (onRequestEvaluation) await onRequestEvaluation(projectId)
            changeState("evaluating")
        } catch {
            changeState("failed")
        } finally {
            requestInProgress.current = false
        }
    }

    if (!completed) {
        const failed = state === "failed"
        const evaluating = state === "evaluating"
        return <section className={`${cardClass} flex min-h-60 flex-col items-center justify-center text-center`} aria-live="polite" aria-busy={evaluating}>
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${failed ? "bg-red-50 text-red-500" : "bg-[#E9EDF1] text-[#1E4C6F]"}`}>
                {failed ? <TriangleAlert size={28} aria-hidden="true" /> : evaluating ? <Clock3 size={28} aria-hidden="true" /> : <CircleSlash size={48} aria-hidden="true" />}
            </div>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{failed ? "فشلت عملية التقييم" : evaluating ? "جاري التقييم" : "هذا المشروع لم يُقيّم بعد"}</h3>
            <p className="mb-4 max-w-md text-xs leading-5 text-[#68879F]">{failed ? "تعذّر إكمال التقييم. تأكد من اكتمال بيانات المشروع والملفات المرفقة ثم أعد المحاولة." : evaluating ? "يجري الآن تحليل بيانات مشروعك وإعداد تقرير التقييم. ستظهر النتائج هنا بمجرد اكتمال العملية." : "اطلب تقييم مشروعك للحصول على تقرير يوضح نقاط القوة والتوصيات ومدى جاهزية المشروع للاستثمار."}</p>
            {evaluating ? <span className="rounded-md bg-[#E9EDF1] px-3 py-1.5 text-xs text-[#4B708C]">سيتم إشعارك بمجرد اكتمال التقييم</span> : <button type="button" className={buttonClass} onClick={requestEvaluation}>{failed ? "إعادة التقييم" : "طلب التقييم"}</button>}
        </section>
    }

    return <>
        <section className={cardClass}>
            <h3 className="mb-2 text-lg font-bold text-gray-900">التقييم الفني الإجمالي</h3>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-[#1E4C6F]">
                <Link href={`/dashboard/idea-owner/evaluations${projectId ? `?id=${encodeURIComponent(projectId)}` : ""}`} className="hover:underline">عرض سجل التقييمات</Link>
                {state !== "report" && <button type="button" onClick={() => changeState("report")} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">عرض التقرير التفصيلي</button>}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-center min-[400px]:grid-cols-3">
                <div className="flex min-w-0 min-h-16 flex-col justify-center gap-1 rounded-lg bg-[#EDF7EE] px-2 py-3 text-[#4CAF50]"><strong className="text-base">{evaluation.score}%</strong><span className="text-xs leading-5">درجة التقييم الإجمالية</span></div>
                <div className="flex min-w-0 min-h-16 flex-col justify-center gap-1 rounded-lg bg-gray-50 px-2 py-3 text-[#1E4C6F]"><strong className="break-words text-sm" dir="ltr">{evaluation.model}</strong><span className="text-xs leading-5 text-[#68879F]">النموذج المستخدم</span></div>
                <div className="flex min-w-0 min-h-16 flex-col justify-center gap-1 rounded-lg bg-gray-50 px-2 py-3 text-[#1E4C6F]"><strong className="text-sm" dir="ltr">{evaluation.duration}</strong><span className="text-xs leading-5 text-[#68879F]">وقت استجابة النموذج</span></div>
            </div>
            <div className="mt-3 h-48 min-w-0 rounded-lg bg-gray-50" dir="ltr" role="img" aria-label="مصفوفة أبعاد التقييم الفني">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <RadarChart data={evaluation.dimensions} outerRadius="55%" margin={{ top: 24, right: 24, bottom: 22, left: 24 }}>
                        <PolarGrid stroke="#DBE6EE" />
                        <PolarAngleAxis dataKey="shortLabel" tick={<RadarAxisTick />} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar dataKey="score" stroke="#3975FF" strokeWidth={1.5} fill="#94B8FF" fillOpacity={0.35} isAnimationActive={false} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-3 rounded-lg bg-gray-50 p-3">
                {evaluation.dimensions.map(item => <div key={item.shortLabel} className="flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <span className="min-w-0 text-sm leading-6 text-[#0D202F]">{item.label}</span>
                    <div className="flex w-full shrink-0 items-center gap-2 sm:w-[38%]" dir="ltr">
                        <span className="w-8 shrink-0 text-xs font-semibold text-[#0D202F]">{item.score}%</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E9EDF1]" role="meter" aria-label={item.label} aria-valuenow={item.score} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-[#4CAF50]" style={{ width: `${item.score}%` }} /></div>
                    </div>
                </div>)}
            </div>
        </section>
        {state === "report" && <section className={cardClass}>
            <h3 className="mb-4 text-lg font-bold text-gray-900">تحليل المشروع: المزايا والتوصيات والمهارات المطلوبة</h3>
            <h4 className="mb-2 text-sm font-bold text-gray-900">المزايا التقنية ونقاط القوة</h4>
            <ul className="mb-4 list-disc space-y-1 pr-4 text-xs leading-5 text-[#68879F]">{evaluation.strengths.map(item => <li key={item}>{item}</li>)}</ul>
            <h4 className="mb-2 text-sm font-bold text-gray-900">توصيات استراتيجية للتطوير والاستثمار</h4>
            {evaluation.recommendations.map(item => <p key={item} className="mb-2 text-xs leading-5 text-[#68879F]">{item}</p>)}
            <h4 className="mb-2 mt-4 text-sm font-bold text-gray-900">المهارات والتقنيات المستخدمة</h4>
            <div className="flex flex-wrap gap-2">{evaluation.technologies.map(item => <span key={item} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">{item}</span>)}</div>
        </section>}
    </>
}
