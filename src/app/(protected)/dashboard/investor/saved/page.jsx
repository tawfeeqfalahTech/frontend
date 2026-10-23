import { requierRole } from "@/lib/auth";
import InvestorSavedProjects from "@/features/dashboards/investor/saved/InvestorSavedProjects";
import { getInvestorDashboard } from "@/features/dashboards/data/dashboardRepository";

export default async function Page() {
    await requierRole("investor");
    return <InvestorSavedProjects data={await getInvestorDashboard()} />;
}
