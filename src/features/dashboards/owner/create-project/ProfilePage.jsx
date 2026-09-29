import React from 'react';
import {
    Linkedin,
    Github,
    Heart,
    Clock,
    LogOut,
    Lock
} from 'lucide-react';

export default function ProfilePage() {
    // بيانات مهارات المستخدم
    const skills = [
        'Entrepreneurship',
        'AI & Machine Learning',
        'UI/UX Design',
        'Product Management',
        'Financial Modeling',
        'Growth Strategy',
    ];

    // بيانات كروت المشاريع
    const projects = Array(4).fill({
        title: 'مشروع إدارة المشاريع',
        evaluation: '80%',
        timeAgo: 'منذ ساعتين',
        interestedCount: 24,
        image: '/images/project-thumb.png',
    });

    // بيانات الجلسات النشطة
    const sessions = [
        {
            id: 1,
            device: 'Windows 11',
            browser: 'chrome 124.0',
            location: 'غزة ، فلسطين',
            lastActive: 'منذ 10 دقائق',
            status: 'الجلسة الحالية',
            statusType: 'current',
            buttonType: 'primary',
        },
        {
            id: 2,
            device: 'iPhone 15',
            browser: 'Safari 17.5',
            location: 'غزة ، فلسطين',
            lastActive: 'منذ 50 دقيقة',
            status: 'جلسة أخرى',
            statusType: 'logged_out',
            buttonType: 'disabled',
        },
        {
            id: 3,
            device: 'MacBook pro',
            browser: 'chrome 123.0',
            location: 'غزة ، فلسطين',
            lastActive: 'منذ 7 ساعات',
            status: 'جلسة أخرى',
            statusType: 'active',
            buttonType: 'outline',
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800" dir="rtl">
            {/* Main Container */}
            <main className="mx-auto max-w-5xl px-4 py-8">

                {/* 1. User Info Header Section */}
                <section className="relative mb-12 rounded-2xl bg-white p-6 border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

                        {/* Top-Left Edit Button */}
                        <button className="order-1 md:order-none self-end md:self-auto rounded-lg bg-[#1E4C6F] px-6 py-2 text-sm font-semibold text-white hover:bg-[#163852] transition cursor-pointer">
                            تعديل
                        </button>

                        {/* Profile Bio & Details */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-right">
                            <div className="flex flex-col items-center md:items-end">
                                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">توفيق أبو حصيرة</h1>
                                <p className="max-w-xl text-xs md:text-sm text-slate-500 leading-relaxed mb-4">
                                    أحول الأفكار التقنية إلى مشاريع قابلة للنمو. مبرمج وصاحب مشاريع أدرس السوق وأخرج بمشاريع حقيقية وبنماذج أولية لمشاريعه تحل المشاكل وذات أهمية للسوق.
                                </p>

                                {/* Social Links */}
                                <div className="flex items-center gap-2 mb-4 text-slate-700">
                                    <a href="#" className="p-1 hover:text-[#1E4C6F]"><Lock className="h-4 w-4" /></a>
                                    <a href="#" className="p-1 hover:text-[#1E4C6F]"><Lock className="h-4 w-4" /></a>
                                </div>

                                {/* Skills */}
                                <div className="w-full">
                                    <h3 className="text-xs font-bold text-slate-700 mb-2 text-center md:text-right">المهارات والكفاءات</h3>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="rounded-md bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 border border-slate-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Avatar Image */}
                            <div className="h-28 w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-full border-4 border-slate-100 shadow-md">
                                <img src="/images/avatar.png" alt="توفيق أبو حصيرة" className="h-full w-full object-cover" />
                            </div>
                        </div>

                    </div>
                </section>

                {/* 2. Projects Section */}
                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-6 w-1.5 rounded-full bg-[#1E4C6F]"></div>
                        <h2 className="text-xl font-bold text-slate-900">المشاريع</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                                {/* Image Placeholder */}
                                <div className="relative h-36 bg-slate-800">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover opacity-90"
                                    // onError={(e) => {
                                    //   e.target.style.display = 'none';
                                    // }}
                                    />
                                    <div className="absolute top-2 left-2 rounded bg-cyan-600 px-2 py-0.5 text-[10px] font-bold text-white">
                                        Dashboard Admin
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3 text-right">
                                    <h3 className="font-bold text-slate-800 text-sm mb-2">{project.title}</h3>

                                    {/* Rating Bar */}
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                        <span>{project.evaluation}</span>
                                        <span className="text-[11px]">التقييم</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-slate-100 mb-4 overflow-hidden">
                                        <div className="h-full w-[80%] bg-amber-600 rounded-full"></div>
                                    </div>

                                    {/* Footer Meta */}
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Heart className="h-3.5 w-3.5 text-slate-400 cursor-pointer hover:text-red-500" />
                                            <span>{project.interestedCount} مهتم</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{project.timeAgo}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Session Management Section */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-6 w-1.5 rounded-full bg-[#1E4C6F]"></div>
                        <h2 className="text-xl font-bold text-slate-900">إدارة الجلسات</h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-4 mb-6">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50/50"
                                >
                                    {/* Left Action Button */}
                                    <div className="w-full sm:w-auto">
                                        {session.buttonType === 'primary' && (
                                            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#1E4C6F] px-5 py-2 text-xs font-semibold text-white hover:bg-[#163852] cursor-pointer">
                                                <LogOut className="h-3.5 w-3.5 rotate-180" />
                                                تسجيل الخروج
                                            </button>
                                        )}
                                        {session.buttonType === 'disabled' && (
                                            <button disabled className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-slate-200 px-5 py-2 text-xs font-semibold text-slate-400 cursor-not-allowed">
                                                <LogOut className="h-3.5 w-3.5 rotate-180" />
                                                تسجيل الخروج
                                            </button>
                                        )}
                                        {session.buttonType === 'outline' && (
                                            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-[#1E4C6F] px-5 py-2 text-xs font-semibold text-[#1E4C6F] hover:bg-slate-50 cursor-pointer">
                                                <LogOut className="h-3.5 w-3.5 rotate-180" />
                                                تسجيل الخروج
                                            </button>
                                        )}
                                    </div>

                                    {/* Middle Details */}
                                    <div className="flex flex-1 flex-wrap items-center justify-between gap-4 text-center sm:text-right w-full">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500">أخر نشاط</p>
                                            <p className="text-xs font-medium text-slate-700">{session.lastActive}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-700">{session.location}</p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-800">{session.device}</p>
                                            <p className="text-[11px] text-slate-400">{session.browser}</p>
                                        </div>
                                    </div>

                                    {/* Right Status Badge */}
                                    <div className="shrink-0">
                                        {session.statusType === 'current' && (
                                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 border border-emerald-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                {session.status}
                                            </span>
                                        )}
                                        {session.statusType === 'logged_out' && (
                                            <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-500 border border-rose-200">
                                                خروج {session.status}
                                            </span>
                                        )}
                                        {session.statusType === 'active' && (
                                            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600 border border-emerald-200">
                                                نشط {session.status}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* Bottom Global Session Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100 pt-4">
                            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                <LogOut className="h-4 w-4 rotate-180" />
                                تسجيل الخروج من جميع الجلسات
                            </button>
                            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#1E4C6F] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#163852] cursor-pointer">
                                <LogOut className="h-4 w-4 rotate-180" />
                                تسجيل الخروج من جميع الجلسات عدا الحالية
                            </button>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}