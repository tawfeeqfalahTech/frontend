import InvestorDashboard from "@/features/dashboards/investor/home/InvestorDashboard";
import { getDashboardState } from "@/features/dashboards/investor/home/data";

export default function Page() {
    return <InvestorDashboard view="requests" data={getDashboardState()} />;
}
