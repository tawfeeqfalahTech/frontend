"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { CircleSlash, File, Play } from "lucide-react"

const assetPath = "/images/project-details"
const cardClass = "rounded-2xl bg-white shadow-[0_4px_32px_#1e4c6f33]"
const actionClass = "inline-flex min-h-[65px] w-full items-center justify-center rounded-2xl px-2.5 text-2xl font-semibold leading-9 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F] sm:w-[183px]"
const tags = ["الذكاء الاصطناعي", "تقنيات قانونية RegTech", "معالجة اللغات الطبيعية NLP", "SaaS"]
const metrics = [
    { label: "الميزانية المتوقعة", value: "500k - 1.5M USD", direction: "ltr" },
    { label: "حالة العرض", value: "متاح للمستثمرين" },
    { label: "عدد المشاهدات", value: "432 مشاهدة" },
]
const defaultFiles = [
    { name: "العرض التقديمي للمستثمرين.pdf", size: "4.2 MB" },
    { name: "دراسة الجدوى الفنية والتقنية.pdf", size: "8.1 MB" },
]
const socialLinks = [
    { label: "انستقرام", url: "instagram.com/sanad-ai" },
    { label: "فيسبوك", url: "facebook.com/sanad-ai" },
    { label: "جيت هب", url: "github.com/sanad-ai" },
    { label: "رابط المشروع", url: "sand.com/sanad-ai" },
]

function CardHeading({ children }) {
    return <>
        <h2 className="text-[19px] font-semibold leading-[28.5px]">{children}</h2>
        <div className="h-px w-full bg-[#F9FAFB]" aria-hidden="true" />
    </>
}

