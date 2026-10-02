"use client"
import Image from "next/image"
import { Briefcase, FileText, Clock, Mail } from "lucide-react"

const InterestRequestCard = ({
    request,
    onAccept,
    onReject,
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
                    <span className="bg-[#FEF3C7] text-[#B45309] text-xs font-bold px-[0.6rem] py-[0.2rem] rounded-lg">
                        قيد المراجعة
                    </span>
                )
            case "accepted":
                return (
                    <span className="bg-[#EDF7EE] text-[#367C39] text-xs font-bold px-[0.6rem] py-[0.2rem] rounded-lg">
                        تم القبول
                    </span>
                )
            case "rejected":
                return (
                    <span className="bg-[#FEE2E2] text-[#DC2626] text-xs font-bold px-[0.6rem] py-[0.2rem] rounded-lg">
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
                <div className="flex items-center gap-[0.6rem]">
                    <button
                        type="button"
                        onClick={() => onReject?.(request)}
                        className="px-[1.2rem] py-2 rounded-xl border border-[#1E4C6F]/40 text-[#1E4C6F] hover:bg-[#E9EDF1]/50 font-bold text-sm transition-colors cursor-pointer"
                    >
                        رفض
                    </button>
                    <button
                        type="button"
                        onClick={() => onAccept?.(request)}
                        className="px-[1.2rem] py-2 rounded-xl bg-[#1E4C6F] hover:bg-[#153a55] text-white font-bold text-sm transition-colors cursor-pointer shadow-sm"
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
                    className="flex items-center gap-[0.4rem] text-[#1E4C6F] hover:text-[#153a55] font-bold text-sm hover:underline transition-all cursor-pointer"
                >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>{documentName || "عرض مستند الاتفاق (PDF)"}</span>
                </button>
            )
        }

        // الحالة 3: مرفوض مع ذكر السبب
        if (status === "rejected") {
            return (
                <div className="flex flex-col items-start lg:items-end text-right gap-[0.2rem] max-w-sm">
                    <span className="text-xs font-bold text-[#DC2626]">
                        سبب الرفض:
                    </span>
                    <p className="text-xs text-[#DC2626]/90 leading-relaxed font-medium">
                        {rejectReason || "لقد قدمت عرضاً جيداً ولكن تم التوافق مع مستثمر من قبل"}
                    </p>
                </div>
            )
        }

        // الحالة 4: ملغي من المستثمر
        if (status === "cancelled") {
            return (
                <span className="bg-gray-100 text-gray-500 text-xs font-bold px-[0.8rem] py-[0.4rem] rounded-xl">
                    {cancelledBadgeText || "ملغي من المستثمر"}
                </span>
            )
        }

        // الحالة 5: مقبول بانتظار توفير المستند
        if (status === "accepted" && !hasDocument) {
            return (
                <div className="flex flex-col items-start lg:items-end gap-[0.4rem]">
                    <div className="flex items-center gap-[0.3rem] bg-[#F9F6F0] border border-[#EBE3D7] text-[#9E7F4D] px-[0.7rem] py-[0.3rem] rounded-xl text-xs font-semibold">
                        <Clock className="w-[0.8rem] h-[0.8rem] shrink-0" />
                        <span>{pendingDocText || "سيتم توفير مستند الاتفاق قريباً"}</span>
                    </div>
                    {contactEmail && (
                        <div className="flex items-center gap-[0.2rem] text-xs text-gray-400 dir-ltr">
                            <Mail className="w-[0.7rem] h-[0.7rem]" />
                            <span>{contactEmail}</span>
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    return (
        <div className="bg-white rounded-2xl p-5 sm:p-[1.375rem] shadow-[0px_4px_24px_0px_rgba(30,76,111,0.06)] border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all duration-200 hover:shadow-md">
            {/* Right Side: Investor Avatar + Details (RTL) */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                    <Image
                        src={avatar || "/images/avatar.png"}
                        alt={investorName}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    {/* Header Row: Name + Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0D202F]">
                            {investorName}
                        </h3>

                        {/* بادج طلب استثمار */}
                        <div className="flex items-center gap-[0.3rem] bg-[#E9EDF1] text-[#1E4C6F] text-xs font-bold px-[0.6rem] py-[0.2rem] rounded-lg">
                            <Briefcase className="w-[0.7rem] h-[0.7rem]" />
                            <span>{requestType}</span>
                        </div>

                        {/* بادج الحالة المعينة */}
                        {renderStatusBadge()}
                    </div>

                    {/* نص رسالة المستثمر */}
                    <p className="text-[#4B708C] text-xs sm:text-sm leading-relaxed max-w-3xl">
                        {message}
                    </p>
                </div>
            </div>

            {/* Left Side: Time + Action Elements */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-gray-100">
                <span className="text-xs text-gray-400 font-medium">
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
