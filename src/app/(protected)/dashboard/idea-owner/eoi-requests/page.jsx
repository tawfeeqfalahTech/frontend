import { requierRole } from "@/lib/auth";
import InterestRequestsPage from "@/features/dashboards/owner/interest-requests/InterestRequestsPage"
import { getOwnerRequests } from "@/features/dashboards/data/dashboardRepository"

export default async function Page() {
    await requierRole("idea_owner");
    return <InterestRequestsPage initialData={await getOwnerRequests()} />
}
