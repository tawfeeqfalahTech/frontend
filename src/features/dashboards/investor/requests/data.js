// Presentation data, like the investor dashboard, until the requests service is connected.
export const requestFilters = [
    { id: "all", label: "الكل" },
    { id: "pending", label: "معلق" },
    { id: "accepted", label: "مقبول" },
    { id: "rejected", label: "مرفوض" },
    { id: "cancelled", label: "ملغي" },
];

export const requestStatuses = {
    pending: { label: "قيد مراجعة المالك", color: "#9E7F4D", background: "#F9F6F0" },
    accepted: { label: "تم القبول", color: "#367C59", background: "#EDF7EE" },
    rejected: { label: "مرفوض", color: "#DC4545", background: "#FFF0F0" },
    cancelled: { label: "ملغي من قبلك", color: "#757D85", background: "#F0F2F4" },
};

export const requestInvestmentTypes = ["استثمار مباشر", "تطوير تقني واستثمار", "استثمار رأس مال", "طلب استثمار"];

export const initialRequests = [
    { id: "request-education", projectId: "education", status: "pending", type: "استثمار مباشر", date: "قبل ٣ ساعات", message: "مهتم بالمشروع وأرغب بمناقشة إمكانية تمويله والتعرف على الخطوات القادمة." },
    { id: "request-stores", projectId: "stores", status: "accepted", type: "تطوير تقني واستثمار", date: "قبل ٥ ساعات", message: "أرغب في المساهمة في تطوير المشروع ودعم نموه.", document: { name: "مستند الاتفاق الأولي", reference: "AGR-DEMO-001", description: "معاينة توضيحية لحالة الطلب المقبول مع مستند اتفاق. سيظهر المستند الفعلي هنا عند توفيره من صاحب المشروع." } },
    { id: "request-health", projectId: "health", status: "rejected", type: "استثمار رأس مال", date: "منذ يوم", message: "أرغب في الاستثمار في المشروع والمساهمة في توسيع خدماته.", rejectReason: "لقد قدمت عرضاً جيداً ولكن تم الاتفاق مع مستثمر آخر." },
    { id: "request-projects", projectId: "projects", status: "cancelled", type: "استثمار مباشر", date: "منذ يومين", message: "مهتم بتمويل الجولة التأسيسية ومناقشة فرص التعاون.", canResubmit: true },
    { id: "request-services", projectId: "services", status: "accepted", type: "طلب استثمار", date: "منذ ٣ أيام", message: "أرغب في دعم المشروع والمساهمة في تطوير خدمات المنصة.", contactEmail: "owner@example.com" },
    { id: "request-real-estate", projectId: "real-estate", status: "cancelled", type: "استثمار مباشر", date: "منذ ٤ أيام", message: "مهتم بالمشروع وأرغب في معرفة المزيد عن الفرص المتاحة.", canResubmit: false },
];
