"use server";
import { cookies } from "next/headers";

export async function setCookie(name, value, maxAgeInSeconds) {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeInSeconds,
  });
}

export async function getCookie(value) {
  const cookieStore = await cookies();
  return cookieStore.get(value)?.value || "";
}

export async function deleteCookie(name) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
