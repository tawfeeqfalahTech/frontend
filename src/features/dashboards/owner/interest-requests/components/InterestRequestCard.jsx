"use client"
import Image from "next/image"
import { Briefcase, FileText, Clock, Mail } from "lucide-react"

const InterestRequestCard = ({
    request,
    onAccept,
    onReject,
    onViewDocument
}) => {
    const {
        investorName,
        avatar,
        requestType = "طلب استثمار",
        status,
        time = "قبل 3 ساعات",
        message,
        hasDocument,
        documentName,
        rejectReason,
        cancelledBadgeText,
        pendingDocText,
        contactEmail
    } = request

    // بادج الحالة
    const renderStatusBadge = () => {
        switch (status) {
            case "pending":
                return (
                    <span className="bg-[#FEF3C7] text-[#B45309] text-xs font-bold px-3 py-1 rounded-lg">
                        قيد المراجعة
                    </span>
                )
            case "accepted":
                return (
                    <span className="bg-[#EDF7EE] text-[#367C39] text-xs font-bold px-3 py-1 rounded-lg">
                        تم القبول
                    </span>
                )
            case "rejected":
                return (
                    <span className="bg-[#FEE2E2] text-[#DC2626] text-xs font-bold px-3 py-1 rounded-lg">
                        مرفوض
                    </span>
                )
            case "cancelled":
                return null // يظهر في الجهة اليسرى كما في فيجما
            default:
                return null
        }
    }

    // القسم الأيسر التفاعلي حسب الحالة
    const renderLeftActions = () => {
        // الحالة 1: قيد المراجعة -> زري قبول ورفض
        if (status === "pending") {
            return (
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => onReject?.(request)}
                        className="px-6 py-2.5 rounded-xl border border-[#1E4C6F]/40 text-[#1E4C6F] hover:bg-[#E9EDF1]/50 font-bold text-base transition-colors cursor-pointer"
                    >
                        رفض
                    </button>
                    <button
                        type="button"
                        onClick={() => onAccept?.(request)}
                        className="px-6 py-2.5 rounded-xl bg-[#1E4C6F] hover:bg-[#153a55] text-white font-bold text-base transition-colors cursor-pointer shadow-sm"
                    >
                        قبول الطلب
                    </button>
                </div>
            )
        }

        // الحالة 2: مقبول ومعه مستند PDF
        if (status === "accepted" && hasDocument) {
            return (
                <button
                    type="button"
                    onClick={() => onViewDocument?.(request)}
                    className="flex items-center gap-2 text-[#1E4C6F] hover:text-[#153a55] font-bold text-base hover:underline transition-all cursor-pointer"
                >
                    <FileText className="w-5 h-5 shrink-0" />
                    <span>{documentName || "عرض مستند الاتفاق (PDF)"}</span>
                </button>
            )
        }

        // الحالة 3: مرفوض مع ذكر السبب
        if (status === "rejected") {
            return (
                <div className="flex flex-col items-start lg:items-end text-right gap-1 max-w-sm">
                    <span className="text-sm font-bold text-[#DC2626]">
                        سبب الرفض:
                    </span>
                    <p className="text-xs sm:text-sm text-[#DC2626]/90 leading-relaxed font-medium">
                        {rejectReason || "لقد قدمت عرضاً جيداً ولكن تم التوافق مع مستثمر من قبل"}
                    </p>
                </div>
            )
        }

        // الحالة 4: ملغي من المستثمر
        if (status === "cancelled") {
            return (
                <span className="bg-gray-100 text-gray-500 text-sm font-bold px-4 py-2 rounded-xl">
                    {cancelledBadgeText || "ملغي من المستثمر"}
                </span>
            )
        }

        // الحالة 5: مقبول بانتظار توفير المستند
        if (status === "accepted" && !hasDocument) {
            return (
                <div className="flex flex-col items-start lg:items-end gap-2">
                    <div className="flex items-center gap-1.5 bg-[#F9F6F0] border border-[#EBE3D7] text-[#9E7F4D] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{pendingDocText || "سيتم توفير مستند الاتفاق قريباً"}</span>
                    </div>
                    {contactEmail && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 dir-ltr">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{contactEmail}</span>
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    return (
        <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0px_4px_24px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all duration-200 hover:shadow-md">
            {/* Right Side: Investor Avatar + Details (RTL) */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                    <Image
                        src={avatar || "/images/avatar.png"}
                        alt={investorName}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    {/* Header Row: Name + Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0D202F]">
                            {investorName}
                        </h3>

                        {/* بادج طلب استثمار */}
                        <div className="flex items-center gap-1.5 bg-[#E9EDF1] text-[#1E4C6F] text-xs font-bold px-3 py-1 rounded-lg">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{requestType}</span>
                        </div>

                        {/* بادج الحالة المعينة */}
                        {renderStatusBadge()}
                    </div>

                    {/* نص رسالة المستثمر */}
                    <p className="text-[#4B708C] text-sm sm:text-base leading-relaxed max-w-3xl">
                        {message}
                    </p>
                </div>
            </div>

            {/* Left Side: Time + Action Elements */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                <span className="text-xs sm:text-sm text-gray-400 font-medium">
                    {time}
                </span>

                <div>
                    {renderLeftActions()}
                </div>
            </div>
        </div>
    )
}

export default InterestRequestCard
