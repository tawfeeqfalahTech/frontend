"use client"
import { useState, useRef, useEffect } from "react"
import { Bell, Menu, MessageCircleMoreIcon } from "lucide-react"
import Image from "next/image"
import UserDropdownMenu from "../layout/UserDropdownMenu"
import { usePathname } from "next/navigation"

const Navbar = ({ user, onMenuClick, onLogoutClick }) => {
    const route = "الرئيسية"
    const path = usePathname()
    // حالة قائمة المستخدم (القائمة المنسدلة للأفاتار)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const userMenuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const isCreatProjectPage = path === "/dashboard/idea-owner/create-project"

    // إغلاق قائمة المستخدم ثم فتح مودال تأكيد تسجيل الخروج (المُدار من DashboardShell)
    const handleLogoutClick = () => {
        setIsUserMenuOpen(false)
        onLogoutClick?.()
    }

    return (
        <div className={`h-15 ${isCreatProjectPage ? "mr-0" : "mr-55"} max-[660px]:mr-0 flex items-center justify-between px-5 bg-white border-b border-slate-200 relative`}>
            <div className="flex items-center gap-2">
                <button onClick={onMenuClick} className="cursor-pointer min-[660px]:hidden">
                    <Menu size={20} />
                </button>
                <div>
                    <h1 className="font-semibold text-lg">
                        لوحة التحكم/
                        <span className="text-[#1E4C6F] font-bold">{route}</span>
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <MessageCircleMoreIcon className="w-5 h-5 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
                <div className="relative cursor-pointer">
                    <span className="absolute top-0 right-0.75 bg-red-500 w-2.25 h-2.25 block rounded-full border-2 border-white" />
                    <Bell className="w-5.5 h-5.5 text-gray-600 hover:text-gray-900 transition-colors" />
                </div>

                <div className="relative" ref={userMenuRef}>
                    <Image
                        width={30}
                        height={30}
                        unoptimized
                        src={user?.avatarUrl || "/images/avatar.png"}
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        className="object-cover rounded-full cursor-pointer w-9 h-9 border border-slate-300 shadow-sm hover:opacity-90 transition-opacity"
                        alt="avatar"
                    />

                    {isUserMenuOpen && (
                        <div className="absolute left-0 mt-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                            <UserDropdownMenu onLogout={handleLogoutClick} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar