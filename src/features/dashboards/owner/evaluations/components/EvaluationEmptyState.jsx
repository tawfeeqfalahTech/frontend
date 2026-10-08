import Image from "next/image"
import Link from "next/link"
import { FileChartColumn } from "lucide-react"

const content = {
    reports: {
        image: "/images/evaluations-embty-state.png",
        title: "لا يوجد سجل تقييم بعد",
        description: "ابدأ بتقييم مشروعك للحصول على رؤى تفصيلية حول أداء مشروعك ومقارنته بالمؤشرات المرجعية.",
        action: "تقييم الآن",
    },
    report: {
        title: "لا يوجد تقرير بعد",
        description: "لم يتم تقييم هذا المشروع بعد، لذلك لا يوجد تقرير لعرضه.\nابدأ بتقييم مشروعك للحصول على تقرير تفصيلي عن أدائه.",
        action: "تقييم المشروع",
    },
}

const EvaluationEmptyState = ({ variant = "reports", actionHref = "/dashboard/idea-owner/evaluations?state=single" }) => {
    const { image, title, description, action } = content[variant]
    const isReports = variant === "reports"

    return (
        <section aria-label={title} className={`flex flex-col items-center bg-white text-center ${isReports ? "gap-[18px] rounded-xl px-3 py-10 sm:p-[60px]" : "gap-6 rounded-2xl px-4 py-12 sm:p-20"}`}>
            <div className={`relative max-w-full shrink-0 overflow-hidden ${isReports ? "h-[153.75px] w-[226.5px]" : "h-[205px] w-[302px]"}`} aria-hidden="true">
                {isReports ? <Image src={image} width={302} height={205} className="h-auto w-[226.5px]" alt="" priority unoptimized /> : <div className="flex h-full items-center justify-center">
                    <div className="flex size-40 items-center justify-center rounded-full bg-[#F0F5F8] text-[#1E4C6F]">
                        <FileChartColumn size={96} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                </div>}
            </div>
            <div className={`flex w-full flex-col ${isReports ? "max-w-[390px] gap-[6px]" : "max-w-[520px] gap-2"}`}>
                <h2 className={`font-bold leading-[1.5] text-[#0D202F] ${isReports ? "text-[22.5px]" : "text-2xl sm:text-[30px]"}`}>{title}</h2>
                <p className={`whitespace-pre-line text-lg leading-[1.5] text-[#4B5563] ${isReports ? "" : "sm:text-2xl"}`}>{description}</p>
            </div>
            <Link href={actionHref} className={`flex w-full items-center justify-center bg-[#1E4C6F] font-semibold text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F] ${isReports ? "min-h-[48.75px] max-w-[250.5px] rounded-xl px-3 py-[7.5px] text-lg leading-[27px]" : "min-h-[65px] max-w-[334px] rounded-2xl px-4 py-2.5 text-xl leading-9 sm:text-2xl"}`}>
                {action}
            </Link>
        </section>
    )
}

export default EvaluationEmptyState
