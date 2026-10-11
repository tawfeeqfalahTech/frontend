import AdminUsers from "@/features/dashboards/admin/users/AdminUsers";
import { demoUsers } from "@/features/dashboards/admin/users/data";

export const metadata = { title: "المستخدمون | إدارة إحياء" };

export default async function Page({ searchParams }) {
    const params = await searchParams;
    return <AdminUsers users={params?.state === "empty" ? [] : demoUsers} />;
}
