"use client"
import { FileText, Image as ImageIcon, FileSpreadsheet, Video, Link2 } from "lucide-react"

const tabs = [
    {
        id: "basic-info",
        label: "المعلومات الأساسية",
        icon: FileText
    },
    {
        id: "media",
        label: "الصور والمرفقات",
        icon: ImageIcon
    },
    {
        id: "pdf",
        label: "ملفات PDF",
        icon: FileSpreadsheet
    },
    {
        id: "video",
        label: "مقطع الفيديو",
        icon: Video
    },
    {
        id: "links",
        label: "روابط المشروع",
        icon: Link2
    }
]

const EditProjectSidebar = ({ activeTab, onSelectTab }) => {
    return (
        <aside className="w-full lg:w-64 bg-white rounded-2xl p-5 shadow-[0px_4px_32px_0px_rgba(30,76,111,0.08)] border border-gray-100 flex flex-col shrink-0">
            <h3 className="text-xs font-semibold text-[#94A3B8] mb-4 px-2">
                أقسام التعديل
            </h3>

            <nav className="flex flex-col gap-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onSelectTab(tab.id)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${isActive
                                    ? "bg-[#E9EDF1] text-[#1E4C6F] shadow-xs"
                                    : "text-[#475569] hover:bg-gray-50 hover:text-[#1E4C6F]"
                                }`}
                        >
                            <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#1E4C6F]" : "text-gray-400"}`} />
                            <span>{tab.label}</span>
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}

export default EditProjectSidebar
