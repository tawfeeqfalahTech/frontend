import { requierRole } from "@/lib/auth";
import InvestorDashboard from "@/features/dashboards/investor/home/InvestorDashboard";
import { getInvestorDashboard } from "@/features/dashboards/data/dashboardRepository";

export default async function Page() {
    await requierRole("investor");
    return <InvestorDashboard data={await getInvestorDashboard()} />;
}
