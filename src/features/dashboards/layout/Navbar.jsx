"use client"
import { useState, useRef, useEffect } from "react"
import { Bell, Menu, MessageCircleMoreIcon, Search, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import UserDropdownMenu from "../layout/UserDropdownMenu"
import { usePathname } from "next/navigation"
import { getDashboardLinks } from "./navigation"

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

const Navbar = ({ user, role, standalone = false, onMenuClick, onLogoutClick }) => {
    const path = usePathname()
    const isProjectDetails = path === "/dashboard/idea-owner/view-project"
    const isInvestorProfile = path.startsWith("/dashboard/investor/profile")
    const isInvestor = standalone ? role === "investor" : path.startsWith("/dashboard/investor")
    const isAdmin = standalone ? role === "admin" : path.startsWith("/dashboard/admin")
    const navigationLinks = standalone ? getDashboardLinks(role) : []
    const route = pageTitles[path.replace(/\/$/, "")] || "لوحة التحكم"
    // حالة قائمة المستخدم (القائمة المنسدلة للأفاتار)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isNavigationOpen, setIsNavigationOpen] = useState(false)
    const userMenuRef = useRef(null)
    const navigationRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
            if (navigationRef.current && !navigationRef.current.contains(event.target)) {
                setIsNavigationOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsUserMenuOpen(false)
                setIsNavigationOpen(false)
            }
        }
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
        <header ref={navigationRef} className={`h-15 ${standalone || isCreatProjectPage || isEvaluationsPage ? "mr-0" : "mr-55"} max-[660px]:mr-0 flex items-center justify-between px-5 bg-white border-b border-slate-200 relative ${standalone ? "gap-3 z-50" : ""} ${isProjectDetails ? "gap-3 max-[660px]:px-3" : ""}`}>
            <div className={`flex items-center gap-2 ${isProjectDetails ? "min-w-0" : ""}`}>
                <button type="button" onClick={standalone ? () => { setIsNavigationOpen((prev) => !prev); setIsUserMenuOpen(false) } : onMenuClick} aria-label={standalone && isNavigationOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={standalone ? isNavigationOpen : undefined} aria-controls={standalone && isNavigationOpen ? "explore-navigation" : undefined} className={`cursor-pointer ${standalone ? "xl:hidden" : "min-[661px]:hidden"}`}>
                    {standalone && isNavigationOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                {standalone ? <Link href="/" aria-label="إحياء — الصفحة الرئيسية" className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F]">
                    <Image src="/images/logo.png" alt="" width={32} height={32} unoptimized className="rounded-lg object-cover" />
                    <span className="text-xl font-bold text-[#9E7F4D]">إحياء</span>
                </Link> : <div>
                    <div className="font-semibold text-lg max-[660px]:text-sm max-[660px]:leading-5">
                        لوحة التحكم/
                        <span className="text-[#1E4C6F] font-bold">{route}</span>
                    </div>
                </div>}
            </div>

            {standalone && <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 xl:flex">
                {navigationLinks.map((link) => <Link key={link.href} href={link.href} aria-current={path === link.href ? "page" : undefined} className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${path === link.href ? "bg-[#1E4C6F] text-[#D2C4AD]" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}>
                    <link.icon size={16} aria-hidden="true" />
                    {link.name}
                </Link>)}
            </nav>}

            <div className={`flex items-center gap-3 ${standalone ? "shrink-0" : ""} ${isProjectDetails ? "shrink-0 max-[660px]:gap-2" : ""}`}>
                {isInvestor ? <form action="/explore" role="search" className="group relative hidden shrink-0 md:block">
                    <label htmlFor="navbar-project-search" className="sr-only">ابحث عن مشروع</label>
                    <input id="navbar-project-search" name="q" placeholder="ابحث عن مشروع" className="h-10 w-44 rounded-xl border border-slate-200 bg-white ps-11 pe-4 text-sm text-[#163852] shadow-[0_2px_14px_rgba(30,76,111,0.07)] outline-none transition-colors placeholder:text-gray-400 hover:border-[#9CB1C1] focus:border-[#1E4C6F] focus:ring-2 focus:ring-[#1E4C6F]/15 lg:w-56" />
                    <button type="submit" aria-label="البحث" className="absolute inset-y-1 start-1 flex size-8 cursor-pointer items-center justify-center rounded-lg text-[#7C8B97] transition-colors hover:bg-[#EDF3F7] hover:text-[#1E4C6F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F] group-focus-within:text-[#1E4C6F]"><Search size={18} /></button>
                </form> : !isAdmin && <MessageCircleMoreIcon className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />}
                {isAdmin ? <Link href="/dashboard/admin#requests" className="rounded-lg px-2 py-1 text-xs font-semibold text-[#4B708C] hover:bg-[#EDF3F7] focus-visible:outline-2 focus-visible:outline-[#1E4C6F]">طلبات الاهتمام</Link> : isInvestor ? <Link href="/dashboard/investor#updates" aria-label="آخر التحديثات" className="flex size-8 items-center justify-center text-gray-600 hover:text-[#1E4C6F]"><Bell className="w-5 h-5" /></Link> : <div className="relative cursor-pointer">
                    <span className="absolute top-0 right-0.75 bg-red-500 w-2.25 h-2.25 block rounded-full border-2 border-white" />
                    <Bell className="w-5.5 h-5.5 text-gray-600 hover:text-gray-900 transition-colors" />
                </div>}

                <div className="relative" ref={userMenuRef}>
                    <button type="button" aria-label="قائمة الحساب" aria-expanded={isUserMenuOpen} aria-controls={isUserMenuOpen ? "dashboard-user-menu" : undefined} onClick={() => { setIsUserMenuOpen((prev) => !prev); setIsNavigationOpen(false) }} className="flex cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E4C6F]">
                    <Image
                        width={30}
                        height={30}
                        sizes="36px"
                        unoptimized={Boolean(user?.avatarUrl || user?.avatar_url)}
                        src={user?.avatarUrl || user?.avatar_url || "/images/avatar.png"}
                        className="object-cover rounded-full cursor-pointer w-9 h-9 border border-slate-300 shadow-sm hover:opacity-90 transition-opacity"
                        alt=""
                    />
                    </button>

                    {isUserMenuOpen && (
                        <div id="dashboard-user-menu" className="absolute left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                            <UserDropdownMenu onLogout={handleLogoutClick} onClick={() => setIsUserMenuOpen(false)} />
                        </div>
                    )}
                </div>
            </div>
            {standalone && isNavigationOpen && <nav id="explore-navigation" aria-label="التنقل الرئيسي" className="absolute inset-x-0 top-full max-h-[calc(100dvh-60px)] overflow-y-auto border-b border-slate-200 bg-white p-3 shadow-lg xl:hidden">
                {navigationLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsNavigationOpen(false)} aria-current={path === link.href ? "page" : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold ${path === link.href ? "bg-[#1E4C6F] text-[#D2C4AD]" : "text-gray-600 hover:bg-gray-100"}`}>
                    <link.icon size={18} aria-hidden="true" />
                    {link.name}
                </Link>)}
            </nav>}
        </header>
    )
}

export default Navbar
