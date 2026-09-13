import { AuthContext } from "@/contexts/AuthContext";
import { requireAuth } from "@/lib/auth";

export default async function ProtectedLayout({ children }) {
  const user = await requireAuth();

  return <AuthContext initialUser={user}>{children}</AuthContext>;
}
