// Temporary presentation data until the investor dashboard service is connected.
export const suggestedProjects = [
    { id: "stores", title: "مشروع إدارة المتاجر", category: "إدارة", description: "إدارة المتاجر ومتابعة المبيعات والمخزون بسهولة من مكان واحد.", sector: "إدارة وأعمال", score: 80, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "projects", title: "مشروع إدارة المشاريع", category: "برمجيات", description: "منصة لتنظيم المهام والمشاريع ومساعدة فرق العمل على الإنجاز.", sector: "برمجيات", score: 88, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "services", title: "منصة الخدمات", category: "خدمات رقمية", description: "ربط مقدمي الخدمات بالعملاء في منصة واحدة لتسهيل الوصول للخدمات.", sector: "برمجيات", score: 76, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "education", title: "منصة التعليم", category: "تعليم", description: "تجربة تعليمية تفاعلية تربط الطلاب بالمعلمين وتدعم التعلم عن بعد.", sector: "تقنيات التعليم", score: 84, stage: "مرحلة النمو", cover: "/images/Rectangle 16.png" },
    { id: "health", title: "حلول الصحة", category: "صحة", description: "حلول رقمية لتحسين الخدمات الصحية وتسهيل متابعة المرضى.", sector: "تقنيات الصحة", score: 82, stage: "نموذج أولي", cover: "/images/Rectangle 16.png" },
    { id: "real-estate", title: "منصة العقارات", category: "عقارات", description: "منصة تسهّل استكشاف العقارات وإدارة فرص الاستثمار العقاري.", sector: "العقارات", score: 91, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "logistics", title: "حلول الشحن الذكي", category: "لوجستيات", description: "إدارة الشحنات وتتبع عمليات التوصيل وربط المتاجر بشركات النقل.", sector: "اللوجستيات", score: 73, stage: "نموذج أولي", cover: "/images/Rectangle 16.png" },
    { id: "finance", title: "منصة التمويل الرقمي", category: "تقنية مالية", description: "حلول مالية رقمية تساعد المنشآت على تنظيم التدفقات النقدية.", sector: "التقنية المالية", score: 86, stage: "مرحلة النمو", cover: "/images/Rectangle 16.png" },
    { id: "learning", title: "أكاديمية المستقبل", category: "تعليم", description: "منصة تعليمية توفر مسارات تدريبية مرنة لتنمية المهارات التقنية.", sector: "التعليم", score: 79, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
].map((project, index) => ({
    ...project,
    domain: ["التقنية المالية", "التقنية المالية", "اللوجستيات", "التعليم", "الصحة", "العقارات", "اللوجستيات", "التقنية المالية", "التعليم"][index],
    technologies: [["React", "Laravel"], ["React", "AI/ML"], ["Flutter", "React"], ["React", "Python"], ["AI/ML", "Swift"], ["React", "Laravel"], ["Flutter", "AI/ML"], ["React", "Python"], ["React", "AI/ML"]][index],
    funding: 4000 + index * 1000,
    supporters: 5 + index,
    status: project.stage === "نموذج أولي" ? "يحتاج تطوير" : project.stage === "مرحلة النمو" ? "مكتمل" : "يحتاج تمويل",
    publishedAt: `2026-10-${String(16 - index).padStart(2, "0")}`,
}));

export const investorRequests = [
    { id: "request-stores", projectId: "stores", status: "accepted", date: "منذ يومين" },
    { id: "request-education", projectId: "education", status: "pending", date: "منذ ٣ أيام" },
    { id: "request-health", projectId: "health", status: "pending", date: "منذ ٤ أيام" },
];
export const initialSavedIds = ["projects", "services"];
export const recentUpdates = [
    { id: "accepted", type: "request", text: "تم قبول طلب اهتمامك بمشروع إدارة المتاجر", projectId: "stores", time: "قبل ساعتين" },
    { id: "updated", type: "project", text: "أُضيف ملف جديد لمشروع منصة التعليم", projectId: "education", time: "قبل ٥ ساعات" },
    { id: "saved", type: "saved", text: "حفظت مشروع إدارة المشاريع", projectId: "projects", time: "أمس" },
];

export function getDashboardData() {
    return {
        projects: suggestedProjects,
        requests: investorRequests,
        savedIds: initialSavedIds,
        updates: recentUpdates,
    };
}
