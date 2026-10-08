import InvestorDashboard from "@/features/dashboards/investor/home/InvestorDashboard";
import { getDashboardState } from "@/features/dashboards/investor/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const query = typeof params?.q === "string" ? params.q : "";
    return <InvestorDashboard key={query} view="projects" query={query} data={getDashboardState()} />;
}
