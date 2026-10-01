"use client"

function LogoutIcon({ className = "h-4 w-4" }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 17l5-5-5-5M21 12H9M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const statusStyles = {
    active: "bg-emerald-50 text-emerald-600",
    expired: "bg-rose-50 text-rose-500",
};

const sessions = [
    {
        label: "الجلسة الحالية",
        status: "active",
        device: "Windows 11",
        browser: "chrome 124.0",
        location: "غزة، فلسطين",
        lastActivity: "آخر نشاط: منذ 10 دقائق",
        canLogout: true,
    },
    {
        label: "جلسة أخرى",
        status: "active",
        device: "MacBook pro",
        browser: "Chrome 123.0",
        location: "غزة، فلسطين",
        lastActivity: "آخر نشاط: من 7 ساعات",
        canLogout: true,
    },
]

export default function SessionsCard({
    onLogoutOne,
    onLogoutAll,
}) {
    return (
        <div
            className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
        >
            <div className="divide-y divide-gray-100">
                {sessions.map((s, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between gap-4 py-3 first:pt-0"
                    >
                        <button
                            type="button"
                            disabled={!s.canLogout}
                            onClick={() => onLogoutOne?.(idx)}
                            className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 py-1.5 font-medium transition-colors border-[#1E4C6F] ${!s.canLogout
                                ? "cursor-not-allowed border-gray-200 text-gray-300"
                                : s.label === "الجلسة الحالية"
                                    ? "bg-[#1E4C6F] text-white hover:bg-[#1E4C6F]/90"
                                    : "bg-transparent text-[#1E4C6F] hover:bg-[#1E4C6F] hover:text-white"
                                }`}
                        >
                            تسجيل الخروج
                            <LogoutIcon className="h-3.5 w-3.5" />
                        </button>

                        <span className="w-28 shrink-0 text-gray-400">
                            {s.lastActivity}
                        </span>

                        <span className="w-28 shrink-0 text-gray-500">
                            {s.location}
                        </span>

                        <div className="w-32 shrink-0">
                            <div className="font-semibold text-gray-900">{s.device}</div>
                            <div className="text-gray-400">{s.browser}</div>
                        </div>

                        <div className="flex w-24 shrink-0 items-center justify-end gap-2">
                            <span className="font-medium text-gray-900">
                                {s.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onLogoutAll}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b2a3d] py-3 text-sm font-medium text-white transition-colors hover:bg-[#0b2a3d]/90"
            >
                تسجيل الخروج من جميع الجلسات عدا الحالية
                <LogoutIcon />
            </button>
        </div>
    );
}