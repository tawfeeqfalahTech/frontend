"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Bookmark, Compass, FolderOpen, HeartHandshake, Home, LogOut, Trash2, X } from "lucide-react"
import { getDashboardPath } from "@/lib/auth-routes"

const Sidebar = ({ role, isOpen, onClose, onLogoutClick }) => {
    const path = usePathname()
    const isInvestor = path.startsWith("/dashboard/investor")
    const homeHref = role ? getDashboardPath(role) : "/dashboard"

    if (path === "/dashboard/idea-owner/evaluations" || path.startsWith("/dashboard/investor/profile")) return null

    const links = isInvestor ? [
        { id: 1, name: "الرئيسية", href: "/dashboard/investor", icon: <Home className="w-5 h-5" /> },
        { id: 2, name: "استكشاف المشاريع", href: "/dashboard/investor/projects", icon: <Compass className="w-5 h-5" /> },
        { id: 3, name: "المشاريع المحفوظة", href: "/dashboard/investor/saved", icon: <Bookmark className="w-5 h-5" /> },
        { id: 4, name: "طلباتي", href: "/dashboard/investor/requests", icon: <HeartHandshake className="w-5 h-5" /> },
    ] : [
        { id: 1, name: "الرئيسية", href: "/dashboard/idea-owner", icon: <Home className="w-5 h-5" /> },
        { id: 2, name: "مشاريعي", href: "/dashboard/idea-owner/projects", icon: <FolderOpen className="w-5 h-5" /> },
        { id: 3, name: "طلبات الإهتمام", href: "/dashboard/idea-owner/eoi-requests", icon: <HeartHandshake className="w-5 h-5" /> },
        { id: 4, name: "سلة المحذوفات", href: "/dashboard/idea-owner/deleted", icon: <Trash2 className="w-5 h-5" /> },
    ]

    if (path === `/dashboard/idea-owner/create-project` || path === `/dashboard/idea-owner/profile` || path === "/dashboard/idea-owner/view-project" || path === "/dashboard/idea-owner/profile/edit" || path === "/dashboard/idea-owner/edit-project") return null

    return (
        <>
            <aside className={`w-56 h-screen bg-white fixed bottom-0 top-0 right-0 flex flex-col px-6 pb-6 pt-3 border-l border-slate-200 shadow-xl z-50 transition-transform duration-200 ${isOpen ? "translate-x-0" : "max-[660px]:translate-x-full"}`}>
                <div className="flex items-center gap-3">
                    <Link
                        href={homeHref}
                        onClick={onClose}
                        aria-label="إحياء — الصفحة الرئيسية"
                        className="flex items-center gap-3 rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1E4C6F]"
                    >
                        <Image
                            src="/images/logo.png"
                            alt=""
                            width={36}
                            height={36}
                            priority
                            unoptimized
                            className="rounded-lg object-cover"
                        />
                        <span className="text-3xl font-bold text-[#9E7F4D]">إحياء</span>
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="إغلاق القائمة"
                        className="mr-auto min-[660px]:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-8 flex-1 flex flex-col space-y-2">
                    {links.map((link) => {
                        const isActive = path === link.href
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                aria-current={isActive ? "page" : undefined}
                                onClick={onClose}
                                className={`flex items-center gap-3 py-3 px-3.5 rounded-lg transition-colors duration-200 ${isActive
                                    ? "text-[#D2C4AD] bg-[#1E4C6F] hover:bg-[#4b708c] font-bold"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                                    }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-4 flex flex-col space-y-2">
                    {/* <Link
                        href="/owner/settings"
                        onClick={onClose}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors duration-200 ${path === "/owner/settings"
                            ? "text-[#D2C4AD] bg-[#1E4C6F] font-bold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>الإعدادات</span>
                    </Link> */}

                    <hr className="text-slate-200 mb-2 block" />

                    <button
                        onClick={() => onLogoutClick?.()}
                        className="flex items-center gap-3 py-3 cursor-pointer px-3 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-200 w-full text-right"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        <span className="font-semibold text-sm">تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
