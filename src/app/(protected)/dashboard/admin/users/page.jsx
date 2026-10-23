import { requierRole } from "@/lib/auth";
import AdminUsers from "@/features/dashboards/admin/users/AdminUsers";
import { getAdminUsers } from "@/features/dashboards/data/dashboardRepository";

export const metadata = { title: "المستخدمون | إدارة إحياء" };

export default async function Page() {
    await requierRole("admin");
    return <AdminUsers users={await getAdminUsers()} />;
}
