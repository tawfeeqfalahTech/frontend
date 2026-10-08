import { File } from "lucide-react"
import Image from "next/image"
import ProjectEvaluation from "@/features/dashboards/owner/project/ProjectEvaluation"
const page = async ({ searchParams }) => {
    const params = await searchParams
    const state = ["completed", "report", "unevaluated", "evaluating", "failed"].includes(params.state) ? params.state : "completed"
    const title = "المؤشرات المالية والتشغيلية"
    const items = [
        { label: "الميزانية المتوقعة", value: "500k - 1.5M USD" },
        { label: "حالة العرض", value: "متاح للمستثمرين" },
        { label: "عدد المشاهدات", value: "432 مشاهدة" },
    ]

    const titlee = "المستندات والملفات المرفقة"
    const files = [
        { name: "العرض التقديمي للمستثمرين.pdf", size: "4.2 MB" },
        { name: "دراسة الجدوى الفنية والتقنية.pdf", size: "8.1 MB" },
    ]

    const links = [
        { label: "انستقرام", url: "instagram.com/sanad-ai" },
        { label: "فيسبوك", url: "facebook.com/sanad-ai" },
        { label: "رابط المشروع", url: "sand.com/sanad-ai" },
    ]

    const tags = ["الذكاء الاصطناعي", "RegTech", "تقنيات قانونية", "NLP", "معالجة اللغات الطبيعية", "SaaS"]

    return (
        <main className="min-w-0 px-0 sm:px-4 lg:px-6 xl:px-30">
            <section>
                <div>
                    <h1 className="text-xl leading-relaxed font-semibold sm:text-2xl xl:text-3xl xl:leading-9">منصة &apos;سند&apos;: الذكاء الاصطناعي لتحليل المستندات القانونية </h1>
                </div>
                <p className="text-[#4B5563] text-sm font-semibold mt-1">منصة سحابية متقدمة تستخدم نماذج اللغات الكبيرة المعربة لتحليل العقود واستخراج الثغرات القانونية.</p>
                <div className="relative mt-4 w-full h-40 sm:h-45 rounded-xl overflow-hidden">
                    <Image
                        src="/images/cover-image.png"
                        alt="cover"
                        fill
                        sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 80px), (max-width: 1279px) calc(100vw - 96px), calc(100vw - 288px)"
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-4 mt-5 lg:flex-row">

                    <div className="order-2 w-full min-w-0 shrink-0 lg:order-1 lg:w-72 xl:w-80">
                        <div
                            className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">مالك الفكرة</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-13 h-13 relative shrink-0">
                                    <Image src="/images/avatar.png" alt="Owner" width={80} height={80} className="rounded-full absolute max-lg:h-13 max-lg:w-13 max-lg:object-cover" />
                                </div>
                                <div className="min-w-0 break-words">
                                    <h4 className="text-sm font-bold text-gray-900">د. عبد الرحمن آل سعود</h4>
                                    <p className="text-xs text-[#4B708C] font-semibold">a.alsaud@sanad.ai</p>
                                </div>
                            </div>

                        </div>
                        <div
                            className="w-full mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">{title}</h3>

                            <div className="divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between gap-2 py-3 first:pt-0 last:pb-0 max-sm:flex-col max-sm:items-start"
                                    >
                                        <span className="text-sm text-[#4B708C] font-bold">{item.label}</span>
                                        <span className="text-sm font-semibold text-gray-900 max-sm:self-end" dir="auto">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-full mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-3 text-[15px] font-bold text-gray-900">{titlee}</h3>

                            <div className="flex flex-col space-y-2">
                                {files.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="flex gap-2 bg-gray-50 hover:bg-gray-100 cursor-pointer px-2 rounded-lg items-center justify-between min-h-10 py-2 transition-colors duration-200"
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <File size={18} className="shrink-0" />
                                            <span className="break-words text-xs font-semibold text-gray-900">
                                                {file.name}
                                            </span>
                                        </div>
                                        <span className="shrink-0 text-sm text-gray-400" dir="ltr">{file.size}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">روابط السوشيال ميديا</h3>

                            <div className="divide-y divide-gray-100">
                                {links.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between gap-2 py-3 first:pt-0 last:pb-0 max-sm:flex-col max-sm:items-start"
                                    >
                                        <span className="text-sm text-[#4B708C] font-bold">{item.label}</span>
                                        <span className="min-w-0 break-all text-sm text-blue-400 hover:underline cursor-pointer max-sm:self-end" dir="ltr">
                                            {item.url}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="order-1 w-full min-w-0 lg:order-2 lg:flex-1">

                        <div
                            className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm"
                        >
                            <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
                            <hr className="text-gray-100 block my-4" />
                            <p className="mb-3 leading-5 text-xs font-semibold text-[#68879F]">تتمحور فكرة &quot;سند&quot; حول توفير محرك ذكاء اصطناعي سيادي مبني بالكامل ومخصص لفهم الصياغات اللغوية الفقهية والقانونية المستخدمة في المحاكم وصياغات العقود العربية. يعالج النظام ثغرات الصياغة بدقة تفوق المحركات التقليدية بمعدل %40 من خلال نماذج تعلم عميق مدربة على أرشيف ضخم من الوثائق المحررة والأنظمة الرسمية السعودية والخليجية.</p>

                            <h4 className="mb-3 text-sm font-bold text-gray-900">التصنيفات والمجال البرمجي</h4>

                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-full mt-4 max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm"
                        >
                            <h3 className="mb-2 text-lg font-bold text-gray-900">الفيديو التعريفي وقصة المشروع</h3>

                            <div className="relative mt-4 w-full h-40 rounded-xl overflow-hidden">
                                <Image
                                    src="/images/video-player.png"
                                    alt="cover"
                                    fill
                                    sizes="(max-width: 639px) calc(100vw - 80px), (max-width: 1023px) calc(100vw - 128px), (max-width: 1279px) calc(100vw - 448px), 720px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        <ProjectEvaluation key={`${params.id || "sanad"}-${state}`} initialState={state} projectId={params.id || "sanad"} />

                    </div>
                </div>

            </section>
        </main>
    )
}

export default page
