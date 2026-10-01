"use client"
import { CheckCircle2, X } from "lucide-react"
import { useEffect } from "react"

const SuccessToast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (!isVisible) return

        const timer = setTimeout(() => {
            onClose?.()
        }, 3500)

        return () => clearTimeout(timer)
    }, [isVisible, onClose])

    if (!isVisible) return null

    return (
        <div className="fixed top-24 left-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 bg-[#EDF7EE] border border-[#367C39] text-[#367C39] px-5 py-3.5 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)]">
                <CheckCircle2 className="w-5 h-5 text-[#367C39] shrink-0" />
                <span className="font-semibold text-sm">{message || "تم حفظ التعديلات بنجاح!"}</span>
                <button
                    onClick={onClose}
                    className="mr-2 text-[#367C39]/70 hover:text-[#367C39] transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default SuccessToast
