import InvestorProjects from "@/features/dashboards/investor/projects/InvestorProjects";
import { getDashboardState } from "@/features/dashboards/investor/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const query = typeof params?.q === "string" ? params.q : "";
    const state = ["empty", "empty-projects"].includes(params?.state) ? params.state : "";
    return <InvestorProjects key={`${query}-${state}`} query={query} data={getDashboardState(state)} />;
}
