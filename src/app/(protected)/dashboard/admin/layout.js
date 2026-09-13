import { requierRole } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  await requierRole("admin");
  return children;
}
