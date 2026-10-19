import InvestorSavedProjects from "@/features/dashboards/investor/saved/InvestorSavedProjects";
import { getDashboardState } from "@/features/dashboards/investor/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const state = ["complete", "empty", "empty-saved", "loading", "error"].includes(params?.state) ? params.state : "";
    return <InvestorSavedProjects key={state} data={getDashboardState(state)} previewState={state} />;
}
