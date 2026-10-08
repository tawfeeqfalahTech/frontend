import Image from 'next/image'
import { useId } from 'react'

export default function DeletedProjectsEmptyState({
    title = "لا توجد مشاريع محذوفة حالياً",
    description = "مشاريعك المحذوفة مؤخراً ستظهر هنا للتحكم بها واسترجاعها عند الحاجة.",
    compact = false,
    children,
}) {
    const titleId = useId()
    return (
        <section
            aria-labelledby={titleId}
            className={`flex flex-col items-center justify-center rounded-3xl bg-white px-4 text-center ${compact ? "min-h-64 gap-3 py-6" : "min-h-[400px] gap-4 py-12 sm:px-10 sm:py-20"}`}
        >
            <Image
                src="/images/deleted-projects/empty-trash.png"
                alt=""
                width={127}
                height={160}
                unoptimized
                className={`${compact ? "h-24 w-20" : "h-40 w-[127px]"} shrink-0 object-contain`}
            />
            <h2 id={titleId} className={`${compact ? "text-sm" : "text-xl sm:text-2xl"} font-bold leading-9 text-[#245173]`}>
                {title}
            </h2>
            <p className={`max-w-2xl leading-[1.5] text-[#6B7280] ${compact ? "text-xs" : "text-base sm:text-[19px]"}`}>
                {description}
            </p>
            {children}
        </section>
    )
}
