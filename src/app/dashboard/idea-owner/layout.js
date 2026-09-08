import { getAuthUser } from "@/lib/auth";
import { getDashboardPath } from "@/lib/auth-routes";
import OwnerNavbar from "../../../features/dashboards/owner/home/components/OwnerNavbar";
import OwnerSidebar from "../../../features/dashboards/owner/home/components/OwnerSidebar";
import { redirect } from "next/navigation";

export default async function OwnerLayout({ children }) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isVerified) {
    redirect("/verify-otp");
  }

  if (user.role !== "idea-owner") {
    redirect(getDashboardPath(user?.role));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <OwnerNavbar />
      <OwnerSidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
