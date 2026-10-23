import { requierRole } from "@/lib/auth";
import AdminDashboard from "@/features/dashboards/admin/home/AdminDashboard";
import { getAdminDashboard } from "@/features/dashboards/data/dashboardRepository";

export default async function Page() {
    await requierRole("admin");
    return <AdminDashboard data={await getAdminDashboard()} />;
}
