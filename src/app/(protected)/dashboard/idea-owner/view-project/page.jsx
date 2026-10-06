import { File } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const page = () => {
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
        <main className="px-30">
            <section>
                <div>
                    <h1 className="text-3xl font-semibold">منصة &apos;سند&apos;: الذكاء الاصطناعي لتحليل المستندات القانونية </h1>
                </div>
                <p className="text-[#4B5563] text-sm font-semibold mt-1">منصة سحابية متقدمة تستخدم نماذج اللغات الكبيرة المعربة لتحليل العقود واستخراج الثغرات القانونية.</p>
                <div className="relative mt-4 w-full h-45 rounded-xl overflow-hidden">
                    <Image
                        src="/images/cover-image.png"
                        alt="cover"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex gap-4 mt-5">

                    <div>
                        <div
                            className="w-80 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">مالك الفكرة</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-13 h-13 relative">
                                    <Image src="/images/avatar.png" alt="Owner" width={80} height={80} className="rounded-full absolute" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900">د. عبد الرحمن آل سعود</h4>
                                    <p className="text-xs text-[#4B708C] font-semibold">a.alsaud@sanad.ai</p>
                                </div>
                            </div>

                        </div>
                        <div
                            className="w-80 mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">{title}</h3>

                            <div className="divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                                    >
                                        <span className="text-sm text-[#4B708C] font-bold">{item.label}</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-80 mt-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-3 text-[15px] font-bold text-gray-900">{titlee}</h3>

                            <div className="flex flex-col space-y-2">
                                {files.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="flex bg-gray-50 hover:bg-gray-100 cursor-pointer px-2 rounded-lg items-center justify-between h-10 first:pt-0 last:pb-0 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-2">
                                            <File size={18} />
                                            <span className="text-xs font-semibold text-gray-900">
                                                {file.name}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-400">{file.size}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="w-80 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-[15px] border-b border-gray-100 pb-3 font-bold text-gray-900">روابط السوشيال ميديا</h3>

                            <div className="divide-y divide-gray-100">
                                {links.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                                    >
                                        <span className="text-sm text-[#4B708C] font-bold">{item.label}</span>
                                        <span className="text-sm text-blue-400 hover:underline cursor-pointer font-semibold0">
                                            {item.url}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div>

                        <div
                            className="w-full max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
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
                            className="w-full mt-4 max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <h3 className="mb-2 text-lg font-bold text-gray-900">الفيديو التعريفي وقصة المشروع</h3>

                            <div className="relative mt-4 w-full h-40 rounded-xl overflow-hidden">
                                <Image
                                    src="/images/video-player.png"
                                    alt="cover"
                                    fill
                                    sizes="100vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        <div
                            className="w-full mt-4 max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                        >
                            <h3 className="mb-2 text-lg font-bold text-gray-900">التقييم الفني الإجمالي</h3>
                            <Link href="/dashboard/idea-owner/evaluations" className="text-sm font-semibold text-[#1E4C6F] hover:underline">عرض سجل التقييمات</Link>

                            <div className="mt-4 bg-[#EDF7EE] w-full h-30 rounded-xl overflow-hidden flex items-center justify-between px-5">
                                <p className="text-[#204A22] text-sm w-full max-w-md font-bold">حاز المشروع على تقييم عام متفوق بناءً على المعايير القانونية والتقنية المعتمدة لدى المنصة.</p>
                                <div className="flex flex-col items-center text-[#204A22] text-xs">
                                    <span className="text-3xl font-bold">88%</span>
                                    درجة الثقة بالتقييم
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </main>
    )
}

export default page
