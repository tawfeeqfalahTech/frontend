"use client"
import { useState } from "react"
import { X, AlertCircle } from "lucide-react"

const defaultReasons = [
    "لقد قدمت عرضاً جيداً ولكن تم التوافق مع مستثمر من قبل",
    "الميزانية المقترحة لا تتناسب مع متطلبات المرحلة الحالية للمشروع",
    "مجال الاستثمار الحالي تم إغلاقه مؤقتاً لحين استكمال الجولة",
    "سبب آخر مخصص..."
]

const RejectReasonModal = ({ isOpen, onClose, onConfirm, investorName = "المستثمر" }) => {
    const [selectedReason, setSelectedReason] = useState(defaultReasons[0])
    const [customReason, setCustomReason] = useState("")

    if (!isOpen) return null

    const handleConfirm = () => {
        const finalReason = selectedReason === "سبب آخر مخصص..."
            ? (customReason.trim() || defaultReasons[0])
            : selectedReason
        onConfirm?.(finalReason)
        onClose?.()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-gray-100 flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#0D202F]">
                                رفض طلب الاستثمار
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                                من {investorName}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Predefined Reasons */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-[#0D202F]">
                        اختر سبب الرفض لإبلاغ المستثمر:
                    </label>
                    <div className="flex flex-col gap-2">
                        {defaultReasons.map((reason, idx) => (
                            <label
                                key={idx}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${selectedReason === reason
                                        ? "border-red-300 bg-red-50/40 text-red-900"
                                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="rejectReason"
                                    checked={selectedReason === reason}
                                    onChange={() => setSelectedReason(reason)}
                                    className="mt-1 text-red-600 focus:ring-red-500"
                                />
                                <span className="text-sm font-medium leading-relaxed">
                                    {reason}
                                </span>
                            </label>
                        ))}
                    </div>

                    {selectedReason === "سبب آخر مخصص..." && (
                        <textarea
                            rows={3}
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                            placeholder="اكتب سبب الرفض بالتفصيل..."
                            className="w-full mt-2 p-3 border border-gray-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 rounded-xl text-sm outline-none"
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        إلغاء
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-sm"
                    >
                        تأكيد الرفض
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RejectReasonModal