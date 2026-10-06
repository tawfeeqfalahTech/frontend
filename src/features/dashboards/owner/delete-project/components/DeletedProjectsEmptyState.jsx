import Image from 'next/image'

export default function DeletedProjectsEmptyState() {
    return (
        <section
            aria-labelledby="deleted-projects-empty-title"
            className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-3xl bg-white px-4 py-12 text-center sm:px-10 sm:py-20"
        >
            <Image
                src="/images/deleted-projects/empty-trash.png"
                alt=""
                width={127}
                height={160}
                priority
                unoptimized
                className="h-40 w-[127px] shrink-0 object-contain"
            />
            <h2 id="deleted-projects-empty-title" className="text-xl font-bold leading-9 text-[#245173] sm:text-2xl">
                لا توجد مشاريع محذوفة حالياً
            </h2>
            <p className="max-w-2xl text-base leading-[1.5] text-[#6B7280] sm:text-[19px]">
                مشاريعك المحذوفة مؤخراً ستظهر هنا للتحكم بها واسترجاعها عند الحاجة.
            </p>
        </section>
    )
}
