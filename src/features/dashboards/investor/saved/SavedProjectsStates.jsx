import { Bookmark, CircleAlert } from "lucide-react";
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader";
import DashboardEmptyState from "@/features/dashboards/shared/EmptyState";
import { surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import styles from "./SavedProjects.module.css";

export function SavedProjectsLayout({ children }) {
    return <div dir="rtl" className="min-w-0 pr-55 text-[#0D202F] max-[660px]:pr-0">
        <DashboardHeader route="المشاريع المحفوظة" paragraph="تصفح المشاريع التي قمت بحفظها مسبقًا" />
        <section aria-label="المشاريع المحفوظة" className={styles.content}>{children}</section>
    </div>;
}

export function SavedProjectsEmpty() {
    return <div className={surfaceClass}>
        <DashboardEmptyState icon={Bookmark} title="لا توجد مشاريع محفوظة بعد" description="احفظ المشاريع التي تهمك أثناء الاستكشاف، وستجدها هنا لتعود إليها في أي وقت." actionLabel="استكشاف المشاريع" actionHref="/explore" />
    </div>;
}

export function SavedProjectsError({ onRetry }) {
    return <div role="alert" className={surfaceClass}>
        <DashboardEmptyState icon={CircleAlert} title="تعذر تحميل المشاريع المحفوظة" description="حدث خطأ أثناء تحميل مشاريعك. حاول مرة أخرى." actionLabel="إعادة المحاولة" onAction={onRetry} />
    </div>;
}

export function SavedProjectsLoading() {
    return <SavedProjectsLayout>
        <div role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">جارٍ تحميل المشاريع المحفوظة</span>
            <div className={styles.grid} aria-hidden="true">
                {Array.from({ length: 8 }, (_, index) => <div key={index} className={`${surfaceClass} ${styles.skeleton}`}>
                    <div className={styles.skeletonCover} />
                    <div className={styles.skeletonBody}>
                        <div className={styles.skeletonTitle} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonMeta} />
                    </div>
                    <div className={styles.skeletonFooter}><div /><div /></div>
                </div>)}
            </div>
        </div>
    </SavedProjectsLayout>;
}
