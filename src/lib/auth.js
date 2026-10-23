import { cookies } from "next/headers";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { getDashboardPath, getUserRole } from "./auth-routes";
import { deleteCookie } from "./action";

export { getUserRole } from "./auth-routes";

export const getAuthUser = cache(async function getAuthUser() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) {
    await deleteCookie("token");
  }

  if (!response.ok) throw new Error("Authentication service unavailable");

  return response.json();
});

export const requireAuth = async () => {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  return user;
};

export const requierRole = async (role) => {
  const user = await requireAuth();

  if (getUserRole(user) !== role) {
    if (role === "admin") {
      notFound();
    } else {
      redirect(getDashboardPath(getUserRole(user)));
    }
  }

  return user;
};
