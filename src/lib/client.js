import { getCookie } from "cookies-next";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
).replace(/\/+$/, "");

/**
 * خطأ موحّد لمطابقة استجابات لارافيل (ApiResponse)
 */
export class ApiError extends Error {
  constructor(message, status, code = null, errors = null, raw = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.raw = raw;
  }
}

/**
 * استخراج التوكن سواء في بيئة العميل أو عند تمريره يدوياً
 */
const resolveToken = (customToken) => {
  if (customToken) return customToken;
  if (typeof window !== "undefined") {
    try {
      const token = getCookie("token");
      return typeof token === "string" ? token : null;
    } catch {
      return null;
    }
  }
  return null;
};

/**
 * العميل المركزي للاتصال بالباك إند (Unified API Client)
 */
export const apiClient = async (endpoint, options = {}) => {
  const {
    token: customToken,
    body,
    headers = {},
    params,
    ...customConfig
  } = options;

  let url = `${API_BASE_URL}/${endpoint.replace(/^\/+/, "")}`;

  // إضافة Query Parameters إن وجدت
  if (params && Object.keys(params).length > 0) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "") {
        query.append(key, String(val));
      }
    });
    const queryString = query.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const token = resolveToken(customToken);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  const defaultHeaders = {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const config = {
    method: options.method || (body ? "POST" : "GET"),
    headers: defaultHeaders,
    ...customConfig,
  };

  if (body !== undefined) {
    config.body = isFormData ? body : typeof body === "string" ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  // استجابة فارغة (No Content 204)
  if (response.status === 204) {
    return { success: true, data: null };
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorCode = data?.code || (response.status === 401 ? "UNAUTHORIZED" : "HTTP_ERROR");
    const errorMessage = data?.message || `HTTP Error: ${response.status}`;
    const validationErrors = data?.errors || null;

    throw new ApiError(errorMessage, response.status, errorCode, validationErrors, data);
  }

  return data;
};

// توفير دوال اختصار مريحة (Convenience helpers)
apiClient.get = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "GET" });

apiClient.post = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: "POST", body });

apiClient.put = (endpoint, body, options = {}) =>
  apiClient(endpoint, { ...options, method: "PUT", body });

apiClient.delete = (endpoint, options = {}) =>
  apiClient(endpoint, { ...options, method: "DELETE" });

export default apiClient;
