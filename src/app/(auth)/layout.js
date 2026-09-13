import { getAuthUser } from "@/lib/auth";
import { getDashboardPath } from "@/lib/auth-routes";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  const user = await getAuthUser();
  if (user) {
    redirect(getDashboardPath(user.data?.role));
  }
  return children;
}
