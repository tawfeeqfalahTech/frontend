import { requierRole } from "@/lib/auth";
import CreateProjectPage from "@/features/dashboards/owner/create-project/CreateProjectPage";

export default async function Page() {
    await requierRole("idea_owner");
  return <CreateProjectPage />;
}
