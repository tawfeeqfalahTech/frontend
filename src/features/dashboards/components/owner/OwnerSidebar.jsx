"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { HomeIcon } from "@/icons/HomeIcon"
import { LogoutIcon } from "@/icons/LogoutIcon"
import { SettingsIcon } from "@/icons/SettingsIcon"
import { HeartIcon } from "@/icons/HeartIcon"
import { TrashIcon } from "@/icons/TrashIcon"
import { FolderOpen, HeartHandshake, Home, LogOut, Settings, Trash2 } from "lucide-react"

const OwnerSidebar = () => {
    const pathname = usePathname()

    const links = [
        { id: 1, name: "الرئيسية", href: "/dashboard/idea-owner", icon: <Home className="w-5 h-5" /> },
        { id: 2, name: "مشاريعي", href: "/owner/projects", icon: <FolderOpen className="w-5 h-5" /> },
        { id: 3, name: "طلبات الإهتمام", href: "/owner/investors", icon: <HeartHandshake className="w-5 h-5" /> },
        { id: 4, name: "سلة المحذوفات", href: "/owner/reports", icon: <Trash2 className="w-5 h-5" /> },
    ]

    return (
        <aside className="w-55 max-[660px]:hidden h-screen bg-white fixed top-0 right-0 flex flex-col px-6 pb-6 pt-3 border-l border-slate-200 shadow-xl z-50">
            <div className="flex items-center gap-3">
                <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="rounded-lg object-cover"
                />
                <h1 className="text-3xl font-bold text-[#9E7F4D]">إحياء</h1>
            </div>

            <nav className="mt-8 flex-1 flex flex-col space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
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
                    className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-right"
                >
                    <LogOut className="w-4.5 h-4.5" />
                    <span className="font-semibold text-sm">تسجيل الخروج</span>
                </button>
            </div>
        </aside>
    )
}

export default OwnerSidebar