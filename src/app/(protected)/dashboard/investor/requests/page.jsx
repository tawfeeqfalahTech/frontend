import InvestorDashboard from "@/features/dashboards/investor/home/InvestorDashboard";
import { getDashboardState } from "@/features/dashboards/investor/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const state = params?.state === "empty" ? "empty-requests" : "";
    return <InvestorDashboard key={state} view="requests" data={getDashboardState(state)} previewState={state} />;
}
