"use client"
import StepFour from "@/features/dashboards/owner/create-project/StepFour"
import StepOne from "@/features/dashboards/owner/create-project/StepOne"
import StepThree from "@/features/dashboards/owner/create-project/StepThree"
import StepTwo from "@/features/dashboards/owner/create-project/StepTwo"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import ProjectSuccess from "@/features/dashboards/owner/create-project/ProjectSuccess"
import { useState } from "react"
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'

const Page = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        // Step One
        title: "",
        category: "",
        tech: [],
        shortDescription: '',
        image: null,
        // Step Two
        description: '',
        status: "funding",
        // Step Three
        minBudget: '',
        maxBudget: '',
        team: [
            {
                name: "",
                role: ""
            }
        ],
        // Step Four
        visibility: "public"
    })

    const validateCurrentStep = () => {
        let newErrors = {}

        if (currentStep === 1) {
            if (!formData.title.trim()) {
                newErrors.title = "عنوان المشروع مطلوب"
            }
            if (!formData.category) {
                newErrors.category = "يرجى اختيار فئة المشروع"
            }
            if (!formData.shortDescription.trim()) {
                newErrors.shortDescription = "الوصف المختصر مطلوب"
            }
            if (!formData.image) {
                newErrors.image = "صورة الغلاف مطلوبة"
            }
        }

        if (currentStep === 2) {
            if (!formData.description.trim()) {
                newErrors.description = "التفاصيل الكاملة للمشروع مطلوبة"
            }
        }

        if (currentStep === 3) {
            if (!formData.minBudget) {
                newErrors.minBudget = "يرجى تحديد أدنى حد للميزانية"
            }
            if (!formData.maxBudget) {
                newErrors.maxBudget = "يرجى تحديد أقصى حد للميزانية"
            }
            if (Number(formData.minBudget) > Number(formData.maxBudget)) {
                newErrors.maxBudget = "الحد الأقصى يجب أن يكون أكبر من الحد الأدنى"
            }
        }

        if (currentStep === 4) {
            if (!formData.visibility) {
                newErrors.visibility = "يرجى اختيار حالة ظهور المشروع"
            }
        }

        setErrors(newErrors)

        // تكون الخطوة صالحة إذا لم توجد أي أخطاء
        return Object.keys(newErrors).length === 0
    }

    const handleNext = async () => {
        // التحقق من الخطوة الحالية أولاً
        if (!validateCurrentStep()) return

        if (currentStep < 4) {
            setCurrentStep((prev) => prev + 1)
        } else {
            // عند الوصول للخطوة 4 وتخطي التحقق بنجاح
            setLoading(true)
            try {
                // إرسال البيانات للباك إند هنا (API Call)
                // await api.post('/projects', formData)

                setIsSubmitted(true)
            } catch (error) {
                console.error("خطأ أثناء نشر المشروع:", error)
            } finally {
                setLoading(false)
            }
        }
    }

    const handlePrev = () => {
        if (currentStep > 1) {
            setErrors({}) // مسح الأخطاء عند العودة للخلف
            setCurrentStep((prev) => prev - 1)
        }
    }

    return (
        <main className='px-20 py-6' dir="rtl">
            <DashboardHeader route="ارفع مشروعك" paragraph="أربع خطوات فقط واعرض مشروع للاستثمار" />

            {/* شريط الخطوات */}
            <div className="relative flex items-center justify-between w-full pt-5 mb-8">
                <div className="absolute top-9.5 left-[20px] right-[20px] h-0.5 bg-gray-200 z-0" />

                <div
                    className="absolute top-9.5 right-[20px] left-[20px] h-0.5 bg-[#1E4C6F] z-0 transition-all duration-300"
                    style={{
                        width: isSubmitted ? '100%' : `${((currentStep - 1) / 3) * 100}%`,
                    }}
                />

                {/* الخطوة 1 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${isSubmitted || currentStep >= 1
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {isSubmitted || currentStep > 1 ? '✓' : '1'}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isSubmitted || currentStep >= 1 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'}`}>
                        التفاصيل الأساسية
                    </h3>
                </div>

                {/* الخطوة 2 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${isSubmitted || currentStep >= 2
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {isSubmitted || currentStep > 2 ? '✓' : '2'}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isSubmitted || currentStep >= 2 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'}`}>
                        التفاصيل والمصادر
                    </h3>
                </div>

                {/* الخطوة 3 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${isSubmitted || currentStep >= 3
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {isSubmitted || currentStep > 3 ? '✓' : '3'}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isSubmitted || currentStep >= 3 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'}`}>
                        الفريق والميزانية
                    </h3>
                </div>

                {/* الخطوة 4 */}
                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${isSubmitted || currentStep >= 4
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {isSubmitted ? '✓' : '4'}
                    </div>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isSubmitted || currentStep >= 4 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'}`}>
                        المراجعة والنشر
                    </h3>
                </div>
            </div>

            {/* عرض محتوى النجاح أو الخطوات والأزرار */}
            {isSubmitted ? (
                <ProjectSuccess />
            ) : (
                <>
                    {currentStep === 1 && (
                        <StepOne formData={formData} setFormData={setFormData} errors={errors} />
                    )}
                    {currentStep === 2 && (
                        <StepTwo formData={formData} setFormData={setFormData} errors={errors} />
                    )}
                    {currentStep === 3 && (
                        <StepThree formData={formData} setFormData={setFormData} errors={errors} />
                    )}
                    {currentStep === 4 && (
                        <StepFour formData={formData} setFormData={setFormData} errors={errors} />
                    )}

                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 1 || loading}
                            className="bg-[#1E4C6F] disabled:cursor-not-allowed disabled:bg-gray-400 group flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300"
                        >
                            <ChevronRight className="group-hover:translate-x-3 transition-transform duration-200" />
                            السابق
                        </button>

                        <div className="flex items-center gap-5">
                            <button className="flex items-center gap-1 hover:text-blue-500 transition duration-200 cursor-pointer">
                                <Bookmark size={19} />
                                حفظ كمسودة
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="bg-[#1E4C6F] border-[#1E4C6F] group flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'جاري النشر...' : currentStep === 4 ? 'نشر المشروع' : 'التالي'}
                                {!loading && currentStep < 4 && (
                                    <ChevronLeft className="group-hover:-translate-x-3 transition-transform duration-200" />
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}

export default Page