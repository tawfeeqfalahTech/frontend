import DashboardShell from "@/features/dashboards/layout/DashboardShell";

export default async function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardShell />
      <main className="flex-1 m-6">{children}</main>
    </div>
  );
}
