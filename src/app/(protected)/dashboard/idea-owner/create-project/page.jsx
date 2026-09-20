"use client"
import StepFour from "@/features/dashboards/owner/create-project/StepFour"
import StepOne from "@/features/dashboards/owner/create-project/StepOne"
import StepThree from "@/features/dashboards/owner/create-project/StepThree"
import StepTwo from "@/features/dashboards/owner/create-project/StepTwo"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import { useState } from "react"
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react'

const Page = () => {
    const [currentStep, setCurrentStep] = useState(3)

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        // Step One
        title: "",
        des: "",

    })

    return (
        <main className='px-20'>
            <DashboardHeader route="ارفع مشروعك" paragraph="أربع خطوات  فقط واعرض مشروع للاستثمار" />

            <div className="relative flex items-center justify-between w-full pt-5 mb-8">
                <div className="absolute top-9.5 left-0 w-full h-0.5 bg-gray-200 z-0" />

                <div
                    className="absolute top-9.5 right-0 h-0.5 bg-[#1E4C6F] z-0 transition-all duration-300"
                    style={{
                        width: `${((currentStep - 1) / 3) * 100}%`,
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${currentStep >= 1
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {currentStep > 1 ? '✓' : '1'}
                    </div>
                    <h3
                        className={`text-sm font-semibold transition-colors duration-300 ${currentStep >= 1 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'
                            }`}
                    >
                        التفاصيل الأساسية
                    </h3>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${currentStep >= 2
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {currentStep > 2 ? '✓' : '2'}
                    </div>
                    <h3
                        className={`text-sm font-semibold transition-colors duration-300 ${currentStep >= 2 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'
                            }`}
                    >
                        التفاصيل والمصادر
                    </h3>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${currentStep >= 3
                            ? 'bg-[#1E4C6F] text-white'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        {currentStep > 3 ? '✓' : '3'}
                    </div>
                    <h3
                        className={`text-sm font-semibold transition-colors duration-300 ${currentStep >= 3 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'
                            }`}
                    >
                        الفريق والميزانية
                    </h3>
                </div>

                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${currentStep >= 4
                            ? 'bg-[#1E4C6F] text-white font-semibold'
                            : 'bg-white border-2 border-[#1E4C6F] text-[#1E4C6F]'
                            }`}
                    >
                        4
                    </div>
                    <h3
                        className={`text-sm font-semibold transition-colors duration-300 ${currentStep >= 4 ? 'text-[#1E4C6F] font-semibold' : 'text-gray-400'
                            }`}
                    >
                        نشر المشروع
                    </h3>
                </div>
            </div>

            {currentStep === 1 && (
                <StepOne formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 2 && (
                <StepTwo />
            )}
            {currentStep === 3 && (
                <StepThree />
            )}
            {currentStep === 4 && (
                <StepFour />
            )}

            <div className="flex items-center justify-between mt-4">
                <button disabled={currentStep === 1} className="bg-[#1E4C6F] disabled:cursor-not-allowed disabled:bg-gray-400 group disabled:border-2 flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">
                    <ChevronRight className="group-hover:translate-x-3 transition-transform duration-200" />
                    السابق
                </button>
                <div className="flex items-center gap-5">
                    <button className="flex items-center gap-1 hover:text-blue-500 transition duration-200 cursor-pointer">
                        <Bookmark size={19} />
                        حفظ كمسودة
                    </button>
                    <button disabled={currentStep === 1} className="bg-[#1E4C6F] border-[#1E4C6F] group flex items-center justify-center w-30 text-white text-lg h-11 rounded-xl cursor-pointer hover:-translate-y-0.5 hover:bg-[#163852] transition-all duration-300">
                        التالي
                        <ChevronLeft className="group-hover:-translate-x-3 transition-transform duration-200" />
                    </button>
                </div>
            </div>

        </main>
    )
}

export default Page