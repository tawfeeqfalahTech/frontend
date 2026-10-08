"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { suggestedProjects } from "./data";

function subscribe(callback) {
    window.addEventListener("storage", callback);
    window.addEventListener("investor-saved-updated", callback);
    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("investor-saved-updated", callback);
    };
}

export default function useSavedProjects(seed, accountKey, preview) {
    const key = `ihyaa:investor-saved:${accountKey}`;
    const [previewIds, setPreviewIds] = useState(seed);
    const getSnapshot = useCallback(() => {
        try { return preview ? null : localStorage.getItem(key); } catch { return null; }
    }, [key, preview]);
    const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
    const ids = useMemo(() => {
        if (preview) return previewIds;
        try {
            const stored = raw === null ? seed : JSON.parse(raw);
            return Array.isArray(stored) ? stored.filter((id) => suggestedProjects.some((project) => project.id === id)) : seed;
        } catch { return seed; }
    }, [raw, seed, preview, previewIds]);

    const toggle = (id) => {
        const next = ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
        if (preview) setPreviewIds(next);
        else {
            localStorage.setItem(key, JSON.stringify(next));
            window.dispatchEvent(new Event("investor-saved-updated"));
        }
    };
    return { ids, toggle };
}
