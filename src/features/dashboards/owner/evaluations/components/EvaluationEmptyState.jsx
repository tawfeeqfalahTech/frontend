import Image from "next/image"
import Link from "next/link"

const content = {
    reports: {
        image: "/images/reports/empty-report.svg",
        title: "لا توجد تقارير بعد",
        description: "قيّم مشروعك للحصول على تقرير تفصيلي.\nستظهر تقاريرك هنا لتراجعها وتتابع تطوّر مشروعك.",
        action: "تقييم المشروع",
    },
    report: {
        image: "/images/reports/empty-report.svg",
        title: "لا يوجد تقرير بعد",
        description: "لم يتم تقييم هذا المشروع بعد، لذلك لا يوجد تقرير لعرضه.\nابدأ بتقييم مشروعك للحصول على تقرير تفصيلي عن أدائه.",
        action: "تقييم المشروع",
    },
}

const EvaluationEmptyState = ({ variant = "reports", actionHref = "/dashboard/idea-owner/evaluations?state=single" }) => {
    const { image, title, description, action } = content[variant]

    return (
        <section aria-label={title} className="flex flex-col items-center gap-6 rounded-2xl bg-white px-4 py-12 text-center sm:p-20">
            <div className="relative h-[205px] w-[302px] max-w-full shrink-0 overflow-hidden" aria-hidden="true">
                <Image src={image} width={302} height={205} alt="" priority />
            </div>
            <div className="flex w-full max-w-[520px] flex-col gap-2">
                <h2 className="text-2xl font-bold leading-[1.5] text-[#0D202F] sm:text-[30px]">{title}</h2>
                <p className="whitespace-pre-line text-lg leading-[1.5] text-[#4B5563] sm:text-2xl">{description}</p>
            </div>
            <Link href={actionHref} className="flex min-h-[65px] w-full max-w-[334px] items-center justify-center rounded-2xl bg-[#1E4C6F] px-4 py-2.5 text-xl font-semibold leading-9 text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F] sm:text-2xl">
                {action}
            </Link>
        </section>
    )
}

export default EvaluationEmptyState
