import InterestRequestsPage from "@/features/dashboards/owner/interest-requests/InterestRequestsPage"
import { initialRequests } from "@/features/dashboards/owner/interest-requests/data/mockRequests"

export default async function Page({ searchParams }) {
    const params = await searchParams
    const empty = params?.state === "empty"
    return <InterestRequestsPage key={String(empty)} initialData={empty ? [] : initialRequests} />
}
