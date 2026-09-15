"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { FolderOpen, HeartHandshake, Home, LogOut, Settings, Trash2, X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const Sidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname()

    const { Logout } = useAuth()

    const links = [
        { id: 1, name: "الرئيسية", href: "/dashboard/idea-owner", icon: <Home className="w-5 h-5" /> },
        { id: 2, name: "مشاريعي", href: "/dashboard/idea-owner/projects", icon: <FolderOpen className="w-5 h-5" /> },
        { id: 3, name: "طلبات الإهتمام", href: "/idea-owner/investors", icon: <HeartHandshake className="w-5 h-5" /> },
        { id: 4, name: "سلة المحذوفات", href: "/idea-owner/reports", icon: <Trash2 className="w-5 h-5" /> },
    ]

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="إغلاق القائمة"
                    onClick={onClose}
                    className="fixed inset-0 bg-black/30 z-40 min-[661px]:hidden"
                />
            )}
            <aside className={`w-55 h-screen bg-white fixed bottom-0 top-0 right-0 flex flex-col px-6 pb-6 pt-3 border-l border-slate-200 shadow-xl z-50 transition-transform duration-200 max-[660px]:w-72 ${isOpen ? "translate-x-0" : "max-[660px]:translate-x-full"} min-[661px]:translate-x-0`}>
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/logo.jpg"
                        alt="Logo"
                        width={36}
                        height={36}
                        className="rounded-lg object-cover"
                    />
                    <h1 className="text-3xl font-bold text-[#9E7F4D]">إحياء</h1>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="إغلاق القائمة"
                        className="mr-auto min-[661px]:hidden"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-8 flex-1 flex flex-col space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.id}
                                href={link.href}
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
                    <Link
                        href="/owner/settings"
                        onClick={onClose}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors duration-200 ${pathname === "/owner/settings"
                            ? "text-[#D2C4AD] bg-[#1E4C6F] font-bold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-semibold"
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span>الإعدادات</span>
                    </Link>

                    <hr className="text-slate-200 mb-2 block" />

                    <button
                        onClick={() => Logout()}
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