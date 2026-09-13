import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function selectionRoleLayout({ children }) {
  const cookieStore = await cookies();
  const emailselectionRole = cookieStore.get("pending_selection_role")?.value;

  if (!emailselectionRole) {
    redirect("/register");
  }
  return children;
}
