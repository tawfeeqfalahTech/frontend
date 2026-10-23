const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export const apiClient = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}/${endpoint.replace(/^\/+/, "")}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.message || "HTTP Error: " + res.status;

    throw new Error(errorMessage);
  }
  return res.status === 204 ? null : res.json();
};