export default function ProjectDetails({ projectId, videoUrl, files = defaultFiles }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [videoNotice, setVideoNotice] = useState("")
    const projectQuery = projectId ? `&id=${encodeURIComponent(projectId)}` : ""
    const evaluationHref = `/dashboard/idea-owner/evaluations?state=empty${projectQuery}`
    const editHref = `/dashboard/idea-owner/edit-project${projectId ? `?id=${encodeURIComponent(projectId)}` : ""}`
    const evaluationAction = <Link href={evaluationHref} className={`${actionClass} bg-[#1E4C6F] text-white hover:bg-[#163852]`}>طلب تقييم</Link>

    return (
        <div dir="rtl" className="mx-auto max-w-[1280px] pb-20 pt-9 text-[#0D202F]">
            <header className="mb-6 flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h1 className="min-w-0 flex-1 text-2xl font-semibold leading-[1.5] text-[#111827] sm:text-[30px]">منصة &apos;سند&apos;: الذكاء الاصطناعي لتحليل المستندات القانونية</h1>
                    <div className="flex flex-wrap gap-3 text-xs font-semibold leading-[18px]">
                        <span className="rounded-full bg-[#F5F2ED] px-3 py-1 text-[#9E7F4D]">مكتمل التقييم</span>
                        <span className="rounded-full bg-[#E9EDF1] px-3 py-1 text-[#1E4C6F]">يحتاج للتمويل</span>
                        <span className="rounded-full bg-[#EDF7EE] px-3 py-1 text-[#4CAF50]">منشور للعامة</span>
                    </div>
                </div>
                <p className="-mt-4 text-[15px] leading-[22.5px] text-[#4B5563]">منصة سحابية متقدمة تستخدم نماذج اللغات الكبيرة المعربة لتحليل العقود واستخراج الثغرات القانونية.</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    {evaluationAction}
                    <Link href={editHref} className={`${actionClass} border border-[#1E4C6F] text-[#1E4C6F] hover:bg-[#E9EDF1]`}>تعديل</Link>
                </div>
            </header>

            <div className="relative mb-10 h-[240px] overflow-hidden rounded-2xl">
                <Image src={`${assetPath}/cover.png`} alt="تحليل المستندات القانونية باستخدام الذكاء الاصطناعي" fill sizes="(max-width: 1328px) calc(100vw - 48px), 1280px" className="object-cover" priority />
            </div>

            <div dir="ltr" className="grid items-start gap-8 lg:grid-cols-[minmax(0,855fr)_minmax(0,385fr)] lg:gap-10">
                <div dir="rtl" className="flex min-w-0 flex-col gap-8">
                    <section className={`${cardClass} flex flex-col gap-6 p-5 sm:p-8`} aria-label="تفاصيل ووصف المشروع">
                        <CardHeading>تفاصيل ووصف المشروع</CardHeading>
                        <p className="text-[15px] leading-[22.5px] text-[#68879F]">تتمحور فكرة &quot;سند&quot; حول توفير محرك ذكاء اصطناعي سيادي مبني بالكامل ومخصص لفهم الصياغات اللغوية الفقهية والقانونية المستخدمة في المحاكم وصياغات العقود العربية. يعالج النظام ثغرات الصياغة بدقة تفوق المحركات التقليدية بمعدل %40 من خلال نماذج تعلم عميق مدربة على أرشيف ضخم من الوثائق المحررة والأنظمة الرسمية السعودية والخليجية.</p>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[15px] font-bold leading-[22.5px]">التصنيفات والمجال البرمجي</h3>
                            <div dir="ltr" className="flex flex-wrap justify-end gap-2">
                                {tags.map(tag => <span key={tag} dir="auto" className="rounded-full bg-[#E9EDF1] px-3 py-1 text-xs font-semibold leading-[18px] text-[#1E4C6F]">{tag}</span>)}
                            </div>
                        </div>
                    </section>

                    <section className={`${cardClass} flex flex-col gap-4 p-5 sm:p-8`} aria-label="الفيديو التعريفي وقصة المشروع">
                        <h2 className="text-[19px] font-semibold leading-[28.5px]">الفيديو التعريفي وقصة المشروع</h2>
                        <div className="relative flex h-[200px] items-center justify-center overflow-hidden rounded-xl bg-[#111827]">
                            {isPlaying && videoUrl ? <video src={videoUrl} poster={`${assetPath}/video.png`} controls autoPlay className="h-full w-full" aria-label="الفيديو التعريفي للمشروع" /> : <>
                                <Image src={`${assetPath}/video.png`} alt="معاينة الفيديو التعريفي للمشروع" fill sizes="(max-width: 1023px) calc(100vw - 88px), (max-width: 1328px) 58vw, 791px" className="object-cover" />
                                <div aria-hidden="true" className="absolute inset-0 bg-[#111827]/40" />
                                <button type="button" aria-label="تشغيل الفيديو التعريفي" onClick={() => videoUrl ? setIsPlaying(true) : setVideoNotice("لا يتوفر رابط الفيديو لهذا المشروع حالياً.")} className="relative flex size-[52px] items-center justify-center rounded-full bg-white shadow-[0_4px_12px_#0003] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                                    <Play size={20} className="text-[#111827]" aria-hidden="true" />
                                </button>
                            </>}
                        </div>
                        {videoNotice && <p role="status" className="text-sm text-[#4B708C]">{videoNotice}</p>}
                    </section>

                    <section className={`${cardClass} flex flex-col items-center gap-6 px-5 py-12 text-center sm:px-12`} aria-labelledby="project-unevaluated-title">
                        <div className="flex size-16 items-center justify-center rounded-full bg-[#E9EDF1]">
                            <CircleSlash size={48} className="text-[#1E4C6F]" aria-hidden="true" />
                        </div>
                        <h2 id="project-unevaluated-title" className="text-2xl font-semibold leading-9">هذا المشروع لم يُقيّم بعد</h2>
                        <p className="max-w-[500px] text-[15px] leading-[22.5px] text-[#4B708C]">لم تقم بطلب إجراء تقييم بعد. قيّم مشروعك الآن، وابدأ بعرض المشروع وتقييمه على المستثمرين لتزيد فرصة حصولك على تمويل للفكرة.</p>
                        {evaluationAction}
                    </section>
                </div>

                <aside dir="rtl" className="flex min-w-0 flex-col gap-8" aria-label="معلومات المشروع">
                    <section className={`${cardClass} flex flex-col gap-5 p-6`}>
                        <CardHeading>مالك الفكرة</CardHeading>
                        <div className="flex items-center gap-4">
                            <Image src={`${assetPath}/owner.png`} alt="د. عبد الرحمن آل سعود" width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" />
                            <div className="flex min-w-0 flex-col gap-1">
                                <h3 className="text-[15px] font-bold leading-[22.5px]">د. عبد الرحمن آل سعود</h3>
                                <a href="mailto:a.alsaud@sanad.ai" dir="ltr" className="break-all text-right text-xs leading-[16.8px] text-[#4B708C] hover:underline">a.alsaud@sanad.ai</a>
                            </div>
                        </div>
                    </section>

                    <section className={`${cardClass} flex flex-col gap-4 p-6`}>
                        <CardHeading>المؤشرات المالية والتشغيلية</CardHeading>
                        <dl className="flex flex-col gap-4">
                            {metrics.map(({ label, value, direction }) => <div key={label} className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F9FAFB] py-3 last:border-0">
                                <dt className="text-[15px] font-semibold leading-[22.5px] text-[#4B708C]">{label}</dt>
                                <dd dir={direction} className="text-sm font-medium">{value}</dd>
                            </div>)}
                        </dl>
                    </section>

                    <section className={`${cardClass} flex flex-col gap-4 p-6`}>
                        <CardHeading>المستندات والملفات المرفقة</CardHeading>
                        <ul className="flex flex-col gap-4">
                            {files.map(file => <li key={file.name} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#F9FAFB] p-3">
                                <div className="flex min-w-0 items-center gap-2">
                                    <File size={16} className="shrink-0 text-[#4B708C]" aria-hidden="true" />
                                    {file.url ? <a href={file.url} download className="break-words text-[15px] font-semibold leading-[22.5px] hover:underline">{file.name}</a> : <span className="break-words text-[15px] font-semibold leading-[22.5px]">{file.name}</span>}
                                </div>
                                <span dir="ltr" className="text-xs leading-[18px] text-[#9E9E9E]">{file.size}</span>
                            </li>)}
                        </ul>
                    </section>

                    <section className={`${cardClass} flex flex-col gap-4 p-6`}>
                        <CardHeading>روابط السوشال ميديا</CardHeading>
                        <dl className="flex flex-col gap-4">
                            {socialLinks.map(({ label, url }) => <div key={url} className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F9FAFB] py-3 last:border-0">
                                <dt className="text-[15px] font-semibold leading-[22.5px] text-[#4B708C]">{label}</dt>
                                <dd className="min-w-0"><a href={`https://${url}`} target="_blank" rel="noopener noreferrer" dir="ltr" className="block break-all text-[15px] font-medium leading-[22.5px] text-[#1D4ED8] hover:underline">{url}</a></dd>
                            </div>)}
                        </dl>
                    </section>
                </aside>
            </div>
        </div>
    )
}
