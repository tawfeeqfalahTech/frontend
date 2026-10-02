"use client"
import { useState } from "react"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import EditProjectSidebar from "@/features/dashboards/owner/edit-project/EditProjectSidebar"
import BasicInfoTab from "@/features/dashboards/owner/edit-project/tabs/BasicInfoTab"
import MediaUploadTab from "@/features/dashboards/owner/edit-project/tabs/MediaUploadTab"
import PdfFilesTab from "@/features/dashboards/owner/edit-project/tabs/PdfFilesTab"
import VideoTab from "@/features/dashboards/owner/edit-project/tabs/VideoTab"
import ProjectLinksTab from "@/features/dashboards/owner/edit-project/tabs/ProjectLinksTab"

const EditProjectPage = () => {
    const [activeTab, setActiveTab] = useState("basic-info")


    const renderTabContent = () => {
        switch (activeTab) {
            case "basic-info":
                return <BasicInfoTab />
            case "media":
                return <MediaUploadTab />
            case "pdf":
                return <PdfFilesTab />
            case "video":
                return <VideoTab />
            case "links":
                return <ProjectLinksTab />
            default:
                return <BasicInfoTab />
        }
    }

    return (
        <div className="flex flex-col gap-6 pb-14 min-h-screen">
            {/* Header */}
            <DashboardHeader
                route="تعديل المشروع"
                paragraph="قم بتحديث وتعديل بيانات مشروعك الحالية وحفظ التغييرات مباشرة"
            />

            {/* Main Layout: Sidebar + Active Tab Content */}
            <div className="flex flex-col lg:flex-row items-start gap-6">
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
