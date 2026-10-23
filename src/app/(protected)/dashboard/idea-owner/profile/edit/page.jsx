import { requierRole } from "@/lib/auth";
import EditOwnerProfile from "@/features/dashboards/owner/profile/EditOwnerProfile";

export default async function Page() {
    await requierRole("idea_owner");
  return <EditOwnerProfile />;
}
