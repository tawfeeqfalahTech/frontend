"use client"
import { CheckCircle2, X } from "lucide-react"

const AcceptConfirmModal = ({ isOpen, onClose, onConfirm, investorName = "المستثمر" }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6 text-center">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto -mt-4">
                    <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-[#0D202F]">
                        قبول طلب الاستثمار
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                        هل أنت متأكد من قبول طلب الاستثمار المقدم من <strong className="text-[#1E4C6F]">{investorName}</strong>؟ سيتم إشعار المستثمر وتجهيز الخطوات التالية.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                    >
                        تراجع
                    </button>
                    <button
                        type="button"
                        onClick={() => { onConfirm?.(); onClose?.(); }}
                        className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#1E4C6F] hover:bg-[#153a55] text-white transition-colors cursor-pointer shadow-md"
                    >
                        تأكيد القبول
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AcceptConfirmModal
