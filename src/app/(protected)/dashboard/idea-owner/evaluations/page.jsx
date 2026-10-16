import EvaluationsPage from "@/features/dashboards/owner/evaluations/EvaluationsPage"
import EvaluationReportPage from "@/features/dashboards/owner/evaluations/EvaluationReportPage"
import EvaluationEmptyState from "@/features/dashboards/owner/evaluations/components/EvaluationEmptyState"
import { evaluationHref, getEvaluationProject, getEvaluationReport } from "@/features/dashboards/owner/evaluations/data/evaluationReport"
import Link from "next/link"

export async function generateMetadata({ searchParams }) {
    const params = await searchParams
    return { title: `${params.report ? "تقرير تقييم المشروع" : "سجل التقييمات"} | إحياء` }
}

const page = async ({ searchParams }) => {
    const params = await searchParams
    const projectId = typeof params.id === "string" ? params.id : undefined
    const project = getEvaluationProject(projectId)
    const state = ["single", "cooldown", "empty"].includes(params.state) ? params.state : "history"

    if (params.report) {
        const evaluation = params.report === "latest" ? project.reports.at(-1) : project.reports.find(report => report.id === params.report)
        if (!evaluation || state === "empty") return <div className="mx-auto max-w-6xl text-[#0D202F]" dir="rtl">
            <h1 className="text-xl font-bold sm:text-2xl">تقرير تقييم المشروع</h1>
            <EvaluationEmptyState variant="report" actionHref={evaluationHref({ projectId, state: "single" })} />
            <Link href={evaluationHref({ projectId })} className="text-sm font-semibold text-[#1E4C6F] hover:underline">العودة إلى سجل التقييمات</Link>
        </div>
        return <EvaluationReportPage projectId={projectId} report={getEvaluationReport(project, evaluation)} />
    }

    return <EvaluationsPage key={`${project.id}-${state}`} state={state} projectId={projectId} projectName={project.name} reports={project.reports} />
}

export default page
