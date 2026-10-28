/**
 * سجل مسارات الباك إند المركزي (API Endpoints Registry)
 * متطابق 100% مع routes/api.php في الباك إند
 */
export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/register",
    SET_ROLE: "/register/role",
    LOGIN: "/login",
    EMAIL_VERIFY: "/email/verify",
    EMAIL_RESEND: "/email/resend",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    LOGOUT: "/logout",
    LOGOUT_ALL: "/logout-all",
    LOGOUT_OTHERS: "/logout-others",
    ME: "/me",
    SESSIONS: "/sessions",
    DELETE_SESSION: (id) => `/sessions/${id}`,
  },
  PROFILE: {
    SHOW: "/profile",
    UPDATE: "/profile",
    UPLOAD_AVATAR: "/profile/avatar",
    PUBLIC: (id) => `/profile/${id}`,
  },
  PROJECTS: {
    LIST: "/projects",
    SHOW: (id) => `/projects/${id}`,
    CREATE: "/projects",
    UPDATE: (id) => `/projects/${id}`,
    DELETE: (id) => `/projects/${id}`,
    UPLOAD_FILES: (id) => `/projects/${id}/files`,
    DELETE_FILE: (projectId, fileId) => `/projects/${projectId}/files/${fileId}`,
    TRASHED: "/trashed-projects",
    RESTORE: (id) => `/trashed-projects/${id}/restore`,
    FORCE_DELETE: (id) => `/trashed-projects/${id}/force`,
  },
  EVALUATIONS: {
    TRIGGER: (projectId) => `/projects/${projectId}/evaluate`,
    RE_EVALUATE: (projectId) => `/projects/${projectId}/re-evaluate`,
    STATUS: (projectId) => `/projects/${projectId}/evaluation-status`,
    HISTORY: (projectId) => `/projects/${projectId}/evaluations`,
    SHOW: (projectId, evaluationId) => `/projects/${projectId}/evaluations/${evaluationId}`,
    EXPORT_PDF: (projectId, evaluationId) => `/projects/${projectId}/evaluations/${evaluationId}/report`,
  },
  AI_AGENT: {
    ANALYZE: (projectId) => `/ai/analyze/${projectId}`,
    ANALYSIS: (artifactId) => `/ai/analysis/${artifactId}`,
    EXPORT: (artifactId) => `/ai/analysis/${artifactId}/export`,
    PROJECT_ANALYSIS: (projectId) => `/projects/${projectId}/ai-analysis`,
  },
  INTERESTS: {
    SEND: (projectId) => `/projects/${projectId}/interest`,
    RECEIVED: "/interests/received",
    SENT: "/interests/sent",
    ACCEPT: (id) => `/interests/${id}/accept`,
    REJECT: (id) => `/interests/${id}/reject`,
    CANCEL: (id) => `/interests/${id}/cancel`,
  },
  SAVED_PROJECTS: {
    LIST: "/saved-projects",
    SAVE: (projectId) => `/projects/${projectId}/save`,
    UNSAVE: (projectId) => `/projects/${projectId}/save`,
  },
  DASHBOARDS: {
    OWNER: "/dashboard/idea-owner",
    INVESTOR: "/dashboard/investor",
    ADMIN: "/admin/analytics",
    ADMIN_EXPORT: "/admin/analytics/export",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    RECENT: "/notifications/recent",
    MARK_READ: (id) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    UNREAD_COUNT: "/notifications/unread-count",
  },
  SEARCH: {
    QUERY: "/search",
    SUGGESTIONS: "/search/suggestions",
    TAG_SUGGESTIONS: "/tags/suggestions",
  },
  TAXONOMY: {
    TAGS: "/tags",
    CATEGORIES: "/categories",
  },
  HEALTH: {
    CHECK: "/health",
    READY: "/ready",
  },
};

