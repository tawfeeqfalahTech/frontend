"use server";
import { cookies } from "next/headers";

export async function setCookie(name, value, maxAgeInSeconds) {
  try {
    const cookieStore = await cookies();

    cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeInSeconds,
    });
  } catch (error) {
    console.warn(`Could not set cookie "${name}":`, error.message);
  }
}

export async function getCookie(name) {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value || "";
  } catch {
    return "";
  }
}

export async function deleteCookie(name) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (error) {
    console.warn(`Could not delete cookie "${name}":`, error.message);
  }
}
