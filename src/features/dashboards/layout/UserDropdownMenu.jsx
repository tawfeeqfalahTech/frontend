"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardPath } from "@/lib/auth-routes";

export default function UserDropdownMenu({ onLogout }) {
    const { user } = useAuth()
    return (
        <div className="w-55 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 dir-rtl text-right font-sans">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    {!user.avatar_url ? (
                        <Image
                            src="/images/avatar.png"
                            alt={user.data?.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                            {user.data?.name?.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="flex flex-col min-w-0 pr-1">
                    <span className="font-bold text-gray-900 truncate text-right">
                        {user.data?.name}
                    </span>
                    <span className="text-sm text-gray-400 truncate text-right">
                        {user.data?.email}
                    </span>
                </div>
            </div>

            <div className="py-3 flex flex-col gap-1 border-b border-gray-100">
                <Link
                    href={getDashboardPath(user.data?.role)}
                    className="flex items-center justify-between px-2 py-2 rounded-xl text-[#1E4C6F] hover:bg-gray-50 transition-colors group"
                >
                    <span className="font-medium">لوحة التحكم</span>
                    <LayoutDashboard className="w-5 h-5 text-[#1E4C6F] stroke-[1.8]" />
                </Link>

                <Link
                    href={`${getDashboardPath(user.data?.role)}/profile`}
                    className="flex items-center justify-between px-2 py-2 rounded-xl text-[#1E4C6F] hover:bg-gray-50 transition-colors group"
                >
                    <span className="font-medium">الملف الشخصي</span>
                    <User className="w-5 h-5 text-[#1E4C6F] stroke-[1.8]" />
                </Link>
            </div>

            <div className="pt-3">
                <button
                    onClick={() => onLogout?.()}
                    className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl text-[#E53935] hover:bg-red-50 transition-colors group cursor-pointer"
                >
                    <span className=" font-medium">تسجيل الخروج</span>
                    <LogOut className="w-4.5 h-4.5 text-[#E53935] stroke-[1.8] rotate-180" />
                </button>
            </div>
        </div>
    );
}