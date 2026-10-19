"use client";

import { toast } from "sonner";

export function notifyAuthErrors(fieldErrors = {}, formError = "") {
    const messages = [...new Set([formError, ...Object.values(fieldErrors)].filter(Boolean))];
    if (!messages.length) return;

    toast.error(messages[0], {
        id: "auth-error",
        description: messages.length > 1 ? messages.slice(1).join("\n") : undefined,
        style: { whiteSpace: "pre-line" },
    });
}

export function notifyAuthConnectionError() {
    const isOffline = typeof navigator !== "undefined" && navigator.onLine === false;
    notifyAuthErrors({}, isOffline
        ? "انقطع اتصال الإنترنت. تحقق من اتصالك ثم حاول مرة أخرى."
        : "تعذر الاتصال بالخادم. يرجى المحاولة مرة أخرى بعد قليل.");
}
