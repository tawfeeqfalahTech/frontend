import InvestorRequests from "@/features/dashboards/investor/requests/InvestorRequests";
import { initialRequests, requestFilters } from "@/features/dashboards/investor/requests/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const empty = params?.state === "empty";
    const filter = requestFilters.some((item) => item.id === params?.status) ? params.status : "all";
    return <InvestorRequests key={`${empty}-${filter}`} initialData={empty ? [] : initialRequests} initialFilter={filter} />;
}
