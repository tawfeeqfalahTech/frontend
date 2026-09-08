const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (userData) => {
  const data = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  return data;
};

export const register = async (userData) => {
  const data = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return data;
};
