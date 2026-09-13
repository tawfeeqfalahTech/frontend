import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getDashboardPath } from "./auth-routes";

export const getAuthUser = cache(async function getAuthUser() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const cookiseStore = await cookies();
  const token = cookiseStore.get("token")?.value;

  if (!token) return null;

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
});

export const requireAuth = async () => {
  const user = await getAuthUser();
  if (!user) {
    redirect("/login");
  }
  return user;
};

export const getUserRole = (user) =>
  user?.role ?? user?.data?.role ?? user?.data?.user?.role ?? user?.user?.role;

export const requierRole = async (role) => {
  const user = await requireAuth();
  const userRole = getUserRole(user);

  if (userRole !== role) {
    redirect(getDashboardPath(userRole));
  }

  return user;
};
