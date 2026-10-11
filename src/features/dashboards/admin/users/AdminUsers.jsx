"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Clock3, Mail, MapPin, Search, ShieldCheck, UserRound, UserRoundCheck, UserRoundX, UsersRound, X } from "lucide-react";
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader";
import { iconActionClass, outlineClass, surfaceClass } from "@/features/dashboards/shared/dashboardStyles";
import { buildUsersCsv, filterUsers, formatDate, initials, roles, statuses } from "./data";
import styles from "./AdminUsers.module.css";

const PAGE_SIZE = 6;
const defaultFilters = { query: "", role: "", status: "", sort: "newest" };
const summaryCards = [
    { label: "إجمالي المستخدمين", status: "", hint: "كل أعضاء المنصة", Icon: UsersRound, accent: "#1E4C6F", soft: "#E5EDF4", tint: "#F6F9FC" },
    { label: "المستخدمون النشطون", status: "active", hint: "حسابات نشطة", Icon: UserRoundCheck, accent: "#367C59", soft: "#E1EEE6", tint: "#F5FAF7" },
    { label: "الحسابات المعلّقة", status: "pending", hint: "بانتظار التفعيل", Icon: Clock3, accent: "#9E7F4D", soft: "#EDE5D8", tint: "#FCFAF6" },
    { label: "الحسابات المحظورة", status: "blocked", hint: "حسابات مقيّدة", Icon: UserRoundX, accent: "#B85B65", soft: "#F4E2E6", tint: "#FDF7F8" },
];

function StatusBadge({ status }) {
    const item = statuses[status];
    return <span style={{ color: item.color, background: item.background }} className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap"><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{item.label}</span>;
}

