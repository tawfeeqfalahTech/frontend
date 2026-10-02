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
        <div className="flex items-center gap-[0.4rem] sm:gap-[0.8rem] overflow-x-auto pb-[0.4rem] scrollbar-none">
            {filters.map((tab) => {
                const isActive = activeFilter === tab.id
                const count = counts[tab.id]

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onFilterChange?.(tab.id)}
                        className={`px-[1.2rem] py-2 rounded-2xl text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer shrink-0 ${isActive
                            ? "bg-[#E9EDF1]/40 text-[#0D202F] shadow-xs"
                            : "text-gray-500 hover:text-[#0D202F] hover:bg-gray-50"
                            }`}
                    >
                        <span>{tab.label}</span>
                        {typeof count === "number" && (
                            <span className={`mr-[0.4rem] text-xs px-[0.4rem] py-[0.1rem] rounded-full ${isActive ? "bg-[#1E4C6F] text-white" : "bg-gray-200 text-gray-700"
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
