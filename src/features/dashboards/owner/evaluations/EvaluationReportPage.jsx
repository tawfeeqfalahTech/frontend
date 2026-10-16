"use client"

import Link from "next/link"
import { ArrowRight, Download, History } from "lucide-react"
import { outlineClass, primaryClass } from "../../shared/dashboardStyles"
import { evaluationHref } from "./data/evaluationReport"
import styles from "./EvaluationReportPage.module.css"

export default function EvaluationReportPage({ report, projectId }) {
    const historyHref = evaluationHref({ projectId })
    return <article data-evaluation-report className={`${styles.report} mx-auto flex max-w-[1120px] flex-col gap-6 px-2 pb-8 sm:px-6 lg:px-8 text-[#0D202F]`} dir="rtl" aria-labelledby="evaluation-report-title">
        <header className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1 basis-80">
                <h1 id="evaluation-report-title" className="text-xl font-bold leading-relaxed sm:text-2xl">{report.projectName.startsWith("منصة") ? report.projectName : `مشروع ${report.projectName}`}</h1>
                <p className="mt-1 text-xs leading-6 text-[#68879F] sm:text-sm">تقرير تقييم الذكاء الاصطناعي الشامل لمستوى جاهزية المشروع</p>
                <p className="mt-1 text-xs leading-5 text-[#68879F]">تاريخ التقييم: {report.date}</p>
            </div>
            <div className={`${styles.actions} flex flex-wrap items-center gap-3`}>
                <button type="button" onClick={() => window.print()} className={`${primaryClass} cursor-pointer`} title="فتح نافذة الطباعة لحفظ التقرير بصيغة PDF">
                    <Download size={16} aria-hidden="true" />تصدير التقرير PDF
                </button>
                <Link href={historyHref} className={`${outlineClass} min-h-11 px-4 text-sm`}><History size={16} aria-hidden="true" />سجل المقارنة</Link>
            </div>
        </header>

        <section className={`${styles.summary} flex items-center gap-4 rounded-2xl bg-white px-5 py-5 shadow-[0_3px_20px_#1E4C6F1A] sm:px-6`} aria-labelledby="overall-score-title">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#1E4C6F] text-2xl font-bold text-white shadow-[0_3px_8px_#2F8F6F33]" aria-label={`درجة التقييم ${report.score} من 100`}>{report.score}</div>
            <div>
                <h2 id="overall-score-title" className="text-base font-semibold sm:text-lg">درجة التقييم العام</h2>
                <p className="mt-1 text-xs leading-6 text-[#68879F]">{report.score >= 80 ? "مستوى متقدم وجاهزية عالية للاستثمار والنمو الفعلي" : report.score >= 60 ? "جاهزية واعدة مع فرص لتحسين المشروع وتطويره" : "يحتاج المشروع إلى تطوير إضافي لرفع مستوى الجاهزية"}</p>
            </div>
        </section>

        <section aria-labelledby="readiness-title">
            <h2 id="readiness-title" className={styles.sectionTitle}>درجات أبعاد الجاهزية</h2>
            <dl className={`${styles.dimensionsGrid} grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5`}>
                {report.dimensions.map(dimension => <div key={dimension.key} className="flex min-h-14 items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 shadow-[0_2px_16px_#1E4C6F08]">
                    <dt className="text-sm text-[#68879F]">{dimension.label}</dt>
                    <dd className="text-sm font-bold text-[#A48148]" dir="ltr">{dimension.score}%</dd>
                </div>)}
            </dl>
        </section>

        <section aria-labelledby="gaps-title">
            <h2 id="gaps-title" className={styles.sectionTitle}>تحليل الفجوات والتوصيات</h2>
            <div className={`${styles.gapsGrid} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
                {report.gaps.map(gap => <section key={gap.key} className={`${styles.gapCard} rounded-xl bg-white p-4 shadow-[0_3px_16px_#1E4C6F14]`}>
                    <div className="mb-2 flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold">{gap.title}</h3>
                        <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold ${gap.priority === "مرتفع" ? "bg-[#FDEBEB] text-[#C4453A]" : gap.priority === "متوسط" ? "bg-[#F5F2ED] text-[#9E7F4D]" : "bg-[#EDF3F7] text-[#4B708C]"}`}>خطر {gap.priority}</span>
                    </div>
                    <p className="text-xs leading-6 text-[#68879F]">{gap.description}</p>
                </section>)}
            </div>
            <h3 className="mb-3 mt-4 text-sm font-semibold">المهارات المطلوبة لمعالجة الفجوات</h3>
            <ul className="flex flex-wrap gap-2">
                {report.skills.map(skill => <li key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs leading-5 shadow-[0_3px_12px_#1E4C6F14]">{skill}</li>)}
            </ul>
        </section>

        <section aria-labelledby="swot-title">
            <h2 id="swot-title" className={styles.sectionTitle}>تحليل SWOT للمشروع</h2>
            <div className={`${styles.swotGrid} grid gap-3 md:grid-cols-2`}>
                {report.swot.map(item => <section key={item.key} className={`${styles.swotCard} ${styles[item.key]} rounded-xl p-4 shadow-[0_3px_16px_#1E4C6F12] sm:px-5`} aria-labelledby={`swot-${item.key}`}>
                    <h3 id={`swot-${item.key}`} className="mb-2 text-sm font-semibold">{item.title} <span dir="ltr">({item.english})</span></h3>
                    <ul className="list-disc space-y-1 ps-4 text-xs leading-6 text-[#253D4E]">{item.items.map(text => <li key={text}>{text}</li>)}</ul>
                </section>)}
            </div>
        </section>

        <footer className={`${styles.actions} flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-[#4B708C]`}>
            <Link href={historyHref} className="inline-flex min-h-9 items-center gap-2 rounded hover:text-[#1E4C6F] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"><ArrowRight size={14} aria-hidden="true" />العودة إلى سجل التقييمات</Link>
            {projectId && <Link href={`/dashboard/idea-owner/view-project?id=${encodeURIComponent(projectId)}`} className="rounded hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">تفاصيل المشروع</Link>}
        </footer>
    </article>
}
