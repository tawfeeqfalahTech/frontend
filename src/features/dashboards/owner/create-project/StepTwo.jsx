import { DollarSign, Rocket, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

const StepTwo = () => {
    const [status, setStatus] = useState('funding');
    const [description, setDescription] = useState("")

    const options = [
        {
            id: 'funding',
            title: 'يحتاج تمويل',
            description: 'أحتاج إلى تمويل لتحويل المشروع إلى واقع',
            icon: DollarSign,
        },
        {
            id: 'idea',
            title: 'يحتاج تطوير',
            description: 'المشروع موجود ويحتاج إلى تطوير وتحسين',
            icon: Rocket,
        },

    ];

    return (
        <main>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="des" className="font-semibold text-slate-800 text-sm">
                    وصف المشروع
                </label>

                <div className="relative group">
                    <textarea
                        id="des"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={200}
                        rows={4}
                        className="w-full resize-none p-4 bg-white border border-slate-200 rounded-2xl shadow-sm 
                                   text-slate-800 text-sm leading-relaxed placeholder:text-slate-400 placeholder:font-normal
                                   transition-all duration-300 outline-none
                                   hover:border-slate-300
                                   focus:border-[#1E4C6F] focus:ring-4 focus:ring-[#1E4C6F]/10 focus:bg-white"
                        placeholder="صف مشروعك، المشكلة التي يحلها، الفئة المستهدفة، المميزات الرئيسية، وأي تفاصيل أخرى..."
                    />
                </div>

                <div className="flex items-center justify-between text-xs px-1">
                    <p className="text-emerald-600 font-medium flex items-center gap-1">
                        <span>•</span> عدد الأحرف الموصى به: 50 - 200 حرف
                    </p>
                    <span className={`font-medium transition-colors ${description.length >= 50 ? 'text-emerald-600' : 'text-slate-400'
                        }`}>
                        {description.length} / 200
                    </span>
                </div>
            </div>

            <section className="mt-6">
                <h3 className="font-semibold text-slate-800 mb-3 text-base">حالة المشروع</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {options.map((item) => {
                        const Icon = item.icon;
                        const isSelected = status === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setStatus(item.id)}
                                className={`group relative flex items-start gap-3 p-4 rounded-2xl border text-right transition-all duration-300 cursor-pointer outline-none ${isSelected
                                    ? 'border-[#1E4C6F] bg-[#1E4C6F]/[0.03] shadow-md ring-1 ring-[#1E4C6F]'
                                    : 'border-slate-200 bg-white hover:border-[#1E4C6F]/40 hover:bg-slate-50/80 hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                            >
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected
                                        ? 'bg-[#1E4C6F] text-white shadow-sm'
                                        : 'bg-slate-100 text-slate-600 group-hover:bg-[#1E4C6F] group-hover:text-white group-hover:scale-110'
                                        }`}
                                >
                                    <Icon size={20} />
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-[#1E4C6F]' : 'text-slate-800 group-hover:text-[#1E4C6F]'}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                        {item.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>
        </main>
    )
}

export default StepTwo 