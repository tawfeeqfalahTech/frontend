"use client"

import { LogOut } from "lucide-react";

const sessions = [
    {
        label: "الجلسة الحالية",
        status: "active",
        device: "Windows 11",
        browser: "chrome 124.0",
        location: "غزة، فلسطين",
        lastActivity: "آخر نشاط\nمنذ 10 دقائق",
        canLogout: true,
    },
    {
        label: "جلسة أخرى",
        status: "active",
        device: "MacBook pro",
        browser: "Chrome 123.0",
        location: "غزة، فلسطين",
        lastActivity: "آخر نشاط\nمنذ 7 ساعات",
        canLogout: true,
    },
]

export default function SessionsCard({
    onLogoutOne,
}) {
    return (
        <div
            dir="rtl"
            className="w-full rounded-xl bg-white px-4 py-4 shadow-sm"
        >
            <div className="divide-y divide-gray-100">
                {sessions.map((s, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-2 items-center gap-x-3 gap-y-2 py-3 text-sm first:pt-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(110px,1.2fr)] md:gap-2"
                    >
                        <div className="col-span-2 flex min-w-0 items-center justify-start gap-1.5 whitespace-nowrap md:col-span-1">
                            <span className="font-bold text-gray-900">{s.label}</span>
                            <span className="rounded-full px-2 py-0.5 text-[10px] bg-[#CDEBD2] text-[#27653A]">
                                نشط
                            </span>
                        </div>

                        <div className="min-w-0 border-r border-gray-100 pr-2 md:border-r">
                            <div className="truncate font-medium text-gray-900">{s.device}</div>
                            <div className="truncate text-sm text-gray-500">{s.browser}</div>
                        </div>

                        <span className="min-w-0 truncate border-r border-gray-100 pr-2 text-gray-800 md:border-r">
                            {s.location}
                        </span>

                        <span className="whitespace-pre-line border-r border-gray-100 pr-2 text-sm leading-4 text-gray-800 md:border-r">
                            {s.lastActivity}
                        </span>

                        <button
                            type="button"
                            disabled={!s.canLogout}
                            onClick={() => onLogoutOne?.(idx)}
                            className={`col-span-2 flex items-center justify-center gap-1 whitespace-nowrap rounded-lg border px-2 py-2 text-sm font-medium transition-colors md:col-span-1 ${!s.canLogout
                                ? "cursor-not-allowed border-gray-200 bg-gray-300 text-gray-500"
                                : s.label === "الجلسة الحالية"
                                    ? "border-[#1E4C6F] bg-[#1E4C6F] text-white hover:bg-[#163852]"
                                    : "border-[#1E4C6F] bg-white text-[#1E4C6F] hover:bg-[#1E4C6F] hover:text-white"
                                }`}
                        >
                            تسجيل الخروج
                            <LogOut className="h-3 w-3 shrink-0" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1E4C6F] px-3 py-2 text-center text-sm leading-5 text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#163852] hover:shadow-2xl">
                    <span>تسجيل الخروج من جميع الجلسات عدا الحالية</span>
                    <LogOut className="shrink-0" size={20} />
                </button>
                <button className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1E4C6F] bg-transparent px-3 py-2 text-center text-sm leading-5 text-[#1E4C6F] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#163852] hover:text-white hover:shadow-2xl">
                    <span>تسجيل الخروج من جميع الجلسات</span>
                    <LogOut className="shrink-0" size={20} />
                </button>
            </div>
        </div>
    );
}