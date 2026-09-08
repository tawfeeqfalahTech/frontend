import { getAuthUser } from "@/lib/auth";
import { getDashboardPath } from "@/lib/auth-routes";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const user = await getAuthUser();

  if (user) {
    if (!user.isVerified) {
      redirect("verify-otp");
    }
    redirect(getDashboardPath(user?.role));
  }
  return children;
}
