import { ENDPOINTS } from "@/lib/constants/endpoints";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

export const login = async (userData) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.LOGIN}`, {
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
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.REGISTER}`, {
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
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.EMAIL_VERIFY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
};

export const selectRole = async (userData) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.SET_ROLE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  return res;
};

// الاسم القديم للتوافق العكسي
export const Role = selectRole;

export const logout = async (token) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.LOGOUT}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const resendOtp = async (email) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.EMAIL_RESEND}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return res;
};

export const forgotPassword = async (email) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return res;
};

export const resetPassword = async (data) => {
  const res = await fetch(`${API_URL}${ENDPOINTS.AUTH.RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
