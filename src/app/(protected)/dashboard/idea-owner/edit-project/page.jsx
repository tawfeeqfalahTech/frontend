import { requierRole } from "@/lib/auth";
import EditProjectPage from "@/features/dashboards/owner/edit-project/EditProjectPage"
import { getOwnerProject } from "@/features/dashboards/data/dashboardRepository"
import { notFound } from "next/navigation"

export default async function Page({ searchParams }) {
    await requierRole("idea_owner");
    const params = await searchParams
    const project = await getOwnerProject(typeof params?.id === "string" ? params.id : undefined)
    if (!project) notFound()
    const tab = ["basic-info", "media", "pdf", "video", "links"].includes(params?.tab) ? params.tab : "basic-info"
    return <EditProjectPage key={`${project.id}-${tab}`} project={project} initialTab={tab} />
}
