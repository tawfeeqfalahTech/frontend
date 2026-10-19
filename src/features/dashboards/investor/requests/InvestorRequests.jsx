"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BriefcaseBusiness, Clock3, FileText, Inbox, Mail, Send, X } from "lucide-react";
import EmptyState from "@/features/dashboards/shared/EmptyState";
import { iconActionClass, outlineClass, surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { ProjectDialog } from "../home/components";
import { suggestedProjects } from "../home/data";
import { requestFilters, requestStatuses } from "./data";
import InterestRequestDialog from "./InterestRequestDialog";
import styles from "./InvestorRequests.module.css";

function DocumentDialog({ action, onClose }) {
    const ref = useRef(null);
    useEffect(() => {
        const dialog = ref.current;
        if (action && !dialog.open) dialog.showModal();
        if (!action && dialog.open) dialog.close();
    }, [action]);
    return <dialog ref={ref} dir="rtl" onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="request-action-title" aria-describedby="request-action-description" className={styles.dialog}>
        {action && <div className="p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3"><h2 id="request-action-title" className="text-lg font-bold">مستند الاتفاق</h2><button type="button" onClick={onClose} aria-label="إغلاق" className={iconActionClass}><X size={18} /></button></div>
            <p className="mt-4 text-sm font-semibold text-[#1E4C6F]">{action.project.title}</p>
            <p id="request-action-description" className="mt-3 text-sm leading-7 text-[#4B708C]">{action.request.document.description}</p>
            <div className="mt-5 rounded-xl border border-[#E5EDF3] bg-[#F6F9FC] p-4"><FileText size={26} className="mb-3 text-[#1E4C6F]" aria-hidden="true" /><p className="text-sm font-semibold">{action.request.document.name}</p><p dir="ltr" className="mt-2 text-right text-xs text-[#68879F]">{action.request.document.reference}</p>{action.request.document.url && <a href={action.request.document.url} target="_blank" rel="noopener noreferrer" className={`${outlineClass} mt-4`}>فتح مستند الاتفاق (PDF)</a>}</div>
            <div className="mt-6 flex flex-wrap gap-2"><button type="button" autoFocus className={outlineClass} onClick={onClose}>إغلاق</button></div>
        </div>}
    </dialog>;
}

function RequestRow({ request, project, onAction, onDetails }) {
    const status = requestStatuses[request.status];
    const canResubmit = request.status === "rejected" || (request.status === "cancelled" && request.canResubmit !== false);
    return <li className={styles.request} aria-label={`طلب ${project.title}، ${status.label}`}>
        <div className={styles.requestContent}>
            <div className={styles.avatar}><Image src={request.avatar || "/images/avatar.png"} alt="" fill sizes="40px" className="object-cover" /></div>
            <div className={styles.details}>
                <div className={styles.requestHeading}>
                    <h2><button type="button" className={styles.projectTitle} onClick={() => onDetails(project)} aria-label={`عرض تفاصيل ${project.title}`}>{project.title}</button></h2>
                    <span className={styles.typeBadge}><BriefcaseBusiness size={11} aria-hidden="true" />{request.type}</span>
                    <span className={styles.badge} style={{ color: status.color, background: status.background }}>{status.label}</span>
                </div>
                {request.status === "rejected" ? <div className={styles.rejection}><p>سبب الرفض:</p><p className={styles.message}>{request.rejectReason}</p></div> : <><p className={styles.messageLabel}>رسالتي لمالك المشروع</p><p className={styles.message}>{request.message}</p></>}
            </div>
        </div>
        <div className={styles.requestAside}>
            <time className={styles.time}>{request.date}</time>
            <div className={styles.actions}>
                {request.status === "pending" && <button type="button" aria-label={`إلغاء طلب ${project.title}`} className={styles.primaryAction} onClick={() => onAction("cancel", request, project)}>إلغاء الطلب</button>}
                {canResubmit && <button type="button" aria-label={`إرسال طلب جديد إلى ${project.title}`} className={styles.primaryAction} onClick={() => onAction("resubmit", request, project)}>إرسال طلب جديد</button>}
                {request.status === "accepted" && (request.document ? <button type="button" className={styles.documentAction} onClick={() => onAction("document", request, project)}><FileText size={13} aria-hidden="true" />عرض مستند الاتفاق (PDF)</button> : <div className={styles.documentPending}><p><Clock3 size={12} aria-hidden="true" />سيتم توفير مستند الاتفاق قريباً</p>{request.contactEmail && <a href={`mailto:${request.contactEmail}`}><Mail size={11} aria-hidden="true" /><span dir="ltr">{request.contactEmail}</span></a>}</div>)}
                {request.status === "cancelled" && request.canResubmit === false && <p className={styles.unavailable}>لا توجد إجراءات متاحة</p>}
            </div>
        </div>
    </li>;
}

export default function InvestorRequests({ initialData, initialFilter = "all" }) {
    const [requests, setRequests] = useState(initialData);
    const [filter, setFilter] = useState(initialFilter);
    const [selection, setSelection] = useState(null);
    const [action, setAction] = useState(null);
    const [notice, setNotice] = useState("");
    useEffect(() => {
        if (!notice) return;
        const timer = setTimeout(() => setNotice(""), 5000);
        return () => clearTimeout(timer);
    }, [notice]);
    const filtered = filter === "all" ? requests : requests.filter((request) => request.status === filter);
    const confirmAction = (values) => {
        if (!action || action.type === "document") return;
        const cancel = action.type === "cancel";
        setRequests((current) => current.map((request) => request.id === action.request.id ? { ...request, ...(!cancel ? values : {}), status: cancel ? "cancelled" : "pending", canResubmit: true, date: "الآن", rejectReason: undefined } : request));
        setNotice(cancel ? `تم إلغاء طلب ${action.project.title}` : `تم إرسال طلب جديد إلى ${action.project.title}`);
        setAction(null);
    };

    return <div dir="rtl" className={`${styles.page} min-w-0 pr-55 pb-8 text-[#0D202F] max-[660px]:pr-0`}>
        <h1 className="sr-only">طلباتي</h1>
        <div className={styles.filterBar} role="group" aria-label="تصفية الطلبات حسب الحالة">
            {requestFilters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} aria-controls="investor-requests-list" className={`${styles.filter} ${filter === item.id ? styles.activeFilter : ""}`} onClick={() => { setFilter(item.id); setNotice(""); }}>{item.label}</button>)}
        </div>
        <p role="status" aria-live="polite" className="sr-only">{filtered.length} طلبات في قسم {requestFilters.find((item) => item.id === filter).label}</p>
        <div id="investor-requests-list">
            {filtered.length ? <ul className={styles.list}>{filtered.map((request) => {
                const project = suggestedProjects.find((item) => item.id === request.projectId);
                return <RequestRow key={request.id} request={request} project={project} onDetails={(project) => setSelection({ project })} onAction={(type, request, project) => setAction({ type, request, project })} />;
            })}</ul> : <div className={surfaceClass}><EmptyState icon={requests.length ? Inbox : Send} title={requests.length ? "لا توجد طلبات في هذا القسم" : "لم ترسل أي طلب بعد"} description={requests.length ? "ستظهر هنا الطلبات التي تطابق الحالة المختارة. يمكنك العودة إلى جميع طلباتك." : "استكشف المشاريع وأبدِ اهتمامك بالفرص المناسبة لك لتتابع طلباتك هنا."} {...(requests.length ? { actionLabel: "عرض جميع الطلبات", onAction: () => setFilter("all") } : { actionLabel: "استكشاف المشاريع", actionHref: "/explore" })} /></div>}
        </div>
        <p role="status" aria-live="polite" className={styles.notice}>{notice}</p>
        <ProjectDialog selection={selection} onClose={() => setSelection(null)} />
        <DocumentDialog action={action?.type === "document" ? action : null} onClose={() => setAction(null)} />
        {action && action.type !== "document" && <InterestRequestDialog key={`${action.type}-${action.request.id}`} action={action} onClose={() => setAction(null)} onConfirm={confirmAction} />}
    </div>;
}
