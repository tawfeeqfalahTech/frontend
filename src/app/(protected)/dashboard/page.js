import { getUserRole, requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const roleDashboardPaths = {
    admin: "/dashboard/admin",
    investor: "/dashboard/investor",
    idea_owner: "/dashboard/idea-owner",
  };

  const user = await requireAuth();
  const userRole = getUserRole(user);

  const dashboardPath = roleDashboardPaths[userRole];

  if (!dashboardPath) {
    redirect("/unauthorized");
  }

  redirect(dashboardPath);
}