function Avatar({ user, large = false }) {
    return <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-2xl font-bold ${large ? "size-16 text-xl" : "size-10 text-sm"} ${user.role === "investor" ? "bg-[#F3EDE2] text-[#9E7F4D]" : "bg-[#E9F0F6] text-[#1E4C6F]"}`}>{initials(user.name)}</span>;
}

function SelectFilter({ id, label, value, onChange, children }) {
    return <div><label htmlFor={id} className="mb-2 block text-xs font-semibold text-[#4B708C]">{label}</label><div className="relative"><select id={id} value={value} onChange={(event) => onChange(event.target.value)} className={`${styles.control} ${styles.select}`}>{children}</select><ChevronDown size={15} aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-3 my-auto text-[#698194]" /></div></div>;
}

function UserDetails({ user, onClose }) {
    const dialog = useRef(null);
    useEffect(() => {
        if (user) dialog.current?.showModal();
        else dialog.current?.close();
    }, [user]);

    return <dialog ref={dialog} dir="rtl" className={styles.dialog} aria-labelledby="user-details-title" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
        {user && <>
            <div className="flex items-center justify-between border-b border-[#E5EDF3] px-6 py-4"><h2 id="user-details-title" className="text-base font-bold">تفاصيل المستخدم</h2><button type="button" onClick={onClose} aria-label="إغلاق التفاصيل" className={iconActionClass}><X size={17} /></button></div>
            <div className="p-6">
                <div className="flex items-center gap-4"><Avatar user={user} large /><div className="min-w-0"><h3 className="text-xl font-bold text-[#1E4C6F]">{user.name}</h3><p className="mt-1 text-sm text-[#9E7F4D]">{roles[user.role]}</p></div></div>
                <div className="mt-5 flex items-center gap-2"><StatusBadge status={user.status} /><span dir="ltr" className="text-xs text-slate-400">{user.id}</span></div>
                <dl className="mt-5 space-y-4 text-sm">
                    <div><dt className="mb-1.5 flex items-center gap-2 text-xs text-[#698194]"><Mail size={14} aria-hidden="true" />البريد الإلكتروني</dt><dd dir="ltr" className="break-all text-right text-[#1E4C6F]">{user.email}</dd></div>
                    <div className="grid grid-cols-2 gap-4"><div><dt className="mb-1.5 flex items-center gap-2 text-xs text-[#698194]"><MapPin size={14} aria-hidden="true" />المدينة</dt><dd>{user.city}</dd></div><div><dt className="mb-1.5 text-xs text-[#698194]">تاريخ التسجيل</dt><dd>{formatDate(user.joined)}</dd></div></div>
                </dl>
                <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#F5F8FB] p-4"><span className="text-xs text-[#698194]">المشاريع</span><p className="mt-1 text-2xl font-bold text-[#1E4C6F]">{user.projects}</p></div><div className="rounded-xl bg-[#FAF7F2] p-4"><span className="text-xs text-[#9E7F4D]">طلبات الاهتمام</span><p className="mt-1 text-2xl font-bold text-[#9E7F4D]">{user.requests}</p></div></div>
                <p className="mt-5 text-xs leading-6 text-[#899AA7]">هذه بيانات تجريبية لعرض واجهة إدارة المستخدمين.</p>
                <button type="button" onClick={onClose} className={`${outlineClass} mt-4 w-full`}>إغلاق</button>
            </div>
        </>}
    </dialog>;
}

export default function AdminUsers({ users }) {
    const [filters, setFilters] = useState(defaultFilters);
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [notice, setNotice] = useState("");
    const filtered = filterUsers(users, filters);
    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const hasFilters = Boolean(filters.query || filters.role || filters.status || filters.sort !== "newest");
    const updateFilter = (key, value) => { setFilters((current) => ({ ...current, [key]: value })); setPage(1); setNotice(""); };
    const resetFilters = () => { setFilters(defaultFilters); setPage(1); setNotice(""); };
    const exportUsers = () => {
        const url = URL.createObjectURL(new Blob([buildUsersCsv(filtered)], { type: "text/csv;charset=utf-8;" }));
        const link = document.createElement("a");
        link.href = url; link.download = "ihyaa-users-demo.csv"; document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setNotice(`تم تصدير ${filtered.length} مستخدم من النتائج الحالية.`);
    };

    return <div dir="rtl" className="min-w-0 pr-55 text-[#0D202F] max-[660px]:pr-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
            <DashboardHeader route="المستخدمون" paragraph="تابع أعضاء المنصة، أدوارهم وحالة حساباتهم من مكان واحد." />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBE3D7] bg-[#FAF7F2] px-3 py-1.5 text-[11px] font-semibold text-[#9E7F4D]"><ShieldCheck size={14} aria-hidden="true" />بيانات تجريبية</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 min-[1100px]:grid-cols-4 sm:gap-4" aria-label="ملخص المستخدمين">
            {summaryCards.map(({ label, status, hint, Icon, accent, soft, tint }, index) => {
                const count = status ? users.filter((user) => user.status === status).length : users.length;
                return <button key={label} type="button" onClick={() => updateFilter("status", status)} aria-pressed={filters.status === status} style={{ "--stat-accent": accent, "--stat-soft": soft, "--stat-tint": tint, "--stat-delay": `${index * 70}ms` }} className={`${surfaceClass} ${styles.statCard} min-w-0 cursor-pointer rounded-2xl p-4 text-right focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F] sm:p-5`}>
                    <span aria-hidden="true" className={styles.statDecoration} />
                    <div className="flex items-start justify-between gap-2"><h2 className="text-xs leading-6 font-semibold text-[#4B708C] sm:text-sm">{label}</h2><span className={`${styles.statIcon} flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-10`}><Icon size={19} aria-hidden="true" /></span></div>
                    <p className="mt-2 text-[34px] leading-none font-extrabold tracking-tight">{count}</p>
                    <p style={{ color: accent }} className="mt-3 flex items-center gap-1.5 text-[11px]"><span aria-hidden="true" className="size-1.5 rounded-full bg-current" />{hint}</p>
                </button>;
            })}
        </div>

        <section aria-labelledby="users-directory-title" className={`${surfaceClass} mt-6 overflow-hidden rounded-2xl`}>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 sm:px-6">
                <div className="flex items-center gap-3"><span aria-hidden="true" className="flex size-9 items-center justify-center rounded-xl bg-[#EDF3F8] text-[#1E4C6F]"><UsersRound size={18} /></span><div><div className="flex items-center gap-2"><h2 id="users-directory-title" className="text-base font-bold text-[#1E4C6F]">دليل المستخدمين</h2><span className="rounded-md bg-[#EDF3F8] px-2 py-0.5 text-[11px] font-semibold text-[#4B708C]">{users.length}</span></div><p className="mt-0.5 text-[11px] text-[#899AA7]">نظرة أقرب على أعضاء المنصة</p></div></div>
                <button type="button" disabled={!filtered.length} onClick={exportUsers} className={`${outlineClass} disabled:cursor-not-allowed disabled:opacity-40`}><ArrowDownToLine size={15} aria-hidden="true" />تصدير المستخدمين</button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 px-5 pb-5 min-[1050px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:px-6">
                <div className="col-span-2 min-[1050px]:col-span-1"><label htmlFor="admin-user-search" className="mb-2 block text-xs font-semibold text-[#4B708C]">ابحث عن مستخدم</label><div className="relative"><Search size={17} aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-3.5 my-auto text-[#899AA7]" /><input id="admin-user-search" type="search" value={filters.query} onChange={(event) => updateFilter("query", event.target.value)} placeholder="الاسم أو البريد الإلكتروني..." className={`${styles.control} ${styles.search}`} /></div></div>
                <SelectFilter id="admin-user-role" label="الدور" value={filters.role} onChange={(value) => updateFilter("role", value)}><option value="">جميع الأدوار</option>{Object.entries(roles).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</SelectFilter>
                <SelectFilter id="admin-user-status" label="الحالة" value={filters.status} onChange={(value) => updateFilter("status", value)}><option value="">جميع الحالات</option>{Object.entries(statuses).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}</SelectFilter>
                <div className="col-span-2 min-[1050px]:col-span-1"><SelectFilter id="admin-user-sort" label="ترتيب حسب" value={filters.sort} onChange={(value) => updateFilter("sort", value)}><option value="newest">الأحدث تسجيلًا</option><option value="oldest">الأقدم تسجيلًا</option><option value="name">الاسم أبجديًا</option></SelectFilter></div>
            </div>

            {hasFilters && <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E5EDF3] bg-[#FAFCFD] px-6 py-2.5"><p role="status" className="text-xs text-[#4B708C]">{filtered.length} مستخدم يطابق البحث والفلاتر</p><button type="button" onClick={resetFilters} className="inline-flex min-h-8 items-center gap-1 rounded-md px-2 text-xs font-semibold text-[#1E4C6F] hover:bg-[#E9F0F6] focus-visible:outline-2"><X size={13} aria-hidden="true" />مسح الفلاتر</button></div>}

            {visible.length ? <div className="overflow-x-auto overscroll-x-contain" role="region" aria-label="جدول المستخدمين، يمكن تمريره أفقياً" tabIndex={0}>
                <table className={styles.table}>
                    <caption className="sr-only">مستخدمو المنصة وأدوارهم وحالة حساباتهم وتاريخ التسجيل</caption>
                    <thead className="border-t border-[#E5EDF3] bg-[#F3F7FA]"><tr>{["المستخدم", "البريد الإلكتروني", "الدور", "تاريخ التسجيل", "الحالة", "الإجراء"].map((label) => <th key={label} scope="col">{label}</th>)}</tr></thead>
                    <tbody>{visible.map((user) => <tr key={user.id}>
                        <td><div className="flex items-center gap-3"><Avatar user={user} /><div className="min-w-0"><button type="button" onClick={() => setSelectedUser(user)} className="rounded text-sm font-bold whitespace-nowrap text-[#1E4C6F] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">{user.name}</button><p dir="ltr" className="mt-1 text-right text-[10px] text-[#899AA7]">{user.id}</p></div></div></td>
                        <td><span dir="ltr" className="inline-block whitespace-nowrap text-[#698194]">{user.email}</span></td>
                        <td><span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold whitespace-nowrap ${user.role === "investor" ? "bg-[#F8F3E9] text-[#9E7F4D]" : "bg-[#EDF3F8] text-[#4B708C]"}`}><UserRound size={12} aria-hidden="true" />{roles[user.role]}</span></td>
                        <td className="whitespace-nowrap text-[#698194]"><time dateTime={user.joined}>{formatDate(user.joined)}</time></td>
                        <td><StatusBadge status={user.status} /></td>
                        <td><button type="button" onClick={() => setSelectedUser(user)} aria-label={`عرض تفاصيل ${user.name}`} className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#E5EDF3] bg-white px-3 text-[11px] font-semibold whitespace-nowrap text-[#1E4C6F] transition-colors hover:border-[#9CB1C1] hover:bg-[#EDF3F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]">التفاصيل<ArrowLeft size={13} aria-hidden="true" /></button></td>
                    </tr>)}</tbody>
                </table>
            </div> : <div className="flex min-h-72 flex-col items-center justify-center border-t border-[#E5EDF3] px-6 py-10 text-center"><span className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#EDF3F8] text-[#4B708C]"><Search size={26} aria-hidden="true" /></span><h3 className="text-lg font-bold text-[#1E4C6F]">{users.length ? "لا يوجد مستخدمون مطابقون" : "لا يوجد مستخدمون بعد"}</h3><p className="mt-2 text-sm leading-7 text-[#698194]">{users.length ? "جرّب اسمًا آخر أو غيّر الفلاتر لعرض المزيد من المستخدمين." : "ستظهر الحسابات هنا عند انضمام أعضاء جدد إلى المنصة."}</p>{hasFilters && <button type="button" onClick={resetFilters} className={`${outlineClass} mt-4`}>عرض جميع المستخدمين</button>}</div>}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E5EDF3] px-5 py-4 sm:px-6">
                <p role="status" aria-live="polite" className="text-xs text-[#698194]">عرض <span className="font-bold text-[#1E4C6F]">{filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span> من <span className="font-bold text-[#1E4C6F]">{filtered.length}</span> مستخدم</p>
                <nav aria-label="صفحات المستخدمين" className="flex items-center gap-1.5"><button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="الصفحة السابقة" className={`${iconActionClass} disabled:cursor-not-allowed disabled:opacity-35`}><ChevronRight size={16} /></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" onClick={() => setPage(number)} aria-label={`الصفحة ${number}`} aria-current={currentPage === number ? "page" : undefined} className={`${iconActionClass} ${styles.pageButton} text-xs font-bold`}>{number}</button>)}<button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-label="الصفحة التالية" className={`${iconActionClass} disabled:cursor-not-allowed disabled:opacity-35`}><ChevronLeft size={16} /></button></nav>
            </div>
        </section>
        <p role="status" aria-live="polite" className="mt-3 flex min-h-5 items-center gap-1.5 text-xs text-[#367C59]">{notice && <><CircleCheck size={14} aria-hidden="true" />{notice}</>}</p>
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>;
}
