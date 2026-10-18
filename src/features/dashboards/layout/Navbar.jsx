"use client"
import { useState, useRef, useEffect } from "react"
import { Bell, ChevronDown, ChevronLeft, Menu, MessageCircleMoreIcon, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import UserDropdownMenu from "../layout/UserDropdownMenu"
import { usePathname } from "next/navigation"
import styles from "./InvestorNavigation.module.css"

const pageTitles = {
    "/dashboard": "الرئيسية",
    "/dashboard/admin": "التحليلات",
    "/dashboard/admin/users": "المستخدمون",
    "/dashboard/idea-owner": "الرئيسية",
    "/dashboard/idea-owner/projects": "مشاريعي",
    "/dashboard/idea-owner/eoi-requests": "طلبات الاهتمام",
    "/dashboard/idea-owner/deleted": "سلة المحذوفات",
    "/dashboard/idea-owner/create-project": "إنشاء مشروع",
    "/dashboard/idea-owner/edit-project": "تعديل المشروع",
    "/dashboard/idea-owner/view-project": "تفاصيل المشروع",
    "/dashboard/idea-owner/evaluations": "سجل التقييمات",
    "/dashboard/idea-owner/profile": "الملف الشخصي",
    "/dashboard/idea-owner/profile/edit": "تعديل الملف الشخصي",
    "/dashboard/investor": "الرئيسية",
    "/dashboard/investor/saved": "المشاريع المحفوظة",
    "/dashboard/investor/requests": "طلباتي",
    "/dashboard/investor/profile": "الملف الشخصي",
    "/dashboard/investor/profile/edit": "تعديل الملف الشخصي",
}

const Navbar = ({ user, onMenuClick, onLogoutClick }) => {
    const path = usePathname()
    const isProjectDetails = path === "/dashboard/idea-owner/view-project"
    const isInvestorProfile = path.startsWith("/dashboard/investor/profile")
    const isInvestor = path.startsWith("/dashboard/investor")
    const isAdmin = path.startsWith("/dashboard/admin")
    const route = pageTitles[path.replace(/\/$/, "")] || "لوحة التحكم"
    // حالة قائمة المستخدم (القائمة المنسدلة للأفاتار)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userMenuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }
        const handleEscape = (event) => {
            if (event.key === "Escape") setIsUserMenuOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    const isCreatProjectPage = isInvestorProfile || path === "/dashboard/idea-owner/create-project" || path === "/dashboard/idea-owner/profile" || path === "/dashboard/idea-owner/view-project" || path === "/dashboard/idea-owner/profile/edit" || path === "/dashboard/idea-owner/edit-project"

    const isEvaluationsPage = path === "/dashboard/idea-owner/evaluations"

    // إغلاق قائمة المستخدم ثم فتح مودال تأكيد تسجيل الخروج (المُدار من DashboardShell)
    const handleLogoutClick = () => {
        setIsUserMenuOpen(false)
        onLogoutClick?.()
    }

    return (
        <header className={`h-15 ${isCreatProjectPage || isEvaluationsPage ? "mr-0" : "mr-55"} max-[660px]:mr-0 flex items-center justify-between px-5 bg-white border-b border-slate-200 relative ${isProjectDetails ? "gap-3 max-[660px]:px-3" : ""} ${isInvestor ? styles.navbar : ""}`}>
            <div className={`flex items-center gap-2 ${isProjectDetails || isInvestor ? "min-w-0" : ""}`}>
                <button onClick={onMenuClick} aria-label="فتح القائمة" className={`cursor-pointer min-[660px]:hidden ${isInvestor ? styles.iconButton : ""}`}>
                    <Menu size={20} />
                </button>
                <div>
                    {isInvestor ? <nav aria-label="مسار الصفحة" className={styles.breadcrumb}>
                        <span className={styles.breadcrumbLabel}>لوحة المستثمر</span>
                        <span className={styles.breadcrumbRoute}><Link href="/dashboard/investor">لوحة التحكم</Link><ChevronLeft size={13} aria-hidden="true" /><span aria-current="page">{route}</span></span>
                    </nav> : <div className="font-semibold text-lg max-[660px]:text-sm max-[660px]:leading-5">
                        لوحة التحكم/
                        <span className="text-[#1E4C6F] font-bold">{route}</span>
                    </div>}
                </div>
            </div>

            <div className={`flex items-center gap-3 ${isProjectDetails ? "shrink-0 max-[660px]:gap-2" : ""} ${isInvestor ? styles.navbarActions : ""}`}>
                {isInvestor ? <form action="/explore" role="search" className={`group relative hidden shrink-0 md:block ${styles.search}`}>
                    <label htmlFor="navbar-project-search" className="sr-only">ابحث عن مشروع</label>
                    <input id="navbar-project-search" name="q" placeholder="ابحث عن فرصة استثمارية..." className="h-10 w-44 rounded-xl border border-slate-200 bg-white ps-11 pe-4 text-sm text-[#163852] shadow-[0_2px_14px_rgba(30,76,111,0.07)] outline-none transition-colors placeholder:text-gray-400 hover:border-[#9CB1C1] focus:border-[#1E4C6F] focus:ring-2 focus:ring-[#1E4C6F]/15 lg:w-56" />
                    <button type="submit" aria-label="البحث" className="absolute inset-y-1 start-1 flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#7C8B97] transition-colors hover:bg-[#EDF3F7] hover:text-[#1E4C6F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F] group-focus-within:text-[#1E4C6F]"><Search size={18} /></button>
                </form> : !isAdmin && <MessageCircleMoreIcon className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />}
                {isAdmin ? <Link href="/dashboard/admin#requests" className="rounded-lg px-2 py-1 text-xs font-semibold text-[#4B708C] hover:bg-[#EDF3F7] focus-visible:outline-2 focus-visible:outline-[#1E4C6F]">طلبات الاهتمام</Link> : isInvestor ? <Link href="/dashboard/investor#updates" aria-label="آخر التحديثات" className={styles.iconButton}><Bell className="w-5 h-5" /></Link> : <div className="relative cursor-pointer">
                    <span className="absolute top-0 right-0.75 bg-red-500 w-2.25 h-2.25 block rounded-full border-2 border-white" />
                    <Bell className="w-5.5 h-5.5 text-gray-600 hover:text-gray-900 transition-colors" />
                </div>}

                <div className="relative" ref={userMenuRef}>
                    <button type="button" aria-label="قائمة الحساب" aria-expanded={isUserMenuOpen} aria-controls={isUserMenuOpen ? "dashboard-user-menu" : undefined} onClick={() => setIsUserMenuOpen((prev) => !prev)} className={isInvestor ? styles.accountButton : "flex cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]"}>
                    <Image
                        width={30}
                        height={30}
                        unoptimized
                        src={user?.avatarUrl || user?.avatar_url || "/images/avatar.png"}
                        className="object-cover rounded-full cursor-pointer w-9 h-9 border border-slate-300 shadow-sm hover:opacity-90 transition-opacity"
                        alt=""
                    />
                    {isInvestor && <><span className={styles.accountText}><span>{user?.name || "حسابي"}</span><span className={styles.accountRole}>مستثمر</span></span><ChevronDown size={14} aria-hidden="true" className={styles.accountChevron} /></>}
                    </button>

                    {isUserMenuOpen && (
                        <div id="dashboard-user-menu" className="absolute left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                            <UserDropdownMenu onLogout={handleLogoutClick} onClick={() => setIsUserMenuOpen(false)} />
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
