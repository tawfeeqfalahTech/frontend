import InvestorDashboard from "@/features/dashboards/investor/home/InvestorDashboard";
import { dashboardPreviewStates, getDashboardState } from "@/features/dashboards/investor/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const state = dashboardPreviewStates.includes(params?.state) ? params.state : "";
    return <InvestorDashboard key={state} data={getDashboardState(state)} previewState={state} />;
}
