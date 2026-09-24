import React, { useState } from 'react';
import { Sprout, Coins, Users, Tag, Globe, Lock } from 'lucide-react';

const StepFour = ({ formData }) => {
    // حالات مستوى الظهور والإقرار
    const [visibility, setVisibility] = useState('public');
    const [isAgreed, setIsAgreed] = useState(false);

    // بيانات المشروع
    const projectData = {
        title: formData?.title || 'BGrath',
        description: formData?.description || 'منصة إلكترونية لإدارة الأعمال والمشاريع الصغيرة، تساعد المستخدمين على تنظيم مهامهم، تتبع التقدم، والتعاون بشكل فعال',
        coverImage: formData?.coverImage || '/images/project-preview.png',
        tech: formData?.tech || ['Python', 'Next.js', 'Postgre SQL'],
        status: formData?.status || 'يحتاج تمويل',
        budget: formData?.budget || '1,000$- 4,000$',
        teamCount: formData?.teamCount || '7 أعضاء',
        category: formData?.category || 'رواد الأعمال',
    };

    return (
        <div dir="rtl" className="w-full space-y-8 text-right font-sans">
            {/* 1. كارت تفاصيل المشروع الرئيسي */}
            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* صورة الغلاف */}

                {/* معلومات النصية للمشروع */}
                <div className="flex-1 space-y-4 w-full">
                    <h3 className="text-2xl font-extrabold text-slate-900">{projectData.title}</h3>

                    <p className="text-slate-600 font-semibold leading-relaxed max-w-2xl">
                        {projectData.description}
                    </p>

                    {/* التقنيات المستعملة (Tags) */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {projectData.tech.map((item, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5   bg-slate-100 text-slate-600 rounded-lg text-sm font-medium"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                        {/* حالة المشروع */}
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-100 last:border-l-0">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                <Sprout size={18} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 mb-1">حالة المشروع</span>
                                <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                    {projectData.status}
                                </span>
                            </div>
                        </div>

                        {/* الميزانية */}
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-100 last:border-l-0">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                <Coins size={18} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 mb-1">الميزانية</span>
                                <span className="text-xs font-bold text-slate-800">{projectData.budget}</span>
                            </div>
                        </div>

                        {/* الفريق */}
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-100 last:border-l-0">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                                <Users size={18} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 mb-1">الفريق</span>
                                <span className="text-xs font-bold text-slate-800">{projectData.teamCount}</span>
                            </div>
                        </div>

                        {/* القطاع */}
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center gap-5 text-slate-500 sh ink-0">
                                <Tag size={18} />
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 mb-1">القطاع</span>
                                <span className="text-xs font-bold text-slate-800">{projectData.category}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-72 h-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-sm bg-slate-900">
                    <img
                        src="/images/Rectangle 16.png"
                        alt={projectData.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 2. مستوى الظهور */}
            <div className="space-y-3 pt-4">
                <label className="block text-sm font-bold text-slate-800">مستوى الظهور</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* خيار عام */}
                    <button
                        type="button"
                        onClick={() => setVisibility('public')}
                        className={`group relative flex items-start gap-3 p-4 rounded-2xl border text-right transition-all duration-300 cursor-pointer outline-none ${visibility === 'public'
                            ? 'border-[#1E4C6F] bg-[#1E4C6F]/[0.03] shadow-md ring-1 ring-[#1E4C6F]'
                            : 'border-slate-200 bg-white hover:border-[#1E4C6F]/40 hover:bg-slate-50/80 hover:shadow-lg hover:-translate-y-0.5'
                            }`}
                    >
                        <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${visibility === 'public'
                                ? 'bg-[#1E4C6F] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-[#1E4C6F] group-hover:text-white group-hover:scale-110'
                                }`}
                        >
                            <Globe size={20} />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <h4 className={`font-bold text-sm transition-colors ${visibility === 'public' ? 'text-[#1E4C6F]' : 'text-slate-800 group-hover:text-[#1E4C6F]'}`}>
                                عام — مرئي للجميع
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                يظهر مشروعك لجميع الزوار والمستثمرين
                            </p>
                        </div>
                    </button>

                    {/* خيار للمستثمرين فقط */}
                    <button
                        type="button"
                        onClick={() => setVisibility('investors')}
                        className={`group relative flex items-start gap-3 p-4 rounded-2xl border text-right transition-all duration-300 cursor-pointer outline-none ${visibility === 'investors'
                            ? 'border-[#1E4C6F] bg-[#1E4C6F]/[0.03] shadow-md ring-1 ring-[#1E4C6F]'
                            : 'border-slate-200 bg-white hover:border-[#1E4C6F]/40 hover:bg-slate-50/80 hover:shadow-lg hover:-translate-y-0.5'
                            }`}
                    >
                        <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${visibility === 'investors'
                                ? 'bg-[#1E4C6F] text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 group-hover:bg-[#1E4C6F] group-hover:text-white group-hover:scale-110'
                                }`}
                        >
                            <Lock size={20} />
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <h4 className={`font-bold text-sm transition-colors ${visibility === 'investors' ? 'text-[#1E4C6F]' : 'text-slate-800 group-hover:text-[#1E4C6F]'}`}>
                                للمستثمرين فقط
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                يظهر مشروعك للمستثمرين المسجلين فقط
                            </p>
                        </div>
                    </button>
                </div>
            </div>

            {/* 3. الإقرار والتعهد */}
            <div className="flex items-center justify-start gap-3">
                <input
                    id="terms"
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#1E4C6F] focus:ring-[#1E4C6F] cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm font-semibold text-slate-800 cursor-pointer select-none">
                    أقر بأنني أملك حقوق هذا المشروع أو حصلت على إذن بنشره
                </label>
            </div>
        </div>
    );
};

export default StepFour;