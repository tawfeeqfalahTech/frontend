import { requierRole } from "@/lib/auth";
import InvestorRequests from "@/features/dashboards/investor/requests/InvestorRequests";
import { requestFilters } from "@/features/dashboards/investor/requests/data";
import { getInvestorDashboard, getInvestorRequests } from "@/features/dashboards/data/dashboardRepository";

export default async function Page({ searchParams }) {
    await requierRole("investor");
    const params = await searchParams;
    const filter = requestFilters.some((item) => item.id === params?.status) ? params.status : "all";
    const [requests, dashboard] = await Promise.all([getInvestorRequests(), getInvestorDashboard()]);
    return <InvestorRequests key={filter} initialData={requests} projects={dashboard.projects} initialFilter={filter} />;
}
