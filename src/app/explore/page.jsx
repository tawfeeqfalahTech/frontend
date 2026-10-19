import Navbar from "@/features/landing/Navbar";
import Footer from "@/features/landing/Footer";
import InvestorProjects from "@/features/dashboards/investor/projects/InvestorProjects";
import { getDashboardState } from "@/features/dashboards/investor/home/data";
import { getAuthUser, getUserRole } from "@/lib/auth";
import { AuthContext } from "@/contexts/AuthContext";
import ExploreNavbar from "@/features/explore/ExploreNavbar";

export default async function ExplorePage({ searchParams }) {
  const [params, user] = await Promise.all([searchParams, getAuthUser()]);
  const query = typeof params?.q === "string" ? params.q : "";
  const state = ["empty", "empty-projects"].includes(params?.state) ? params.state : "";
  const account = user?.data?.user ?? user?.data ?? user?.user ?? user;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0D202F]">
      {account ? (
        <AuthContext initialUser={user}>
          <ExploreNavbar role={getUserRole(user)} />
        </AuthContext>
      ) : <Navbar />}
      <main className="flex-1 min-w-0 m-6">
        <InvestorProjects
          key={`${query}-${state}`}
          query={query}
          data={getDashboardState(state)}
          accountKey={account ? account.email || "current" : "guest"}
        />
      </main>
      <Footer />
    </div>
  );
}
