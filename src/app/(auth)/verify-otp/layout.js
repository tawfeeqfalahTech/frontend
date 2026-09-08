import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export default async function VerifyLayout({ children }) {
  const emailVerify = await getCookie("pending_verify_email", { cookies });

  if (!emailVerify) {
    redirect("/register");
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
    </div>
  );
}
