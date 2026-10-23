import { requierRole } from "@/lib/auth";
import DeletedProjectsPage from '@/features/dashboards/owner/delete-project/DeletedProjectsPage'

export default async function Page() {
    await requierRole("idea_owner");
    return <DeletedProjectsPage />
}
