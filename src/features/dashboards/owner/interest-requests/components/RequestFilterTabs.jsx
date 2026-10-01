"use client"

const filters = [
    { id: "all", label: "الكل" },
    { id: "pending", label: "قيد المراجعة" },
    { id: "accepted", label: "مقبول" },
    { id: "rejected", label: "مرفوض" },
    { id: "cancelled", label: "ملغي" }
]

const RequestFilterTabs = ({ activeFilter = "all", onFilterChange, counts = {} }) => {
    return (
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {filters.map((tab) => {
                const isActive = activeFilter === tab.id
                const count = counts[tab.id]

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onFilterChange?.(tab.id)}
                        className={`px-6 py-2.5 rounded-2xl text-base sm:text-lg font-bold transition-all duration-200 cursor-pointer shrink-0 ${
                            isActive
                                ? "border-2 border-dashed border-[#1E4C6F]/40 bg-[#E9EDF1]/40 text-[#0D202F] shadow-xs"
                                : "text-gray-500 hover:text-[#0D202F] hover:bg-gray-50 border-2 border-transparent"
                        }`}
                    >
                        <span>{tab.label}</span>
                        {typeof count === "number" && (
                            <span className={`mr-2 text-xs px-2 py-0.5 rounded-full ${
                                isActive ? "bg-[#1E4C6F] text-white" : "bg-gray-200 text-gray-700"
                            }`}>
                                {count}
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default RequestFilterTabs
