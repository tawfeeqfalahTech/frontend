// Temporary presentation data until the investor dashboard service is connected.
export const suggestedProjects = [
    { id: "stores", title: "مشروع إدارة المتاجر", category: "إدارة", description: "إدارة المتاجر ومتابعة المبيعات والمخزون بسهولة من مكان واحد.", sector: "إدارة وأعمال", score: 80, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "projects", title: "مشروع إدارة المشاريع", category: "برمجيات", description: "منصة لتنظيم المهام والمشاريع ومساعدة فرق العمل على الإنجاز.", sector: "برمجيات", score: 88, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "services", title: "منصة الخدمات", category: "خدمات رقمية", description: "ربط مقدمي الخدمات بالعملاء في منصة واحدة لتسهيل الوصول للخدمات.", sector: "برمجيات", score: 76, stage: "جاهز للتمويل", cover: "/images/Rectangle 16.png" },
    { id: "education", title: "منصة التعليم", category: "تعليم", description: "تجربة تعليمية تفاعلية تربط الطلاب بالمعلمين وتدعم التعلم عن بعد.", sector: "تقنيات التعليم", score: 84, stage: "مرحلة النمو", cover: "/images/Rectangle 16.png" },
    { id: "health", title: "حلول الصحة", category: "صحة", description: "حلول رقمية لتحسين الخدمات الصحية وتسهيل متابعة المرضى.", sector: "تقنيات الصحة", score: 82, stage: "نموذج أولي", cover: "/images/Rectangle 16.png" },
];

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

// Home previews: ?state=complete | empty-updates | incomplete-profile | empty | empty-saved.
// Without a preview, profile completeness and saved projects reflect the local account.
export const dashboardPreviewStates = ["complete", "empty-updates", "incomplete-profile", "empty", "empty-saved"];

export function getDashboardState(state) {
    return {
        requests: state === "empty" ? [] : investorRequests,
        savedIds: ["empty", "empty-saved"].includes(state) ? [] : initialSavedIds,
        updates: ["empty", "empty-updates"].includes(state) ? [] : recentUpdates,
        profileState: state === "incomplete-profile" ? "incomplete" : state ? "complete" : "auto",
    };
}
