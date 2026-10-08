// Presentation data until the project/evaluation service is connected.
export const projectEvaluationStates = ["completed", "report", "unevaluated", "evaluating", "failed"]

export const projectDetails = {
    id: "sanad",
    title: "منصة ‘سند’: الذكاء الاصطناعي لتحليل المستندات القانونية",
    subtitle: "منصة سحابية متقدمة تستخدم نماذج اللغات الكبيرة المعربة لتحليل العقود واستخراج الثغرات القانونية.",
    description: "تتمحور فكرة ‘سند’ حول توفير محرك ذكاء اصطناعي سيادي مبني بالكامل ومخصص لفهم الصياغات اللغوية الفقهية والقانونية المستخدمة في المحاكم وصياغات العقود العربية. يعالج النظام ثغرات الصياغة بدقة تفوق المحركات التقليدية بمعدل 40% من خلال نماذج تعلم عميق مدربة على أرشيف ضخم من الوثائق المحررة والأنظمة الرسمية السعودية والخليجية.",
    cover: "/images/project-details/cover.png",
    videoPoster: "/images/project-details/video.png",
    videoUrl: null,
    owner: { name: "د. عبد الرحمن آل سعود", email: "a.alsaud@sanad.ai", image: "/images/project-details/owner.png" },
    tags: ["تقنية", "الذكاء الاصطناعي (AI)", "تقنيات قانونية", "معالجة اللغات", "اللغة العربية"],
    indicators: [
        { label: "الميزانية المتوقعة", value: "500k - 1.5M USD" },
        { label: "حالة العرض", value: "متاح للمستثمرين" },
        { label: "عدد المشاهدات", value: "432 مشاهدة" },
    ],
    files: [
        { name: "العرض التقديمي للمستثمرين.pdf", size: "4.2 MB", url: null },
        { name: "دراسة الجدوى الفنية والتقنية.pdf", size: "8.1 MB", url: null },
    ],
    links: [
        { label: "انستقرام", text: "instagram.com/sanad-ai", url: "https://instagram.com/sanad-ai" },
        { label: "فيسبوك", text: "facebook.com/sanad-ai", url: "https://facebook.com/sanad-ai" },
        { label: "رابط الكود", text: "github.com/sanad-ai", url: "https://github.com/sanad-ai" },
        { label: "رابط المشروع", text: "sanad.com/sanad-ai", url: "https://sanad.com/sanad-ai" },
    ],
    evaluation: {
        score: 88,
        model: "DeepSeek-v3.1",
        duration: "12.4 ms",
        dimensions: [
            { label: "جودة الشفرة المصدرية ووثائق المنتج", shortLabel: "جودة الشفرة", score: 94 },
            { label: "جودة الخدمات وأدلة الجدوى التجارية", shortLabel: "الجدوى التجارية", score: 85 },
            { label: "مدى استيفاء المعايير وشروط التحقق والابتكار", shortLabel: "الابتكار", score: 98 },
            { label: "جودة رؤية المستخدم ووصف القطاع المستهدف", shortLabel: "القطاع المستهدف", score: 78 },
            { label: "القيمة الاستثمارية ومعدل نمو رأس المال", shortLabel: "الاستثمار", score: 86 },
        ],
        strengths: [
            "ابتكار تقني نوعي: معالجة النصوص القانونية باللغة العربية.",
            "تخصص واضح: تلبية حاجة فعلية لدى مكاتب المحاماة والشركات.",
            "قابلية التوسع: نموذج سحابي يمكن تطويره لخدمة أسواق عربية جديدة.",
        ],
        recommendations: [
            "توسيع اختبارات الدقة على مجموعات متنوعة من العقود، مع توثيق النتائج ومراجعتها من متخصصين قانونيين.",
            "تحسين تجربة المستخدم وإضافة أمثلة عملية توضح آلية تحليل المستندات وحماية بيانات العملاء.",
        ],
        technologies: ["معالجة اللغة الطبيعية", "التعلم العميق", "نماذج اللغات الكبيرة", "تحليل البيانات"],
    },
}
