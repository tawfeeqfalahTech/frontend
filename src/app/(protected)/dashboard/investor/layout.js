import { requierRole } from "@/lib/auth";

export default async function InvestorLayout({ children }) {
  await requierRole("investor");
  return children;
}
