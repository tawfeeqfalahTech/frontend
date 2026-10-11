// Presentation data until the admin users service is available.
export const roles = { idea_owner: "صاحب فكرة", investor: "مستثمر", admin: "مدير النظام" };
export const statuses = {
    active: { label: "نشط", color: "#367C59", background: "#EAF4ED" },
    pending: { label: "معلّق", color: "#A77832", background: "#FBF2E3" },
    blocked: { label: "محظور", color: "#B85B65", background: "#FBECEF" },
};

export const demoUsers = [
    { id: "USR-001", name: "أحمد الحربي", email: "ahmad.harbi@example.com", role: "idea_owner", status: "active", joined: "2026-10-07", city: "الرياض", projects: 4, requests: 2 },
    { id: "USR-002", name: "سارة القحطاني", email: "sara.qahtani@example.com", role: "investor", status: "active", joined: "2026-10-06", city: "جدة", projects: 0, requests: 8 },
    { id: "USR-003", name: "عبدالله الدوسري", email: "abdullah.d@example.com", role: "idea_owner", status: "pending", joined: "2026-10-05", city: "الدمام", projects: 2, requests: 0 },
    { id: "USR-004", name: "نورة السبيعي", email: "noura.s@example.com", role: "investor", status: "blocked", joined: "2026-10-04", city: "الرياض", projects: 0, requests: 3 },
    { id: "USR-005", name: "خالد الغامدي", email: "khalid.g@example.com", role: "investor", status: "pending", joined: "2026-10-03", city: "مكة", projects: 0, requests: 1 },
    { id: "USR-006", name: "ريم المطيري", email: "reem.m@example.com", role: "idea_owner", status: "active", joined: "2026-10-02", city: "المدينة", projects: 3, requests: 4 },
    { id: "USR-007", name: "محمد العنزي", email: "mohammad.a@example.com", role: "idea_owner", status: "active", joined: "2026-10-01", city: "الرياض", projects: 1, requests: 2 },
    { id: "USR-008", name: "لينا الزهراني", email: "lina.z@example.com", role: "investor", status: "active", joined: "2026-09-29", city: "جدة", projects: 0, requests: 6 },
    { id: "USR-009", name: "عمر الشمري", email: "omar.s@example.com", role: "idea_owner", status: "pending", joined: "2026-09-26", city: "حائل", projects: 2, requests: 0 },
    { id: "USR-010", name: "هند العتيبي", email: "hind.o@example.com", role: "investor", status: "active", joined: "2026-09-24", city: "الرياض", projects: 0, requests: 5 },
    { id: "USR-011", name: "فهد القحطاني", email: "fahad.q@example.com", role: "idea_owner", status: "blocked", joined: "2026-09-22", city: "أبها", projects: 1, requests: 1 },
    { id: "USR-012", name: "دانة الحربي", email: "dana.h@example.com", role: "investor", status: "active", joined: "2026-09-20", city: "الدمام", projects: 0, requests: 4 },
];

export const formatDate = (value) => new Intl.DateTimeFormat("ar", { day: "numeric", month: "long", year: "numeric", numberingSystem: "latn", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
export const initials = (name) => name.split(/\s+/).slice(0, 2).map((word) => word[0]).join(" ");
export const normalizeSearch = (value) => value.toLowerCase().normalize("NFKD").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").trim();

export function filterUsers(users, { query, role, status, sort }) {
    const search = normalizeSearch(query);
    return users.filter((user) => (!role || user.role === role) && (!status || user.status === status) && normalizeSearch(`${user.name} ${user.email} ${user.id}`).includes(search))
        .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name, "ar") : sort === "oldest" ? a.joined.localeCompare(b.joined) : b.joined.localeCompare(a.joined));
}

export function buildUsersCsv(users) {
    const rows = [["بيانات تجريبية — المستخدمون"], ["المعرّف", "الاسم", "البريد الإلكتروني", "الدور", "الحالة", "تاريخ التسجيل"], ...users.map((user) => [user.id, user.name, user.email, roles[user.role], statuses[user.status].label, user.joined])];
    return "\uFEFF" + rows.map((row) => row.map((value) => {
        const text = String(value);
        return `"${(/^[=+@\-\t\r]/.test(text) ? "'" : "") + text.replaceAll('"', '""')}"`;
    }).join(",")).join("\r\n");
}
