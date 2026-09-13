const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res;
};

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
};

export const verifyOtp = async (userData) => {
  const res = await fetch(`${API_URL}/email/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
};

export const Role = async (userData) => {
  const res = await fetch(`${API_URL}/register/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
};

export const logout = async (token) => {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
