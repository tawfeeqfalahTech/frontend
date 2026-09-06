const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage = errorData.message || "HTTP Error: " + res.status;

    throw new Error(errorMessage);
  }
  return res.json();
};
