import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function VerifyLayout({ children }) {
  const cookieStore = await cookies();
  const emailVerify = cookieStore.get("pending_verify_email")?.value;

  if (!emailVerify) {
    redirect("/register");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
    </div>
  );
}
