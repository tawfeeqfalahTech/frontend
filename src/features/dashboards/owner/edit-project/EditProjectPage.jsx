"use client"
import { useState } from "react"
import DashboardHeader from "@/features/dashboards/shared/DashboardHeader"
import EditProjectSidebar from "@/features/dashboards/owner/edit-project/EditProjectSidebar"
import BasicInfoTab from "@/features/dashboards/owner/edit-project/tabs/BasicInfoTab"
import MediaUploadTab from "@/features/dashboards/owner/edit-project/tabs/MediaUploadTab"
import PdfFilesTab from "@/features/dashboards/owner/edit-project/tabs/PdfFilesTab"
import VideoTab from "@/features/dashboards/owner/edit-project/tabs/VideoTab"
import ProjectLinksTab from "@/features/dashboards/owner/edit-project/tabs/ProjectLinksTab"

const EditProjectPage = ({ project, initialTab = "basic-info" }) => {
    const [activeTab, setActiveTab] = useState(initialTab)


    const renderTabContent = () => {
        switch (activeTab) {
            case "basic-info":
                return <BasicInfoTab project={project} />
            case "media":
                return <MediaUploadTab initialImages={project.images ?? []} />
            case "pdf":
                return <PdfFilesTab initialDocuments={project.files ?? []} />
            case "video":
                return <VideoTab initialVideoUrl={project.videoUrl ?? ""} poster={project.videoPoster} />
            case "links":
                return <ProjectLinksTab initialLinks={project.links ?? []} />
            default:
                return <BasicInfoTab project={project} />
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
