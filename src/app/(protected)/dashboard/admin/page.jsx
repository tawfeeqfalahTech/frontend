import AdminDashboard from "@/features/dashboards/admin/home/AdminDashboard";
import { adminPreviewStates, getAdminDashboardData } from "@/features/dashboards/admin/home/data";

export default async function Page({ searchParams }) {
    const params = await searchParams;
    const state = adminPreviewStates.includes(params?.state) ? params.state : "";
    return <AdminDashboard key={state} data={getAdminDashboardData(state)} state={state} />;
}
