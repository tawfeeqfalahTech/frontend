"use client"
import { useState } from "react"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import EditProjectSidebar from "@/features/dashboards/owner/edit-project/EditProjectSidebar"
import BasicInfoTab from "@/features/dashboards/owner/edit-project/tabs/BasicInfoTab"
import MediaUploadTab from "@/features/dashboards/owner/edit-project/tabs/MediaUploadTab"
import PdfFilesTab from "@/features/dashboards/owner/edit-project/tabs/PdfFilesTab"
import VideoTab from "@/features/dashboards/owner/edit-project/tabs/VideoTab"
import ProjectLinksTab from "@/features/dashboards/owner/edit-project/tabs/ProjectLinksTab"
import SuccessToast from "@/features/dashboards/owner/edit-project/components/SuccessToast"

const EditProjectPage = () => {
    const [activeTab, setActiveTab] = useState("basic-info")
    const [toast, setToast] = useState({
        visible: false,
        message: ""
    })

    const handleTabSave = (message) => {
        setToast({
            visible: true,
            message: message || "تم حفظ التعديلات بنجاح!"
        })
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case "basic-info":
                return <BasicInfoTab onSave={handleTabSave} />
            case "media":
                return <MediaUploadTab onSave={handleTabSave} />
            case "pdf":
                return <PdfFilesTab onSave={handleTabSave} />
            case "video":
                return <VideoTab onSave={handleTabSave} />
            case "links":
                return <ProjectLinksTab onSave={handleTabSave} />
            default:
                return <BasicInfoTab onSave={handleTabSave} />
        }
    }

    return (
        <div className="flex flex-col gap-8 pb-16 min-h-screen">
            {/* Header */}
            <DashboardHeader
                route="تعديل المشروع"
                paragraph="قم بتحديث وتعديل بيانات مشروعك الحالية وحفظ التغييرات مباشرة"
            />

            {/* Success Toast */}
            <SuccessToast
                isVisible={toast.visible}
                message={toast.message}
                onClose={() => setToast({ ...toast, visible: false })}
            />

            {/* Main Layout: Sidebar + Active Tab Content */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
                {/* Sidebar Navigation */}
                <EditProjectSidebar
                    activeTab={activeTab}
                    onSelectTab={setActiveTab}
                />

                {/* Active Tab Area */}
                <main className="flex-1 w-full min-w-0">
                    {renderTabContent()}
                </main>
            </div>
        </div>
    )
}

export default EditProjectPage
