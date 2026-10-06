import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function ProjectsEmptyState() {
    return (
        <div className="flex flex-col items-center gap-5 px-2 py-12 text-center sm:py-16">
            <Image src="/images/projects-empty.png" alt="" width={106} height={97} className="h-auto w-[106px]" />
            <div className="max-w-md">
                <h3 className="text-xl font-bold text-[#0D202F]">لا توجد مشاريع حتى الآن</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">حوّل فكرتك إلى فرصة، أضف مشروعك الأول وابدأ رحلتك مع إحياء.</p>
            </div>
            <Link href="/dashboard/idea-owner/create-project" className="inline-flex min-h-11 w-full max-w-[220px] items-center justify-center gap-2 rounded-xl bg-[#1E4C6F] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#163852] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F]">
                <Plus size={18} aria-hidden="true" />أضف مشروعك الأول
            </Link>
        </div>
    )
}
