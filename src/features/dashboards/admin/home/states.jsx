import { CircleAlert, Download, Inbox, RefreshCw } from "lucide-react";
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader";
import { primaryClass, surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import styles from "./AdminDashboard.module.css";

export const exportButtonClass = `${primaryClass} cursor-pointer disabled:cursor-not-allowed disabled:bg-[#E9EDF1] disabled:text-[#64748B]`;

export function AdminFrame({ children, action }) {
    return <div dir="rtl" className="min-w-0 pr-55 text-[#0D202F] max-[660px]:pr-0">
        <DashboardHeader route="لوحة التحليلات" paragraph="نظرة شاملة على المستخدمين والمشاريع وطلبات الاهتمام" action={action} />
        {children}
    </div>;
}

export function SectionTitle({ id, title, description }) {
    return <div>
        <h2 id={id} className={`${styles.sectionTitle} flex items-center gap-2 text-base font-bold`}>{title}</h2>
        {description && <p className="mt-1.5 text-xs leading-6 text-[#64748B]">{description}</p>}
    </div>;
}

export function EmptyState({ title, description, Icon = Inbox }) {
    return <div className="flex min-h-52 flex-col items-center justify-center px-4 py-7 text-center">
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#EDF3F7] text-[#4B708C]"><Icon size={26} aria-hidden="true" /></span>
        <h3 className="text-sm font-bold text-[#1E4C6F]">{title}</h3>
        <p className="mt-2 max-w-72 text-xs leading-6 text-[#64748B]">{description}</p>
    </div>;
}

export function AdminLoading() {
    return <AdminFrame action={<button disabled className={exportButtonClass}><Download size={17} aria-hidden="true" />تصدير CSV</button>}>
        <div role="status" aria-live="polite" aria-busy="true" className="mt-5 space-y-5">
            <span className="sr-only">جارٍ تحميل إحصائيات لوحة الإدارة</span>
            <div aria-hidden="true" className="space-y-5">
                <div className={`${styles.skeleton} h-6 w-44 rounded-lg`} />
                <div className="grid gap-4 min-[760px]:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className={`${surfaceClass} rounded-2xl p-5`}><div className={`${styles.skeleton} h-5 w-32 rounded-md`} /><div className={`${styles.skeleton} mt-6 h-9 w-24 rounded-md`} /><div className={`${styles.skeleton} mt-5 h-4 w-full rounded-md`} /></div>)}</div>
                <div className="grid gap-5 min-[1100px]:grid-cols-2">{[0, 1].map((item) => <div key={item} className={`${surfaceClass} p-5`}><div className={`${styles.skeleton} h-5 w-44 rounded-md`} /><div className={`${styles.skeleton} mt-6 h-64 rounded-lg`} /></div>)}</div>
                <div className={`${surfaceClass} p-5`}><div className={`${styles.skeleton} h-5 w-32 rounded-md`} /><div className={`${styles.skeleton} mt-6 h-28 rounded-lg`} /></div>
            </div>
        </div>
    </AdminFrame>;
}

export function AdminError({ onRetry }) {
    return <AdminFrame action={<button disabled className={exportButtonClass}><Download size={17} aria-hidden="true" />تصدير CSV</button>}>
        <section role="alert" className={`${surfaceClass} mt-6 flex min-h-96 flex-col items-center justify-center px-5 py-12 text-center`}>
            <span className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#B45353]"><CircleAlert size={30} aria-hidden="true" /></span>
            <h2 className="text-xl font-bold">تعذر تحميل الإحصائيات</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#64748B]">لم نتمكن من جلب بيانات لوحة الإدارة. تحقق من اتصالك وحاول مرة أخرى.</p>
            <button type="button" onClick={onRetry} className={`${primaryClass} mt-6 cursor-pointer`}><RefreshCw size={17} aria-hidden="true" />إعادة المحاولة</button>
        </section>
    </AdminFrame>;
}
