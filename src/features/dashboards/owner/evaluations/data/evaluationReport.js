import { projects } from "../../data/projects"
import { projectDetails } from "../../project/projectDetails"
import { evaluationHistory } from "./mockEvaluations"

// Presentation fixtures; replace with the project's evaluation service when available.
const agricultureName = "قناة الذكي للزراعة المائية"

export const readinessDimensions = [
    { key: "documentation", label: "التوثيق", scoreIndex: 4 },
    { key: "team", label: "الفريق", scoreIndex: 3 },
    { key: "technology", label: "التقنية", scoreIndex: 0 },
    { key: "innovation", label: "الابتكار", scoreIndex: 1 },
    { key: "market", label: "السوق", scoreIndex: 2 },
]

export function getEvaluationProject(projectId) {
    const isSanad = projectId === projectDetails.id
    const project = projects.find(item => item.id === projectId)
    const name = isSanad ? projectDetails.title : project?.title || agricultureName
    const reports = isSanad ? evaluationHistory.map((report, index) => index === evaluationHistory.length - 1 ? {
        ...report,
        score: projectDetails.evaluation.score,
        scores: [94, 98, 85, 78, 86],
    } : report) : evaluationHistory

    return { id: projectId || "smart-agriculture", name, reports, isSanad }
}

export function getEvaluationReport(project, evaluation) {
    const isSanad = project.isSanad
    const isAgriculture = project.id === "smart-agriculture"
    return {
        ...evaluation,
        projectName: project.name,
        dimensions: readinessDimensions.map(dimension => ({ ...dimension, score: evaluation.scores[dimension.scoreIndex] })),
        gaps: [
            { key: "documentation", title: "فجوة التوثيق", priority: "متوسط", description: isSanad ? "استكمال توثيق اختبارات دقة تحليل المستندات وآلية حماية بيانات العملاء." : "استكمال توثيق براءات الاختراع وإضافة الوثائق التي تثبت إجراءات الأمن السيبراني." },
            { key: "team", title: "فجوة الفريق", priority: "منخفض", description: isAgriculture ? "توظيف مختصين بخبرة في إنترنت الأشياء وتعلّم الآلة لدعم الفريق التقني وتطوير الحلول." : "تعزيز الفريق بمتخصصين في المجال ومدير منتج لدعم تطوير الحلول وتوسّعها." },
            { key: "market", title: "فجوة السوق", priority: "متوسط", description: "توسيع اختبارات السوق ودراسة احتياجات العملاء في المنطقة العربية والخليجية." },
            { key: "technology", title: "فجوة التقنية", priority: "مرتفع", description: isAgriculture ? "تحسين حساسات إنترنت الأشياء، مع إضافة اختبارات للمياه وتتبع فاعلية النظام خلال فترات الاستخدام." : "إجراء اختبارات للأداء والدقة تحت ضغط الاستخدام، وتحسين قابلية النظام للتوسّع." },
        ],
        skills: isAgriculture ? ["الملكية الفكرية والتسجيل الدولي", "التسويق وتطوير الأعمال", "تطوير حلول إنترنت الأشياء IoT", "علوم البيانات الزراعية", "هندسة الذكاء الاصطناعي (ML)"] : ["الملكية الفكرية والتسجيل الدولي", "التسويق وتطوير الأعمال", "تطوير المنتجات", "علوم البيانات", "هندسة الذكاء الاصطناعي (ML)"],
        swot: [
            { key: "strengths", title: "نقاط القوة", english: "Strengths", items: isSanad ? projectDetails.evaluation.strengths.slice(0, 2) : isAgriculture ? ["خوارزمية ذكاء اصطناعي حاصلة على براءة اختراع محلية", "فريق عمل بخبرة عشرين سنة في العلوم المائية"] : ["حل تقني يلبي احتياجاً واضحاً لدى العملاء", "فريق يمتلك خبرة في تطوير المنتج وتشغيله"] },
            { key: "weaknesses", title: "نقاط الضعف", english: "Weaknesses", items: ["اعتمادية عالية على مورد تقني واحد للقطع والمستشعرات", "نقص الكفاءات التسويقية المتخصصة بالقطاع التقني"] },
            { key: "opportunities", title: "الفرص", english: "Opportunities", items: isAgriculture ? ["الدعم الحكومي والتمويل المتزايد لدعم مشاريع الأمن الغذائي", "فتح أسواق جديدة ودولية في الخليج العربي"] : ["تزايد الطلب على حلول الذكاء الاصطناعي المتخصصة", "التوسّع إلى أسواق جديدة في المنطقة العربية"] },
            { key: "threats", title: "التهديدات", english: "Threats", items: ["تقلبات أسعار توريد مكونات أنظمة الذكاء الاصطناعي عالمياً", "ظهور منافسين بتمويلات ضخمة في المنطقة"] },
        ],
    }
}

export function evaluationHref({ projectId, reportId, state } = {}) {
    const params = new URLSearchParams()
    if (projectId) params.set("id", projectId)
    if (reportId) params.set("report", reportId)
    if (state) params.set("state", state)
    return `/dashboard/idea-owner/evaluations${params.size ? `?${params}` : ""}`
}
