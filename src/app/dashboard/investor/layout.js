import { getAuthUser } from "@/lib/auth";
import { getDashboardPath } from "@/lib/auth-routes";
import { redirect } from "next/navigation";

export default async function OwnerLayout({ children }) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isVerified) {
    redirect("/verify-otp");
  }

  if (user.role !== "investor") {
    redirect(getDashboardPath(user?.role));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
