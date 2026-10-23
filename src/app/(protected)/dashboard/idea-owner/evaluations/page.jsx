import { requierRole } from "@/lib/auth";
import EvaluationsPage from "@/features/dashboards/owner/evaluations/EvaluationsPage"
import EvaluationReportPage from "@/features/dashboards/owner/evaluations/EvaluationReportPage"
import EvaluationEmptyState from "@/features/dashboards/owner/evaluations/components/EvaluationEmptyState"
import { evaluationHref, getEvaluationReport } from "@/features/dashboards/owner/evaluations/data/evaluationReport"
import { getOwnerProject } from "@/features/dashboards/data/dashboardRepository"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateMetadata({ searchParams }) {
    const params = await searchParams
    return { title: `${params.report ? "تقرير تقييم المشروع" : "سجل التقييمات"} | إحياء` }
}

const page = async ({ searchParams }) => {
    await requierRole("idea_owner");
    const params = await searchParams
    const project = await getOwnerProject(typeof params.id === "string" ? params.id : undefined)
    if (!project) notFound()
    const projectId = project.id

    if (params.report) {
        const evaluation = params.report === "latest" ? project.reports.at(-1) : project.reports.find(report => report.id === params.report)
        if (!evaluation && project.reports.length > 0) notFound()
        if (!evaluation) return <div className="mx-auto max-w-6xl text-[#0D202F]" dir="rtl">
            <h1 className="text-xl font-bold sm:text-2xl">تقرير تقييم المشروع</h1>
            <EvaluationEmptyState variant="report" actionHref={`/dashboard/idea-owner/view-project?id=${encodeURIComponent(projectId)}#project-evaluation`} />
            <Link href={evaluationHref({ projectId })} className="text-sm font-semibold text-[#1E4C6F] hover:underline">العودة إلى سجل التقييمات</Link>
        </div>
        return <EvaluationReportPage projectId={projectId} report={getEvaluationReport({ ...project, name: project.title }, evaluation)} />
    }

    return <EvaluationsPage key={`${project.id}-${project.nextEvaluationAt || ""}`} projectId={projectId} projectName={project.title} reports={project.reports} nextEvaluationAt={project.nextEvaluationAt} />
}

export default page
