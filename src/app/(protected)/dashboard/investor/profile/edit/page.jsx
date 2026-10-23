import { requierRole } from "@/lib/auth";
import InvestorProfile from "@/features/dashboards/investor/profile/InvestorProfile";

export default async function EditInvestorProfilePage() {
    await requierRole("investor");
  return <InvestorProfile editing />;
}
