"use client"
import { useState, useMemo } from "react"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import RequestFilterTabs from "@/features/dashboards/owner/interest-requests/components/RequestFilterTabs"
import InterestRequestCard from "@/features/dashboards/owner/interest-requests/components/InterestRequestCard"
import RejectReasonModal from "@/features/dashboards/owner/interest-requests/components/RejectReasonModal"
import AcceptConfirmModal from "@/features/dashboards/owner/interest-requests/components/AcceptConfirmModal"
import { initialRequests } from "@/features/dashboards/owner/interest-requests/data/mockRequests"
import { Inbox } from "lucide-react"

const InvestorsRequestsPage = () => {
    const [requests, setRequests] = useState(initialRequests)
    const [activeFilter, setActiveFilter] = useState("all")

    // حالة المودالات
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)

    // حساب أعداد كل فلتر
    const filterCounts = useMemo(() => {
        return {
            all: requests.length,
            pending: requests.filter(r => r.status === "pending").length,
            accepted: requests.filter(r => r.status === "accepted").length,
            rejected: requests.filter(r => r.status === "rejected").length,
            cancelled: requests.filter(r => r.status === "cancelled").length
        }
    }, [requests])

    // تصفية الطلبات بناءً على التبويب النشط
    const filteredRequests = useMemo(() => {
        if (activeFilter === "all") return requests
        return requests.filter(r => r.status === activeFilter)
    }, [requests, activeFilter])

    // فتح مودال الرفض
    const handleOpenReject = (req) => {
        setSelectedRequest(req)
        setIsRejectModalOpen(true)
    }

    // تأكيد الرفض
    const handleConfirmReject = (reason) => {
        if (!selectedRequest) return

        setRequests(prev => prev.map(r => {
            if (r.id === selectedRequest.id) {
                return {
                    ...r,
                    status: "rejected",
                    rejectReason: reason
                }
            }
            return r
        }))

    }

    // فتح مودال القبول
    const handleOpenAccept = (req) => {
        setSelectedRequest(req)
        setIsAcceptModalOpen(true)
    }

    // تأكيد القبول
    const handleConfirmAccept = () => {
        if (!selectedRequest) return

        setRequests(prev => prev.map(r => {
            if (r.id === selectedRequest.id) {
                return {
                    ...r,
                    status: "accepted",
                    hasDocument: false,
                    pendingDocText: "سيتم توفير مستند الاتفاق قريباً",
                    contactEmail: "fatima.z@techlabs.io"
                }
            }
            return r
        }))

    }

    return (
        <div className="flex flex-col gap-[1.2rem] pb-[3.2rem] min-h-screen pr-55 max-[660px]:pr-0">
            {/* Header */}
            <DashboardHeader
                route="طلبات الاهتمام"
                paragraph="متابعة وإدارة طلبات المستثمرين المهتمين بتمويل ودعم مشروعك"
            />


            {/* Reject Modal */}
            <RejectReasonModal
                isOpen={isRejectModalOpen}
                onClose={() => { setIsRejectModalOpen(false); setSelectedRequest(null); }}
                onConfirm={handleConfirmReject}
                investorName={selectedRequest?.investorName}
            />

            {/* Accept Modal */}
            <AcceptConfirmModal
                isOpen={isAcceptModalOpen}
                onClose={() => { setIsAcceptModalOpen(false); setSelectedRequest(null); }}
                onConfirm={handleConfirmAccept}
                investorName={selectedRequest?.investorName}
            />

            {/* Filter Tabs */}
            <div className="mt-[0.4rem]">
                <RequestFilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    counts={filterCounts}
                />
            </div>

            {/* Requests List */}
            {filteredRequests.length > 0 ? (
                <div className="flex flex-col gap-[0.8rem] mt-[0.4rem]">
                    {filteredRequests.map((request) => (
                        <InterestRequestCard
                            key={request.id}
                            request={request}
                            onAccept={handleOpenAccept}
                            onReject={handleOpenReject}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-white rounded-2xl p-[3.2rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-[0.6rem] mt-[0.8rem]">
                    <div className="w-[3.2rem] h-[3.2rem] rounded-2xl bg-[#E9EDF1] text-[#1E4C6F] flex items-center justify-center">
                        <Inbox className="w-[1.6rem] h-[1.6rem]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D202F]">
                        لا توجد طلبات في هذا القسم
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm">
                        لا توجد حالياً أي طلبات اهتمام تطابق تصنيف &quot;{
                            activeFilter === "pending" ? "قيد المراجعة" :
                                activeFilter === "accepted" ? "مقبول" :
                                    activeFilter === "rejected" ? "مرفوض" :
                                        activeFilter === "cancelled" ? "ملغي" : "الكل"
                        }&quot;.
                    </p>
                </div>
            )}
        </div>
    )
}

export default InvestorsRequestsPage
