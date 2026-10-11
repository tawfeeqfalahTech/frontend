// Presentation fixtures. Replace this adapter with the admin analytics service
// when its endpoint is available; do not present these figures as live data.
export const adminPreviewStates = ["complete", "empty", "loading", "error", "empty-activity", "empty-projects", "empty-requests"];

const sampleData = {
    source: "demo",
    users: { total: 1284, owners: 762, investors: 366, admins: 156 },
    projects: { total: 326, published: 158, reviewing: 106, drafts: 62 },
    evaluation: { average: 84, count: 126 },
    activity: [
        { day: "السبت", count: 68 }, { day: "الأحد", count: 104 },
        { day: "الإثنين", count: 162 }, { day: "الثلاثاء", count: 48 },
        { day: "الأربعاء", count: 76 }, { day: "الخميس", count: 69 },
        { day: "الجمعة", count: 166 },
    ],
    sectors: [
        { name: "التقنية", count: 118, color: "#1E4C6F" },
        { name: "التعليم", count: 81, color: "#9E7F4D" },
        { name: "الصحة", count: 62, color: "#367C59" },
        { name: "الخدمات", count: 65, color: "#E6A23C" },
    ],
    requests: { pending: 31, accepted: 172, rejected: 29, cancelled: 16 },
};

export function getAdminDashboardData(state = "") {
    if (state === "error" || state === "loading") return null;
    const empty = state === "empty";
    const emptyProjects = empty || state === "empty-projects";
    return {
        ...sampleData,
        users: empty ? { total: 0, owners: 0, investors: 0, admins: 0 } : sampleData.users,
        projects: emptyProjects ? { total: 0, published: 0, reviewing: 0, drafts: 0 } : sampleData.projects,
        evaluation: emptyProjects ? { average: null, count: 0 } : sampleData.evaluation,
        activity: empty || state === "empty-activity" ? [] : sampleData.activity,
        sectors: emptyProjects ? [] : sampleData.sectors,
        requests: empty || state === "empty-requests" ? { pending: 0, accepted: 0, rejected: 0, cancelled: 0 } : sampleData.requests,
    };
}

export const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);

// A single report builder keeps downloaded figures consistent with the screen.
export function buildAdminCsv(data) {
    const rows = [
        ["القسم", "المؤشر", "القيمة", "الوحدة"],
        ["مصدر البيانات", "بيانات تجريبية", "", ""],
        ["المستخدمون", "الإجمالي", data.users.total, "مستخدم"],
        ["المستخدمون", "أصحاب المشاريع", data.users.owners, "مستخدم"],
        ["المستخدمون", "المستثمرون", data.users.investors, "مستخدم"],
        ["المستخدمون", "الإدارة", data.users.admins, "مستخدم"],
        ["المشاريع", "الإجمالي", data.projects.total, "مشروع"],
        ["المشاريع", "منشور", data.projects.published, "مشروع"],
        ["المشاريع", "قيد المراجعة", data.projects.reviewing, "مشروع"],
        ["المشاريع", "مسودة", data.projects.drafts, "مشروع"],
        ["تقييم AI", "متوسط التقييم", data.evaluation.average ?? "", "%"],
        ["تقييم AI", "المشاريع المقيّمة", data.evaluation.count, "مشروع"],
        ...data.activity.map((item) => ["المستخدمون النشطون — آخر 7 أيام", item.day, item.count, "مستخدم"]),
        ...data.sectors.map((item) => ["مجالات المشاريع", item.name, item.count, "مشروع"]),
        ["طلبات الاهتمام", "الإجمالي", Object.values(data.requests).reduce((sum, count) => sum + count, 0), "طلب"],
        ["طلبات الاهتمام", "معلّق", data.requests.pending, "طلب"],
        ["طلبات الاهتمام", "مقبول", data.requests.accepted, "طلب"],
        ["طلبات الاهتمام", "مرفوض", data.requests.rejected, "طلب"],
        ["طلبات الاهتمام", "ملغي", data.requests.cancelled, "طلب"],
    ];
    return "\uFEFF" + rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
}
