import EditProjectPage from "@/features/dashboards/owner/edit-project/EditProjectPage"

export default async function Page({ searchParams }) {
    const params = await searchParams
    const empty = params?.state === "empty"
    const tab = ["basic-info", "media", "pdf", "video", "links"].includes(params?.tab) ? params.tab : "basic-info"
    return <EditProjectPage key={`${empty}-${tab}-${params?.id || ""}`} empty={empty} initialTab={tab} />
}
