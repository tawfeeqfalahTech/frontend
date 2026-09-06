import { apiClient } from "@/lib/client";

export const login = async (userData) => {
  const data = await apiClient("/login", {
    method: "POST",
    body: userData,
  });

  return data;
};

export const register = async (userData) => {
  const data = await apiClient("/register", {
    method: "POST",
    body: userData,
  });

  return data;
};
