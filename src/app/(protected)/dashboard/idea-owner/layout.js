import { requierRole } from "@/lib/auth";

export default async function OwnerLayout({ children }) {
  await requierRole("idea_owner");
  return children;
}
