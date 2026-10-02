"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import TagInput from "../components/TagInput"
import SaveChangesButton from "../components/SaveChangesButton"

const categories = [
    "التجارة الإلكترونية",
    "التقنية المالية (FinTech)",
    "الذكاء الاصطناعي",
    "الصحة الرقمية (HealthTech)",
    "التعليم الإلكتروني (EdTech)",
    "الخدمات اللوجستية والنقل",
    "البرمجيات كخدمة (SaaS)"
]

const projectStatuses = [
    { id: "active_idea", label: "فكرة قائمة" },
    { id: "under_study", label: "تحت الدراسة" },
    // { id: "prototype", label: "نموذج أولي" },
    // { id: "funding", label: "مرحلة التمويل" }
]

const BasicInfoTab = () => {
    const [formData, setFormData] = useState({
        title: "مشروع إدارة المتاجر الذكية",
        description: "نظام متكامل قائم على إدارة المخزون التجاري والصادر والوارد من الأموال بشكل مؤتمت يسهل على أصحاب المتاجر الصغيرة إدارة تجارتهم بكفاءة عالية.",
        status: "active_idea",
        category: "التجارة الإلكترونية",
        minBudget: "4000",
        maxBudget: "10000",
        tags: ["تقنية", "متاجر", "أتمتة"]
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
        }, 600)
    }

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col gap-6">
            {/* Header */}
            <div className="border-b border-gray-100 pb-4">
                <h2 className="text-xl sm:text-[22px] font-bold text-[#0D202F]">
                    المعلومات الأساسية
                </h2>
                <p className="text-[#4B708C] text-sm mt-1.5">
                    أدخل بيانات مشروعك الأساسية لكي يتم مراجعتها وتفعيلها.
                </p>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                {/* اسم المشروع */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                        اسم المشروع
                    </label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="أدخل اسم المشروع"
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] transition-all"
                    />
                </div>

                {/* وصف المشروع */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                        وصف المشروع
                    </label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="أدخل تفاصيل ووصف المشروع"
                        className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none p-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] transition-all resize-y leading-relaxed"
                    />
                </div>

                {/* حالة المشروع والمجال */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* المجال / التصنيف */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                            المجال / التصنيف
                        </label>
                        <div className="relative">
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full appearance-none bg-white border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 pr-9 pl-9 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)] cursor-pointer"
                            >
                                {categories.map((cat, i) => (
                                    <option key={i} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>

                    {/* حالة المشروع */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                            حالة المشروع
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {projectStatuses.map((st) => {
                                const isSelected = formData.status === st.id
                                return (
                                    <button
                                        key={st.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, status: st.id })}
                                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${isSelected
                                            ? "bg-[#1E4C6F] text-white shadow-xs"
                                            : "bg-[#E9EDF1]/60 text-[#4B708C] hover:bg-[#E9EDF1]"
                                            }`}
                                    >
                                        {st.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* الميزانية المقدرة */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                        الميزانية المقدرة بالدولار ($)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] text-gray-500 font-medium">الحد الأدنى ($)</span>
                            <input
                                type="number"
                                value={formData.minBudget}
                                onChange={(e) => setFormData({ ...formData, minBudget: e.target.value })}
                                placeholder="مثال: 4,000"
                                className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)]"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] text-gray-500 font-medium">الحد الأقصى ($)</span>
                            <input
                                type="number"
                                value={formData.maxBudget}
                                onChange={(e) => setFormData({ ...formData, maxBudget: e.target.value })}
                                placeholder="مثال: 10,000"
                                className="w-full bg-[#FFFFFF] border border-[#E2E8F0] focus:border-[#1E4C6F] focus:ring-1 focus:ring-[#1E4C6F] outline-none px-3.5 py-3 rounded-xl text-sm text-[#0D202F] shadow-[0px_4px_20px_0px_rgba(104,135,159,0.06)]"
                            />
                        </div>
                    </div>
                </div>

                {/* الوسوم المميزة */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm sm:text-base font-semibold text-[#0D202F]">
                        الوسوم المميزة (Tags)
                    </label>
                    <TagInput
                        tags={formData.tags}
                        onChange={(newTags) => setFormData({ ...formData, tags: newTags })}
                    />
                </div>

                {/* Save Button */}
                <div className="pt-3 border-t border-gray-100 flex justify-end">
                    <SaveChangesButton
                        label="حفظ المعلومات الأساسية"
                        onClick={handleSave}
                        loading={isSaving}
                        compact
                    />
                </div>
            </form>
        </div>
    )
}

export default BasicInfoTab
