"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

function subscribe(callback) {
    window.addEventListener("storage", callback);
    window.addEventListener("investor-saved-updated", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("investor-saved-updated", callback);
    };
}

export default function useSavedProjects(seed, accountKey) {
    const key = `ihyaa:investor-saved:${accountKey}`;
    const getSnapshot = useCallback(() => {
        try { return localStorage.getItem(key); } catch { return null; }
    }, [key]);
    const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
    const ids = useMemo(() => {
        try {
            const stored = raw === null ? seed : JSON.parse(raw);
            return Array.isArray(stored) ? stored.filter((id) => typeof id === "string") : seed;
        } catch { return seed; }
    }, [raw, seed]);

    const toggle = (id) => {
        const next = ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new Event("investor-saved-updated"));
    };
    return { ids, toggle };
}
