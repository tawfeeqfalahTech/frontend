import InvestorProjects from "@/features/dashboards/investor/projects/InvestorProjects";
import { getDashboardState } from "@/features/dashboards/investor/home/data";
import { getAuthUser } from "@/lib/auth";

export default async function Page({ searchParams }) {
    const [params, user] = await Promise.all([searchParams, getAuthUser()]);
    const query = typeof params?.q === "string" ? params.q : "";
    const state = ["empty", "empty-projects"].includes(params?.state) ? params.state : "";
    const account = user?.data?.user ?? user?.data ?? user?.user ?? user;

    return <div className="min-w-0 pr-55 max-[660px]:pr-0">
        <InvestorProjects
            key={`${query}-${state}`}
            query={query}
            data={getDashboardState(state)}
            accountKey={account?.email || "current"}
        />
    </div>;
}
