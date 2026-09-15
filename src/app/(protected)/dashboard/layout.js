import OwnerNavbar from "@/features/dashboards/layout/Navbar";
import OwnerSidebar from "@/features/dashboards/layout/Sidebar";

export default async function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <OwnerNavbar />
      <OwnerSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
