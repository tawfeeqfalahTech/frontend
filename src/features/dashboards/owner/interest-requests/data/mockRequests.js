export const initialRequests = [
    {
        id: 1,
        investorName: "أحمد الراشدي",
        avatar: "/images/avatar.png",
        requestType: "طلب استثمار",
        status: "pending", // قيد المراجعة
        time: "قبل 3 ساعات",
        message: "مهتم جداً برؤية المشروع وأريد مناقشة إمكانية تمويل الجولة التأسيسية بأسرع وقت ممكن وتحديد المواعيد القادمة."
    },
    {
        id: 2,
        investorName: "أحمد الراشدي",
        avatar: "/images/avatar.png",
        requestType: "طلب استثمار",
        status: "accepted", // مقبول
        hasDocument: true,
        documentName: "عرض مستند الاتفاق (PDF)",
        documentUrl: "#",
        time: "قبل 3 ساعات",
        message: "مهتم جداً برؤية المشروع وأريد مناقشة إمكانية تمويل الجولة التأسيسية بأسرع وقت ممكن وتحديد المواعيد القادمة."
    },
    {
        id: 3,
        investorName: "أحمد الراشدي",
        avatar: "/images/avatar.png",
        requestType: "طلب استثمار",
        status: "rejected", // مرفوض
        rejectReason: "لقد قدمت عرضاً جيداً ولكن تم التوافق مع مستثمر من قبل",
        time: "قبل 3 ساعات",
        message: "مهتم جداً برؤية المشروع وأريد مناقشة إمكانية تمويل الجولة التأسيسية بأسرع وقت ممكن وتحديد المواعيد القادمة."
    },
    {
        id: 4,
        investorName: "أحمد الراشدي",
        avatar: "/images/avatar.png",
        requestType: "طلب استثمار",
        status: "cancelled", // ملغي
        cancelledBadgeText: "ملغي من المستثمر",
        time: "قبل 3 ساعات",
        message: "مهتم جداً برؤية المشروع وأريد مناقشة إمكانية تمويل الجولة التأسيسية بأسرع وقت ممكن وتحديد المواعيد القادمة."
    },
    {
        id: 5,
        investorName: "أحمد الراشدي",
        avatar: "/images/avatar.png",
        requestType: "طلب استثمار",
        status: "accepted", // مقبول بانتظار المستند
        hasDocument: false,
        pendingDocText: "سيتم توفير مستند الاتفاق قريباً",
        contactEmail: "fatima.z@techlabs.io",
        time: "قبل 3 ساعات",
        message: "مهتم جداً برؤية المشروع وأريد مناقشة إمكانية تمويل الجولة التأسيسية بأسرع وقت ممكن وتحديد المواعيد القادمة."
    }
]
