import { requierRole } from "@/lib/auth";
import OwnerProfile from "@/features/dashboards/owner/profile/OwnerProfile"
import { getOwnerProfile, getOwnerProjects } from "@/features/dashboards/data/dashboardRepository"

export default async function Page() {
    const user = await requierRole("idea_owner");
    const [profile, projects] = await Promise.all([getOwnerProfile(user), getOwnerProjects()])
    return <OwnerProfile profile={profile} projects={projects} />
}
