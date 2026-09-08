import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isVerified) {
    redirect("/verify-otp");
  }

  return <AuthContext initialUser={user}>{children}</AuthContext>;
}
