import { cookies } from "next/headers";
import { cache } from "react";
import { apiClient } from "./client";

export const getAuthUser = cache(async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await apiClient("/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.user ?? null;
  } catch {
    return null;
  }
});
