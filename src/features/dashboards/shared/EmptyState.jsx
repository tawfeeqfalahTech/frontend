import Link from "next/link"
import { Inbox } from "lucide-react"
import { primaryClass } from "./dashboardStyles"

export default function EmptyState({ title, description, icon: Icon = Inbox, actionLabel, actionHref, onAction, compact = false, children }) {
    return <div dir="rtl" className={`flex w-full min-w-0 flex-col items-center justify-center text-center ${compact ? "gap-2 rounded-xl bg-[#F8FAFC] px-4 py-6" : "min-h-64 gap-3 px-5 py-10 sm:px-8"}`}>
        <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-2xl bg-[#E9EDF1] text-[#1E4C6F] ${compact ? "size-11" : "size-16"}`}><Icon size={compact ? 22 : 30} /></span>
        <h3 className={`break-words font-bold text-[#0D202F] ${compact ? "text-sm" : "text-lg"}`}>{title}</h3>
        {description && <p className={`max-w-md text-pretty leading-7 text-[#68879F] ${compact ? "text-xs" : "text-sm"}`}>{description}</p>}
        {actionLabel && (actionHref || onAction) && <div className="mt-2 max-w-full">
            {actionHref ? <Link href={actionHref} className={primaryClass}>{actionLabel}</Link> : <button type="button" onClick={onAction} className={primaryClass}>{actionLabel}</button>}
        </div>}
        {children}
    </div>
}
